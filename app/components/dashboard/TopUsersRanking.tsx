import { ArrowUpRight, ArrowDownRight, MoreVertical, Clock, CheckCircle, Award } from 'lucide-react';
import Image from 'next/image';

const users = [
  {
    name: 'Glenn Holden',
    role: 'Dev Frontend',
    location: 'Nevada',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    position: 1,
    completed: 32,
    efficiency: 92,
    avgTime: '2d 4h',
    trend: 'up',
    badge: 'Top Performer',
    badgeColor: 'bg-green-600',
  },
  {
    name: 'Lolita Hamill',
    role: 'Designer',
    location: 'Texas',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    position: 2,
    completed: 28,
    efficiency: 88,
    avgTime: '2d 8h',
    trend: 'down',
    badge: 'Mais Rápida',
    badgeColor: 'bg-blue-600',
  },
  {
    name: 'Robert Mercer',
    role: 'Gestor de Projetos',
    location: 'California',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    position: 3,
    completed: 25,
    efficiency: 85,
    avgTime: '3d 1h',
    trend: 'up',
    badge: '',
    badgeColor: '',
  },
  {
    name: 'Marie Kim',
    role: 'Dev Backend',
    location: 'Montana',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    position: 4,
    completed: 22,
    efficiency: 80,
    avgTime: '3d 6h',
    trend: 'down',
    badge: 'Maior Volume',
    badgeColor: 'bg-yellow-600',
  },
  {
    name: 'Sonya Henshaw',
    role: 'QA',
    location: 'Colorado',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    position: 5,
    completed: 20,
    efficiency: 78,
    avgTime: '4d 2h',
    trend: 'up',
    badge: '',
    badgeColor: '',
  },
];

export function TopUsersRanking() {
  return (
    <div className="bg-[#161817] rounded-xl p-4 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:bg-[#00FF85]/10 h-full max-w-full overflow-x-auto custom-scrollbar">
      <div className="flex items-center justify-between border-b border-[#00FF85]/10 pb-2 mb-2">
        <span className="font-semibold text-lg">Top Colaboradores</span>
        <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-[#00FF85]">
          All Members <ArrowDownRight size={14} className="inline ml-1" />
        </button>
      </div>
      {/* Cabeçalho das colunas */}
      <div className="hidden md:grid grid-cols-[minmax(180px,2fr)_60px_90px_90px_110px_70px_110px_40px] gap-2 px-2 pb-2 text-xs text-gray-400 font-semibold">
        <div>Colaborador</div>
        <div className="text-center">Posição</div>
        <div className="text-center">Concluídas</div>
        <div className="text-center">Eficiência</div>
        <div className="text-center">Tempo Médio</div>
        <div className="text-center">Tendência</div>
        <div className="text-center">Badge</div>
        <div className="text-center"></div>
      </div>
      <ul className="divide-y divide-[#00FF85]/10">
        {users.map((user, idx) => (
          <li key={idx} className="grid grid-cols-[minmax(180px,2fr)_60px_90px_90px_110px_70px_110px_40px] gap-2 items-center py-3 px-2">
            {/* Colaborador */}
            <div className="flex items-center gap-3 overflow-hidden">
              <Image src={user.avatar} alt={user.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div className="truncate">
                <div className="font-semibold text-sm truncate">{user.name}</div>
                <div className="text-xs text-gray-400 truncate">{user.role}</div>
              </div>
            </div>
            {/* Posição */}
            <div className="w-full flex justify-center">
              {user.position === 1 ? (
                <Award className="text-yellow-400" size={20} title="1º lugar" />
              ) : (
                <span className="font-bold text-lg text-gray-300">{user.position}º</span>
              )}
            </div>
            {/* Tarefas concluídas */}
            <div className="w-full flex items-center justify-center gap-1">
              <CheckCircle className="text-[#00FF85]" size={16} />
              <span className="text-sm">{user.completed}</span>
            </div>
            {/* Eficiência */}
            <div className="w-full flex flex-col items-center">
              <span className={`text-sm font-semibold ${user.efficiency >= 85 ? 'text-green-400' : 'text-red-400'}`}>{user.efficiency}%</span>
              <span className="text-xs text-gray-400">no prazo</span>
            </div>
            {/* Tempo médio */}
            <div className="w-full flex items-center justify-center gap-1">
              <Clock className="text-gray-400" size={15} />
              <span className="text-sm">{user.avgTime}</span>
            </div>
            {/* Tendência */}
            <div className="w-full flex justify-center">
              {user.trend === 'up' ? (
                <ArrowUpRight className="text-green-500" size={16} />
              ) : (
                <ArrowDownRight className="text-red-500" size={16} />
              )}
            </div>
            {/* Badge */}
            <div className="w-full flex justify-center">
              {user.badge && (
                <span className={`px-2 py-0.5 rounded text-xs text-white ${user.badgeColor}`}>{user.badge}</span>
              )}
            </div>
            {/* Menu de ações */}
            <div className="w-full flex justify-center">
              <button className="text-gray-400 hover:text-[#00FF85]">
                <MoreVertical size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Estilos customizados para a barra de rolagem
Adicione no final do arquivo (ou em um arquivo global de CSS se preferir)

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #2F2F2F;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2BC92A;
  border-radius: 20px;
  border: 10px solid #209432;
}
*/ 