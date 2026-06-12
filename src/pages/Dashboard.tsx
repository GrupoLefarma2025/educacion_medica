import { usePageTitle } from '@/hooks/usePageTitle';
import { Construction } from 'lucide-react';

export default function Dashboard() {
  usePageTitle('Dashboard', 'Página principal');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <div className="bg-muted p-6 rounded-2xl">
        <Construction className="h-12 w-12 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">En construcción</h2>
        <p className="text-muted-foreground mt-1">Este módulo se encuentra en desarrollo.</p>
      </div>
    </div>
  );
}
