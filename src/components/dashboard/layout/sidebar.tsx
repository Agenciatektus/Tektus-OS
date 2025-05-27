'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  CreditCard,
  Home
} from 'lucide-react';

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Ordens de Serviço',
    icon: FileText,
    href: '/dashboard/os',
    color: 'text-violet-500',
  },
  {
    label: 'Clientes',
    icon: Users,
    href: '/dashboard/clientes',
    color: 'text-pink-700',
  },
  {
    label: 'Mensagens',
    icon: MessageSquare,
    href: '/dashboard/mensagens',
    color: 'text-orange-700',
  },
  {
    label: 'Relatórios',
    icon: BarChart3,
    href: '/dashboard/relatorios',
    color: 'text-emerald-500',
  },
  {
    label: 'Configurações',
    icon: Settings,
    href: '/dashboard/configuracoes',
  },
  {
    label: 'Assinatura',
    icon: CreditCard,
    href: '/dashboard/assinatura',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400',
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
