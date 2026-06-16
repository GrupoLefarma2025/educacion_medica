import { Routes, Route } from 'react-router-dom';
import { LandingRoute, ProtectedRoute, PublicOnlyRoute } from './LandingRoute';
import { MainLayout } from '@/components/layout/MainLayout';
import { PermissionGuard } from '@/components/auth/PermissionGuard';

import Login from '@/pages/auth/Login';
import SelectEmpresaSucursal from '@/pages/auth/SelectEmpresaSucursal';
import BlockedPage from '@/pages/auth/BlockedPage';
import Dashboard from '@/pages/Dashboard';
import RolesList from '@/pages/admin/Roles/RolesList';
import PermisosList from '@/pages/admin/Permisos/PermisosList';
import EmpresasList from '@/pages/catalogos/generales/Empresas/EmpresasList';
import SucursalesList from '@/pages/catalogos/generales/Sucursales/SucursalesList';

import MedidasList from '@/pages/catalogos/generales/Medidas/MedidasList';
import TiposGastoList from '@/pages/catalogos/generales/TiposGasto/TiposGastoList';

import AreasList from '@/pages/catalogos/generales/Areas/AreasList';
import FormasPagoList from '@/pages/catalogos/generales/FormasPago/FormasPagoList';
import TiposImpuestoList from '@/pages/catalogos/generales/TiposImpuesto/TiposImpuestoList';
import CentrosCostoList from '@/pages/catalogos/generales/CentrosCosto/CentrosCostoList';
import CuentasContablesList from '@/pages/catalogos/generales/CuentasContables/CuentasContablesList';
import EstatusOrdenList from '@/pages/catalogos/generales/EstatusOrden/EstatusOrdenList';
import RegimenesFiscalesList from '@/pages/catalogos/generales/RegimenesFiscales/RegimenesFiscalesList';
import ConfiguracionGeneral from '@/pages/configuracion/ConfiguracionGeneral';
import UsuariosList from '@/pages/admin/Usuarios/UsuariosList';
import NotFound from '@/pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingRoute />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/select-empresa" element={<SelectEmpresaSucursal />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/seguridad/usuarios" element={<UsuariosList />} />
          <Route path="/seguridad/roles" element={<RolesList />} />
          <Route path="/seguridad/permisos" element={<PermisosList />} />

          {/* Catálogos */}
          {/* <Route path="/catalogos/empresas" element={<PermissionGuard requireAny={['empresas.ver_listado']}><EmpresasList /></PermissionGuard>} />
          <Route path="/catalogos/area" element={<PermissionGuard requireAny={['areas.ver_listado']}><AreasList /></PermissionGuard>} />
          <Route path="/catalogos/formas-pago" element={<PermissionGuard requireAny={['formas-pago.ver_listado']}><FormasPagoList /></PermissionGuard>} />
          <Route path="/catalogos/tipos-impuesto" element={<PermissionGuard requireAny={['tipos-impuesto.ver_listado']}><TiposImpuestoList /></PermissionGuard>} />
          <Route path="/catalogos/centros-costo" element={<PermissionGuard requireAny={['centros-costo.ver_listado']}><CentrosCostoList /></PermissionGuard>} />
          <Route path="/catalogos/cuentas-contables" element={<PermissionGuard requireAny={['cuentas-contables.ver_listado']}><CuentasContablesList /></PermissionGuard>} />
          <Route path="/catalogos/estatus-orden" element={<PermissionGuard requireAny={['estatus-orden.ver_listado']}><EstatusOrdenList /></PermissionGuard>} />
          <Route path="/catalogos/regimenes-fiscales" element={<PermissionGuard requireAny={['regimenes-fiscales.ver_listado']}><RegimenesFiscalesList /></PermissionGuard>} />
          <Route path="/catalogos/sucursales" element={<PermissionGuard requireAny={['sucursales.ver_listado']}><SucursalesList /></PermissionGuard>} />
          <Route path="/catalogos/medidas" element={<PermissionGuard requireAny={['medidas.ver_listado']}><MedidasList /></PermissionGuard>} />
          <Route path="/catalogos/tipos-gasto" element={<PermissionGuard requireAny={['tipos-gasto.ver_listado']}><TiposGastoList /></PermissionGuard>} /> */}

          {/* Configuración */}
          <Route path="/configuracion" element={<ConfiguracionGeneral />} />
        </Route>
      </Route>
      <Route path="/bloqueado" element={<BlockedPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
