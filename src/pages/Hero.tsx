import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  GraduationCap,
  TrendingUp,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import logoEstatico from '@/assets/logo.png';

const features = [
  {
    icon: GraduationCap,
    title: 'Educación Médica',
    description:
      'Capacitación continua, certificaciones y seguimiento de formación profesional para el equipo médico.',
    accent: 'primary',
  },
  {
    icon: TrendingUp,
    title: 'Gestión de Ventas',
    description:
      'Control integral y seguimiento de ventas con métricas en tiempo real para la toma de decisiones.',
    accent: 'chart-1',
  },
  {
    icon: BookOpen,
    title: 'Catálogos',
    description:
      'Administración centralizada de productos, servicios y materiales médicos disponibles.',
    accent: 'chart-2',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad',
    description:
      'Control de acceso granular con roles y permisos para proteger la información sensible.',
    accent: 'chart-4',
  },
];

const stats = [
  { value: '24/7', label: 'Disponibilidad' },
  { value: '+50', label: 'Cursos Activos' },
  { value: '100%', label: 'Trazabilidad' },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-chart-1/5 blur-[100px]" />
        <div className="absolute -bottom-1/4 left-1/3 h-[50vh] w-[50vh] rounded-full bg-chart-2/5 blur-[100px]" />

        <div className="absolute right-[10%] top-[15%] h-64 w-64 rounded-full border border-primary/8" />
        <div className="absolute right-[12%] top-[17%] h-48 w-48 rounded-full border border-primary/5" />
        <div className="absolute left-[8%] bottom-[20%] h-32 w-32 rotate-45 rounded-2xl border border-primary/6" />
        <div className="absolute left-[5%] top-[40%] h-2 w-2 rounded-full bg-primary/30" />
        <div className="absolute left-[15%] top-[25%] h-1.5 w-1.5 rounded-full bg-primary/20" />
        <div className="absolute right-[25%] bottom-[35%] h-2.5 w-2.5 rounded-full bg-primary/25" />

        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img
              src={logoEstatico}
              alt="Grupo LeFarma"
              className="h-9 w-auto"
            />
            <div className="hidden h-6 w-px bg-border sm:block" />
            <span className="hidden text-sm font-medium text-muted-foreground sm:block">
              Educación Médica y Ventas
            </span>
          </div>

          <Button
            onClick={() => navigate('/login')}
            size="sm"
            className="gap-2"
          >
            Iniciar Sesión
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
              <div className="order-2 text-center lg:order-1 lg:text-left">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                  <Stethoscope className="h-4 w-4" />
                  Plataforma Integral
                </div>

                <h1 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Sistema de{' '}
                  <span className="text-primary">Educación Médica</span>
                  <br />y Ventas
                </h1>

                <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground lg:text-xl">
                  Plataforma integral para la gestión de educación médica
                  continua y ventas del grupo LeFarma. Todo lo que necesitás, en
                  un solo lugar.
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                  <Button
                    size="lg"
                    onClick={() => navigate('/login')}
                    className="gap-2 px-8 text-base shadow-lg shadow-primary/20"
                  >
                    Iniciar Sesión
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-12 flex items-center justify-center gap-8 lg:justify-start">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-8">
                      {i > 0 && (
                        <div className="h-8 w-px bg-border" aria-hidden="true" />
                      )}
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold tracking-tight text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="relative rounded-2xl border border-border/60 bg-card/80 p-8 shadow-xl backdrop-blur-sm">
                    <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary via-chart-1 to-chart-2" />

                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-xl" />
                        <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
                          <img
                            src={logoEstatico}
                            alt="Grupo LeFarma"
                            className="h-20 w-auto object-contain"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-center">
                        <h3 className="text-lg font-semibold text-foreground">
                          Grupo LeFarma
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Educación Médica y Ventas
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {features.slice(0, 4).map((f) => (
                          <div
                            key={f.title}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background text-primary transition-colors hover:bg-primary/5"
                          >
                            <f.icon className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute -left-8 top-1/4 hidden rounded-xl border border-border/40 bg-card/90 p-3 shadow-lg backdrop-blur-sm lg:block">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-2/10">
                        <GraduationCap className="h-4 w-4 text-chart-2" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          +50 Cursos
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Activos ahora
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-6 hidden rounded-xl border border-border/40 bg-card/90 p-3 shadow-lg backdrop-blur-sm lg:block">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-1/10">
                        <ShieldCheck className="h-4 w-4 text-chart-1" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          Acceso Seguro
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Roles y permisos
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/50 bg-muted/30 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Funcionalidades
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Todo lo que necesitás para gestionar
              </h2>
              <p className="text-lg text-muted-foreground">
                Desde la capacitación médica hasta el control de ventas, cada
                módulo está diseñado para simplificar tu trabajo diario.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary transition-colors group-hover:border-primary/20 group-hover:bg-primary/10">
                      <feature.icon className="h-6 w-6" />
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>

                    <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Explorar
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 bg-background py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <img
              src={logoEstatico}
              alt="Grupo LeFarma"
              className="h-6 w-auto opacity-60"
            />
            <p className="text-sm text-muted-foreground">
              Grupo LeFarma &copy; {new Date().getFullYear()} - Da Salud
            </p>
          </div>

          <p className="text-xs text-muted-foreground/60">
            Versión {import.meta.env.VITE_APP_VERSION || '1.0.0'}
          </p>
        </div>
      </footer>
    </div>
  );
}
