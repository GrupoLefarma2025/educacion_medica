import { create } from 'zustand';
import {
  AuthState,
  UserInfo,
  Empresa,
  Sucursal,
} from '@/types/auth.types';
import type { Area } from '@/types/catalogo.types';
import { navigateTo } from '@/lib/navigation';
import { authService } from '@/services/authService';
import { API } from '@/services/api';
import type { ApiResponse } from '@/types/api.types';
import type { Usuario } from '@/types/usuario.types';
import { useConfigStore } from './configStore';
import { toast } from 'sonner';


const LEGACY_TOKEN_KEY = 'token';

const LEGACY_TO_EDU_MED_KEYS: Record<string, string> = {
  'token': 'edu_med_accessToken',
  'accessToken': 'edu_med_accessToken',
  'refreshToken': 'edu_med_refreshToken',
  'user': 'edu_med_user',
  'empresa': 'edu_med_empresa',
  'sucursal': 'edu_med_sucursal',
  'area': 'edu_med_area',
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  empresa: null,
  sucursal: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  loginStep: 1,
  availableDomains: [],
  requiresDomainSelection: false,
  displayName: null,
  pendingUsername: null,
  empresas: [],
  sucursales: [],
  areas: [],
  area: null,
  hasFirma: null,
  puedeSeleccionarEmpresas: false,
  usuarioDetalle: null,


  loginStepOne: async (username: string) => {
    set({ isLoading: true });
    try {
      const response = await authService.loginStepOne(username);
      set({
        loginStep: 2,
        availableDomains: response.domains,
        requiresDomainSelection: response.requiresDomainSelection,
        displayName: response.displayName || null,
        pendingUsername: username,
        isLoading: false,
      });

      sessionStorage.setItem(
        'loginFlow',
        JSON.stringify({
          step: 2,
          username,
          domains: response.domains,
          requiresDomainSelection: response.requiresDomainSelection,
          displayName: response.displayName,
        })
      );
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  loginStepTwo: async (password: string, domain: string) => {
    const { pendingUsername } = get();
    if (!pendingUsername) {
      throw new Error('No hay usuario pendiente');
    }

    set({ isLoading: true });
    try {
      const response = await authService.loginStepTwo({
        username: pendingUsername,
        password,
        domain,
      });

      sessionStorage.removeItem('loginFlow');

      // Cargar empresas y sucursales para el paso 3
      const [empresas, sucursales, areas] = await Promise.all([
        authService.getEmpresas(),
        authService.getSucursales(),
        authService.getAreas(),
      ]);

      // Obtener perfil para saber si puede seleccionar empresas y su empresa asignada
      let puedeSeleccionar = false;
      let usuarioDetalle: { idEmpresa: number; idSucursal: number; idArea: number | null } | null = null;
      try {
        const profileRes = await API.get<ApiResponse<{ puedeSeleccionarEmpresas: boolean; detalle?: { idEmpresa?: number; idSucursal?: number; idArea?: number } }>>('/profile');
        puedeSeleccionar = profileRes.data.data?.puedeSeleccionarEmpresas ?? false;
        if (profileRes.data.data?.detalle) {
          usuarioDetalle = {
            idEmpresa: profileRes.data.data.detalle.idEmpresa ?? 0,
            idSucursal: profileRes.data.data.detalle.idSucursal ?? 0,
            idArea: profileRes.data.data.detalle.idArea ?? null,
          };
        }
      } catch {
        // Si falla el profile, se asume que no puede seleccionar
      }

      // Sincronizar con configStore
      useConfigStore.getState().updatePerfil({
        nombre: response.user.nombre || '',
        correo: response.user.correo || '',
      });

      // Auto-resolver ubicación para TODOS los usuarios: empresa/sucursal/área
      // desde el perfil si existe, si no la primera disponible. Login envía al
      // dashboard; los multi-empresa cambian después vía "Cambiar Ubicación".
      let empresa = usuarioDetalle?.idEmpresa
        ? (empresas.find((e) => String(e.idEmpresa) === String(usuarioDetalle.idEmpresa)) ?? null)
        : null;
      if (!empresa && empresas.length > 0) empresa = empresas[0];

      if (empresa) {
        const emp = empresa;
        const sucursalesDeEmpresa = sucursales.filter(
          (s) => String(s.idEmpresa) === String(emp.idEmpresa)
        );
        let sucursal = usuarioDetalle?.idSucursal
          ? (sucursalesDeEmpresa.find((s) => String(s.idSucursal) === String(usuarioDetalle.idSucursal)) ?? null)
          : null;
        if (!sucursal && sucursalesDeEmpresa.length > 0) sucursal = sucursalesDeEmpresa[0];

        authService.setEmpresa(emp);
        if (sucursal) authService.setSucursal(sucursal);

        const areasDeEmpresa = areas.filter(
          (a) => String(a.idEmpresa) === String(emp.idEmpresa)
        );
        let area = usuarioDetalle?.idArea
          ? (areasDeEmpresa.find((a) => String(a.idArea) === String(usuarioDetalle.idArea)) ?? null)
          : null;
        if (!area && areasDeEmpresa.length === 1) area = areasDeEmpresa[0];
        if (area) authService.setArea(area);

        set({
          user: response.user,
          token: response.accessToken,
          isAuthenticated: true,
          isLoading: false,
          loginStep: 1,
          availableDomains: [],
          requiresDomainSelection: false,
          displayName: null,
          pendingUsername: null,
          empresas,
          sucursales,
          areas,
          puedeSeleccionarEmpresas: puedeSeleccionar,
          usuarioDetalle,
          empresa: emp,
          sucursal,
          area,
        });

        await get().fetchProfileSignature();
        return;
      }
      // si no se pudo resolver empresa (lista vacía), caer al flujo de selección

      // Sin ninguna empresa disponible (caso degenerado): autenticado con token,
      // elegir ubicación en /select-empresa.
      set({
        user: response.user,
        token: response.accessToken,
        isAuthenticated: true,
        isLoading: false,
        loginStep: 1,
        availableDomains: [],
        requiresDomainSelection: false,
        displayName: null,
        pendingUsername: null,
        empresas,
        sucursales,
        areas,
        puedeSeleccionarEmpresas: puedeSeleccionar,
        usuarioDetalle,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  loginStepThree: async (empresaId: string, sucursalId: string, areaId?: string) => {
    const { empresas, sucursales, areas } = get();

    const empresa = empresas.find((e) => String(e.idEmpresa) === String(empresaId));
    const sucursal = sucursales.find((s) => String(s.idSucursal) === String(sucursalId));

    if (!empresa || !sucursal) {
      throw new Error('Empresa o sucursal no encontrada');
    }

    authService.setEmpresa(empresa);
    authService.setSucursal(sucursal);

    let selectedArea: Area | null = null;
    if (areaId) {
      selectedArea = areas.find((a) => String(a.idArea) === String(areaId)) || null;
      if (selectedArea) {
        authService.setArea(selectedArea);
      }
    }

    set({
      empresa,
      sucursal,
      area: selectedArea,
      isAuthenticated: true,
      loginStep: 1,
      empresas: [],
      sucursales: [],
      areas: [],
    });

    await get().fetchProfileSignature();

    const { hasFirma } = get();
    if (hasFirma === false) {
      toast.warning('No has cargado tu firma digital', {
        description: 'Ve a Configuración para subir tu firma y poder autorizar documentos.',
        duration: 6000,
      });
    }
  },

  resetLoginFlow: () => {
    sessionStorage.removeItem('loginFlow');
    set({
      loginStep: 1,
      availableDomains: [],
      requiresDomainSelection: false,
      displayName: null,
      pendingUsername: null,
      empresas: [],
      sucursales: [],
      areas: [],
      usuarioDetalle: null,
    });
  },

  logout: async () => {
    await authService.logout();
    set({
      user: null,
      token: null,
      empresa: null,
      sucursal: null,
      area: null,
      isAuthenticated: false,
      loginStep: 1,
      empresas: [],
      sucursales: [],
      areas: [],
      hasFirma: null,
      puedeSeleccionarEmpresas: false,
      usuarioDetalle: null,
    });

    if (!window.location.pathname.endsWith('/login')) {
      navigateTo('/login');
    }
  },

  setEmpresa: (empresa: Empresa) => {
    authService.setEmpresa(empresa);
    set({ empresa });
  },

  setSucursal: (sucursal: Sucursal) => {
    authService.setSucursal(sucursal);
    set({ sucursal });
  },

  changeEmpresaSucursal: (empresa: Empresa, sucursal: Sucursal) => {
    authService.setEmpresa(empresa);
    authService.setSucursal(sucursal);
    set({ empresa, sucursal });
  },

  setToken: (token: string) => {
    localStorage.setItem('edu_med_accessToken', token);
    set({ token, isAuthenticated: true });
  },

  setUser: (user: UserInfo) => {
    localStorage.setItem('edu_med_user', JSON.stringify(user));
    set({ user });
  },

  setHasFirma: (has: boolean) => {
    set({ hasFirma: has });
  },

  fetchProfileSignature: async () => {
    try {
      const response = await API.get<ApiResponse<{ puedeSeleccionarEmpresas: boolean; detalle?: { firmaPath?: string } }>>('/profile');
      const firmaPath = response.data.data?.detalle?.firmaPath;
      const puedeSeleccionar = response.data.data?.puedeSeleccionarEmpresas ?? false;
      set({ hasFirma: !!firmaPath, puedeSeleccionarEmpresas: puedeSeleccionar });
    } catch {
        set({ hasFirma: false })
    }
  },

  initialize: () => {
    Object.entries(LEGACY_TO_EDU_MED_KEYS).forEach(([oldKey, newKey]) => {
      const old = localStorage.getItem(oldKey);
      if (old && !localStorage.getItem(newKey)) {
        localStorage.setItem(newKey, old);
        localStorage.removeItem(oldKey);
      }
    });

    const token = authService.getAccessToken();
    const user = authService.getCurrentUser();
    const empresa = authService.getEmpresa();
    const sucursal = authService.getSucursal();
    const area = authService.getArea();

    if (token && user) {
      set({
        token,
        user,
        empresa,
        sucursal,
        area,
        isAuthenticated: true,
        isLoading: false,
        loginStep: 1,
        availableDomains: [],
        requiresDomainSelection: false,
        displayName: null,
        pendingUsername: null,
        empresas: [],
        sucursales: [],
        areas: [],
        hasFirma: null,
        puedeSeleccionarEmpresas: false,
      });

      useConfigStore.getState().updatePerfil({
        nombre: user.nombre || '',
        correo: user.correo || '',
      });

      get().fetchProfileSignature();
    } else {
      // No auth data
      set({
        isAuthenticated: false,
      });
    }

    const loginFlowStr = sessionStorage.getItem('loginFlow');
    if (loginFlowStr) {
      try {
        const loginFlow = JSON.parse(loginFlowStr);
        set({
          loginStep: loginFlow.step,
          pendingUsername: loginFlow.username,
          availableDomains: loginFlow.domains,
          requiresDomainSelection: loginFlow.requiresDomainSelection,
          displayName: loginFlow.displayName,
        });
      } catch {
        sessionStorage.removeItem('loginFlow');
      }
    }

    set({ isInitialized: true });
  },
}));
