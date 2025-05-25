import { useState } from 'react';
import { Mail, Phone, Linkedin, Instagram, Search, Briefcase, Users } from 'lucide-react';

const equipe = [
  {
    id: 1,
    nome: 'Arthur Pagliarini',
    cargo: 'Closer',
    nivel: 'Sênior',
    setor: 'Comercial',
    status: 'Ativo',
    dataAdmissao: '2022-03-01',
    aniversario: '1990-01-01',
    email: 'arthur@email.com',
    telefone: '(11) 99999-9999',
    whatsapp: 'https://wa.me/5511999999999',
    linkedin: 'https://linkedin.com/in/arthurpagliarini',
    instagram: 'https://instagram.com/arthurpagliarini',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    online: true,
  },
  {
    id: 2,
    nome: 'Peterson de Lima',
    cargo: 'CEO',
    nivel: 'Sênior',
    setor: 'Diretoria',
    status: 'Ativo',
    dataAdmissao: '2021-01-15',
    aniversario: '1988-07-10',
    email: 'peterson@email.com',
    telefone: '(21) 98888-8888',
    whatsapp: 'https://wa.me/5521988888888',
    linkedin: 'https://linkedin.com/in/petersondelima',
    instagram: 'https://instagram.com/petersondelima',
    foto: 'https://randomuser.me/api/portraits/men/33.jpg',
    online: false,
  },
  {
    id: 3,
    nome: 'Maria Souza',
    cargo: 'Designer',
    nivel: 'Pleno',
    setor: 'Criação',
    status: 'Em férias',
    dataAdmissao: '2023-05-10',
    aniversario: '1995-03-22',
    email: 'maria@email.com',
    telefone: '(11) 97777-7777',
    whatsapp: 'https://wa.me/5511977777777',
    linkedin: 'https://linkedin.com/in/mariasouza',
    instagram: 'https://instagram.com/mariasouza',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    online: true,
  },
  {
    id: 4,
    nome: 'João Silva',
    cargo: 'Dev Backend',
    nivel: 'Júnior',
    setor: 'Tech',
    status: 'Desligado',
    dataAdmissao: '2022-09-01',
    aniversario: '1998-11-05',
    email: 'joao@email.com',
    telefone: '(11) 96666-6666',
    whatsapp: 'https://wa.me/5511966666666',
    linkedin: 'https://linkedin.com/in/joaosilva',
    instagram: 'https://instagram.com/joaosilva',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
    online: false,
  },
];

const statusColors: Record<string, string> = {
  'Ativo': 'bg-green-500',
  'Em férias': 'bg-yellow-400',
  'Desligado': 'bg-gray-500',
};

const setores = ['Todos', ...Array.from(new Set(equipe.map(e => e.setor)))];
const niveis = ['Todos', ...Array.from(new Set(equipe.map(e => e.nivel)))];

export function TeamGallery() {
  const [busca, setBusca] = useState('');
  const [setor, setSetor] = useState('Todos');
  const [nivel, setNivel] = useState('Todos');

  const membrosFiltrados = equipe.filter(m =>
    (setor === 'Todos' || m.setor === setor) &&
    (nivel === 'Todos' || m.nivel === nivel) &&
    (m.nome.toLowerCase().includes(busca.toLowerCase()) || m.cargo.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <div className="w-full mt-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Equipe Tektus</h2>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nome ou cargo..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-lg bg-[#23242b] text-white text-sm border border-[#23242b] focus:outline-none focus:border-[#00FF85] min-w-[200px]"
            />
          </div>
          <select
            value={setor}
            onChange={e => setSetor(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#23242b] text-white text-sm border border-[#23242b] focus:outline-none focus:border-[#00FF85]"
          >
            {setores.map(s => <option key={s}>{s}</option>)}
          </select>
          <select
            value={nivel}
            onChange={e => setNivel(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#23242b] text-white text-sm border border-[#23242b] focus:outline-none focus:border-[#00FF85]"
          >
            {niveis.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {membrosFiltrados.map(m => (
          <div key={m.id} className="bg-[#161817] rounded-xl p-4 flex flex-col items-center shadow-lg hover:shadow-2xl hover:bg-[#00FF85]/10 transition-all duration-300 group">
            <img src={m.foto} alt={m.nome} className="w-20 h-20 rounded-full object-cover border-4 border-[#23242b] group-hover:border-[#00FF85] transition-all duration-300" />
            <div className="mt-3 text-center w-full">
              <div className="text-lg font-bold text-white flex items-center justify-center gap-2">
                <span className={`w-3 h-3 rounded-full inline-block border-2 border-[#23242b] ${m.online ? 'bg-green-500' : 'bg-gray-500'}`}
                  title={m.online ? 'Online agora' : 'Offline'}></span>
                {m.nome}
                <span className={`ml-2 w-3 h-3 rounded-full inline-block ${statusColors[m.status] || 'bg-gray-500'}`} title={m.status}></span>
              </div>
              <div className="text-sm text-gray-400 flex items-center justify-center gap-1 mt-1">
                <Briefcase className="w-4 h-4" /> {m.cargo} • {m.nivel}
              </div>
              <div className="text-xs text-gray-400 mt-1">{m.setor}</div>
              <div className="flex gap-2 justify-center mt-2">
                <a href={`mailto:${m.email}`} className="text-[#00FF85] hover:underline" title="E-mail"><Mail size={16} /></a>
                <a href={`tel:${m.telefone}`} className="text-[#00FF85] hover:underline" title="Telefone"><Phone size={16} /></a>
                <a href={m.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#00FF85]" title="WhatsApp"><Users size={16} /></a>
                {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#00FF85]" title="LinkedIn"><Linkedin size={16} /></a>}
                {m.instagram && <a href={m.instagram} target="_blank" rel="noopener noreferrer" className="text-[#00FF85]" title="Instagram"><Instagram size={16} /></a>}
              </div>
              <div className="flex flex-col gap-1 mt-3 text-xs text-gray-400">
                <span>Admissão: {new Date(m.dataAdmissao).toLocaleDateString('pt-BR')}</span>
                <span>Aniversário: {new Date(m.aniversario).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        ))}
        {membrosFiltrados.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">
            Nenhum membro encontrado.
          </div>
        )}
      </div>
    </div>
  );
} 