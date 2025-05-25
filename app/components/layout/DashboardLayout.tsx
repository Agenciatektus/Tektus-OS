'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  FileText,
  ChevronDown,
  Bell,
  Sun,
  Menu as MenuIcon,
  CheckCircle2
} from 'lucide-react';

const menuItems = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { icon: <Calendar size={18} />, label: 'Agenda' },
  { icon: <Users size={18} />, label: 'Clientes' },
  { icon: <DollarSign size={18} />, label: 'Financeiro' },
  { icon: <FileText size={18} />, label: 'Documentos' },
];

const notifications = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Justin Verduzco',
    description: 'Your task changed an issue from "In Progress" to ',
    tag: 'Review',
    tagColor: 'bg-green-600',
    time: '1 HOUR AGO',
    isNew: true,
  },
  {
    id: 2,
    icon: <CheckCircle2 className="text-blue-400" size={24} />,
    title: 'New order has been placed',
    description: 'Open the order confirmation or shipment confirmation.',
    time: '5 HOURS AGO',
    isNew: false,
  },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Fechar popover de notificações ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notifOpen]);

  return (
    <div className={`min-h-screen text-white ${darkMode ? 'bg-[#0D100F]' : 'bg-white text-black'}`}> 
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'} bg-[#101212] flex flex-col shadow-lg`}>
          <div className="flex items-center justify-between p-4 h-16">
            <div className="transition-all duration-300 flex items-center">
              {sidebarOpen ? (
                <img
                  src="/logo-tektus/logo-tektus-os-degrade-padrao.svg"
                  alt="Logo Tektus OS"
                  className="h-8 w-auto transition-all duration-300"
                />
              ) : (
                <img
                  src="/logo-tektus/Favicon-OS-dragrade-sem-fundo.svg"
                  alt="Favicon Tektus OS"
                  className="h-8 w-8 transition-all duration-300"
                />
              )}
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#00FF85] lg:hidden rounded-lg p-1 hover:bg-[#00FF85]/10 transition-colors">
              <MenuIcon />
            </button>
          </div>
          <nav className="flex-1 mt-4 space-y-1">
            {menuItems.map((item, idx) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-200 justify-start group ${sidebarOpen ? '' : 'justify-center'} hover:bg-[#00FF85]/10 focus:bg-[#00FF85]/10 ${idx === 0 ? 'bg-[#00FF85]/10 text-[#00FF85]' : 'text-white'}`}
              >
                <span className="text-xl group-hover:text-[#00FF85] transition-colors">{item.icon}</span>
                <span
                  className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 ml-2 w-auto' : 'opacity-0 ml-0 w-0'} whitespace-nowrap overflow-hidden text-sm`}
                  style={{ display: sidebarOpen ? 'inline' : 'inline-block' }}
                >
                  {item.label}
                </span>
                {/* Badge de notificação exemplo */}
                {item.label === 'Agenda' && (
                  <span className={`ml-auto text-xs font-bold rounded-full px-2 py-0.5 ${sidebarOpen ? 'bg-[#00FF85] text-black' : 'bg-[#00FF85] text-black'} transition-all`}>2</span>
                )}
              </button>
            ))}
            {/* Menu expansível */}
            <div className="mt-6">
              <button className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-200 justify-start hover:bg-[#00FF85]/10 focus:bg-[#00FF85]/10 text-white`}>
                <FileText size={18} />
                <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 ml-2 w-auto' : 'opacity-0 ml-0 w-0'} whitespace-nowrap overflow-hidden text-sm`} style={{ display: sidebarOpen ? 'inline' : 'inline-block' }}>Mais</span>
                {sidebarOpen && <ChevronDown size={16} className="ml-auto" />}
              </button>
              {sidebarOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <button className="block text-left text-xs text-gray-400 hover:text-[#00FF85]">Configurações</button>
                  <button className="block text-left text-xs text-gray-400 hover:text-[#00FF85]">Integrações</button>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="h-20 bg-[#161817] flex items-center px-8 gap-6 shadow-lg">
            <div className="flex items-center gap-4 flex-1">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#00FF85] hidden lg:block rounded-lg p-1 hover:bg-[#00FF85]/10 transition-colors">
                <MenuIcon />
              </button>
              <span className="text-2xl font-bold hidden md:block">Dashboard</span>
              <div className="flex-1 flex justify-center">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full max-w-md px-5 py-2 rounded-full bg-[#101212] text-sm focus:outline-none focus:ring-2 focus:ring-[#00FF85] transition-all duration-200 shadow-md placeholder:text-gray-400 border-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative rounded-lg p-2 bg-[#101212] hover:bg-[#00FF85]/10 transition-colors">
                <Bell size={22} className="text-white group-hover:text-[#00FF85]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00FF85] text-black text-xs font-bold rounded-full flex items-center justify-center">2</span>
              </button>
              <button className="rounded-lg p-2 bg-[#101212] hover:bg-[#00FF85]/10 transition-colors">
                <Sun size={22} className="text-white group-hover:text-[#00FF85]" />
              </button>
              <div className="flex items-center gap-2 bg-[#101212] rounded-full px-3 py-1">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" className="w-9 h-9 rounded-full object-cover border-2 border-[#00FF85]/40" />
                <div className="hidden md:block">
                  <div className="text-white font-semibold text-sm">Usuário</div>
                  <div className="text-xs text-gray-400">usuario@email.com</div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 