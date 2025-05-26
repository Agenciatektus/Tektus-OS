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
  Menu as MenuIcon
} from 'lucide-react';
import Image from 'next/image';

const menuItems = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { icon: <Calendar size={18} />, label: 'Agenda' },
  { icon: <Users size={18} />, label: 'Clientes' },
  { icon: <DollarSign size={18} />, label: 'Financeiro' },
  { icon: <FileText size={18} />, label: 'Documentos' },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
        <aside className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-60' : 'w-16'} bg-[#101212] flex flex-col shadow-lg`}>
          <div className="flex items-center justify-between px-3 py-4 h-16">
            <div className="flex items-center justify-center w-full">
              {sidebarOpen ? (
                <Image
                  src="/logo-tektus/logo-tektus-os-degrade-padrao.svg"
                  alt="Logo Tektus OS"
                  width={24}
                  height={24}
                  className="h-6 w-auto mx-auto transition-all duration-300"
                  style={{ marginTop: 0, marginBottom: 0, display: 'block' }}
                />
              ) : (
                <Image
                  src="/logo-tektus/Favicon-OS-dragrade-sem-fundo.svg"
                  alt="Favicon Tektus OS"
                  width={22}
                  height={22}
                  className="h-5 w-5 mx-auto transition-all duration-300"
                  style={{ marginTop: 0, marginBottom: 0, display: 'block' }}
                />
              )}
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#00FF85] lg:hidden rounded-lg p-1 hover:bg-[#00FF85]/10 transition-colors ml-2">
              <MenuIcon />
            </button>
          </div>
          <nav className="flex-1 mt-4 space-y-1 px-2 pb-4">
            {menuItems.map((item, idx) => (
              <button
                key={item.label}
                className={`relative flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 group hover:bg-[#00FF85]/10 focus:bg-[#00FF85]/10 ${idx === 0 ? 'bg-[#00FF85]/10 text-[#00FF85]' : 'text-white'}`}
                style={{ justifyContent: sidebarOpen ? 'flex-start' : 'flex-start' }}
              >
                <span className="text-xl group-hover:text-[#00FF85] transition-colors flex items-center justify-center min-w-[24px]">{item.icon}</span>
                <span
                  className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 ml-2 w-auto' : 'opacity-0 ml-0 w-0'} whitespace-nowrap overflow-hidden text-sm`}
                  style={{ display: sidebarOpen ? 'inline' : 'inline-block' }}
                >
                  {item.label}
                </span>
                {/* Badge de notificação exemplo */}
                {item.label === 'Agenda' && (
                  <span className={`absolute top-1.5 right-2 text-[10px] font-bold rounded-full px-1.5 py-0.5 bg-[#00FF85] text-black transition-all ${sidebarOpen ? '' : 'right-1.5 top-0.5 px-1 py-0'}`}>2</span>
                )}
              </button>
            ))}
            {/* Menu expansível */}
            <div className="mt-6">
              <button className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#00FF85]/10 focus:bg-[#00FF85]/10 text-white`} style={{ justifyContent: sidebarOpen ? 'flex-start' : 'flex-start' }}>
                <span className="text-xl flex items-center justify-center min-w-[24px]"><FileText size={18} /></span>
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
          <header className="w-full flex items-center px-8 gap-4 shadow-none bg-transparent h-20">
            {/* Campo de busca */}
            <div className="flex-1 flex items-center">
              <div className="w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full h-14 px-6 rounded-full bg-[#18191A]/80 text-white text-base focus:outline-none focus:ring-2 focus:ring-[#00FF85] placeholder:text-gray-400 border-none shadow-md"
                  style={{ minWidth: 220 }}
                />
              </div>
            </div>
            {/* Ícones e usuário */}
            <div className="flex items-center gap-4">
              {/* Ícone calendário (opcional, pode remover se não quiser) */}
              <button className="w-14 h-14 flex items-center justify-center rounded-full bg-[#18191A]/80 hover:bg-[#00FF85]/10 transition-colors">
                <Calendar size={24} className="text-white" />
              </button>
              {/* Notificações */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(v => !v)}
                  aria-label="Notificações"
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-[#18191A]/80 hover:bg-[#00FF85]/10 transition-colors relative"
                >
                  <Bell size={24} className="text-white" />
                  <span className="absolute -bottom-1 -right-1 px-3 py-0.5 rounded-full bg-[#D6FF3A] text-black text-sm font-bold shadow" style={{ minWidth: 28, textAlign: 'center' }}>10</span>
                </button>
                {notifOpen && (
                  <div ref={notifRef} className="absolute right-0 mt-2 w-80 bg-[#161817] rounded-lg shadow-lg border border-[#23242b] z-20 max-h-96 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-[#23242b]">
                      <span className="font-semibold text-white">Notificações</span>
                      <button className="text-xs text-[#00FF85] hover:underline">Marcar todos como lido</button>
                    </div>
                    <ul className="divide-y divide-[#23242b]">
                      {/* Exemplo de notificações */}
                      <li className="px-4 py-3 flex items-start gap-3 hover:bg-[#00FF85]/5 cursor-pointer">
                        <span className="w-2 h-2 mt-2 rounded-full bg-[#00FF85]"></span>
                        <div>
                          <div className="text-sm text-white">Nova tarefa criada: "Atualização do site"</div>
                          <div className="text-xs text-gray-400">Há 5 minutos</div>
                        </div>
                      </li>
                      <li className="px-4 py-3 flex items-start gap-3 hover:bg-[#00FF85]/5 cursor-pointer">
                        <span className="w-2 h-2 mt-2 rounded-full bg-[#00FF85]"></span>
                        <div>
                          <div className="text-sm text-white">Novo cliente adicionado: "Empresa XYZ"</div>
                          <div className="text-xs text-gray-400">Há 15 minutos</div>
                        </div>
                      </li>
                      <li className="px-4 py-3 flex items-start gap-3 hover:bg-[#00FF85]/5 cursor-pointer">
                        <span className="w-2 h-2 mt-2 rounded-full bg-[#00FF85]"></span>
                        <div>
                          <div className="text-sm text-white">Reunião agendada: "Planejamento Q3"</div>
                          <div className="text-xs text-gray-400">Há 1 hora</div>
                        </div>
                      </li>
                      {/* ...pode adicionar mais notificações aqui... */}
                    </ul>
                  </div>
                )}
              </div>
              {/* Troca de tema */}
              <button className="w-14 h-14 flex items-center justify-center rounded-full bg-[#18191A]/80 hover:bg-[#00FF85]/10 transition-colors">
                <Sun size={24} className="text-white" />
              </button>
              {/* Usuário */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-3 bg-[#18191A]/80 rounded-full px-5 h-14 min-w-[220px] max-w-[320px] border border-white/10 shadow-md hover:bg-[#00FF85]/10 transition-colors"
                  style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 0, paddingBottom: 0 }}
                >
                  <Image
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#00FF85]/40"
                  />
                  <div className="flex flex-col items-start justify-center min-w-0">
                    <div className="text-white font-semibold text-base truncate">Usuário</div>
                    <div className="text-xs text-gray-400 truncate">usuario@email.com</div>
                  </div>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#161817] rounded-xl shadow-lg border border-[#23242b] z-20 overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#23242b] flex items-center gap-4">
                      <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-[#00FF85]/40" />
                      <div className="flex flex-col items-start">
                        <div className="text-white font-semibold text-base">Usuário</div>
                        <div className="text-xs text-gray-400 break-all">usuario@email.com</div>
                      </div>
                    </div>
                    <button className="w-full text-left px-6 py-4 text-sm text-white hover:bg-[#00FF85]/10">Configurações da Conta</button>
                    <button className="w-full text-left px-6 py-4 text-sm text-white hover:bg-[#00FF85]/10">Meu Perfil</button>
                    <button className="w-full text-left px-6 py-4 text-sm text-white hover:bg-[#00FF85]/10">Ajuda</button>
                    <button className="w-full text-left px-6 py-4 text-sm text-red-400 hover:bg-red-600/20">Sair</button>
                  </div>
                )}
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