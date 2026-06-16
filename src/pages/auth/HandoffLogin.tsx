import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

/**
 * Headless SSO landing. Reads ?token=<handoff>&page=<ruta_con_guiones_bajos>
 * from the URL, exchanges the one-time handoff token for a session and redirects.
 *
 * - No token  -> /login
 * - Token ok  -> initialize() then redirect
 * - page present -> underscores become slashes (ordenes_autorizaciones -> /ordenes/autorizaciones)
 * - page absent  -> /dashboard
 *
 * URL: /handoff-login?token=XXX&page=ordenes_autorizaciones
 */
export default function HandoffLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // The handoff token is single-use. React StrictMode mounts effects twice in dev,
  // which would consume the token twice (second call fails). This guards against it.
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const token = params.get('token');
    const rawPage = params.get('page');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    (async () => {
      try {
        await authService.exchangeHandoff(token);
        useAuthStore.getState().initialize();

        // page uses underscores as separators: ordenes_autorizaciones -> /ordenes/autorizaciones
        const target = rawPage
          ? '/' + rawPage.replace(/^\/+/, '').replaceAll('_', '/')
          : '/dashboard';

        navigate(target, { replace: true });
      } catch {
        setError('El enlace de acceso es inválido o expiró. Inicia sesión normalmente.');
        setTimeout(() => navigate('/login', { replace: true }), 2500);
      }
    })();
  }, [params, navigate]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{error || 'Iniciando sesión...'}</p>
    </div>
  );
}
