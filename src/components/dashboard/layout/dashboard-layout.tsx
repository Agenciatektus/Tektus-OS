import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { DashboardGradient } from '@/components/gradients/dashboard-gradient';
import '../../../styles/dashboard.css';
import { Sidebar } from '@/components/dashboard/layout/sidebar';
import { SidebarUserInfo } from '@/components/dashboard/layout/sidebar-user-info';

interface Props {
  children: ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] relative overflow-hidden">
      <DashboardGradient />
      <div className="hidden border-r md:block relative">
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-center pt-8 pl-6 pb-10">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Image 
                src="/logo-tektus/logo-tektus-os-branca.svg" 
                alt="Tektus OS" 
                width={120} 
                height={40} 
              />
            </Link>
          </div>
          <div className="flex flex-col grow">
            <Sidebar />
            <SidebarUserInfo />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Image 
                src="/logo-tektus/logo-tektus-os-branca.svg" 
                alt="Tektus OS" 
                width={100} 
                height={32} 
              />
            </Link>
          </div>
          <div className="flex-1" />
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard/assinatura"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Assinatura
            </Link>
            <Link
              href="/dashboard/configuracoes"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Configurações
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
