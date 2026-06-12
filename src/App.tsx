import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { useAuthStore } from './store/authStore';
import { useConfigStore } from './store/configStore';
import { Toaster } from '@/components/ui/sonner';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';
import { setNavigate } from '@/lib/navigation';

function NavigationRegistrar() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return null;
}


function App() {
  const initialize = useAuthStore((state) => state.initialize);
  const tema = useConfigStore((state) => state.ui.tema);
  const setTema = useConfigStore((state) => state.setTema);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (tema) {
      setTema(tema);
    }
  }, [tema, setTema]);

  useTokenRefresh();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <NavigationRegistrar />
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
