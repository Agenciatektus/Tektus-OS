import { useState } from 'react';
import { LineChart, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceDot } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Info, ChevronDown } from 'lucide-react';

const periods = [
  { label: 'Últimos 6 meses', value: '6m' },
  { label: 'Ano atual', value: 'ytd' },
  { label: '12 meses', value: '12m' },
];

const churnData = {
  '6m': [
    { name: 'Fev/24', churn: 1.2, lost: 2, base: 160 },
    { name: 'Mar/24', churn: 2.1, lost: 3, base: 142 },
    { name: 'Abr/24', churn: 1.5, lost: 2, base: 133 },
    { name: 'Mai/24', churn: 0.8, lost: 1, base: 125 },
    { name: 'Jun/24', churn: 2.7, lost: 4, base: 148 },
    { name: 'Jul/24', churn: 1.9, lost: 2, base: 105 },
  ],
  'ytd': [
    { name: 'Jan/24', churn: 1.0, lost: 1, base: 170 },
    { name: 'Fev/24', churn: 1.2, lost: 2, base: 160 },
    { name: 'Mar/24', churn: 2.1, lost: 3, base: 142 },
    { name: 'Abr/24', churn: 1.5, lost: 2, base: 133 },
    { name: 'Mai/24', churn: 0.8, lost: 1, base: 125 },
    { name: 'Jun/24', churn: 2.7, lost: 4, base: 148 },
    { name: 'Jul/24', churn: 1.9, lost: 2, base: 105 },
  ],
  '12m': [
    { name: 'Ago/23', churn: 1.3, lost: 2, base: 180 },
    { name: 'Set/23', churn: 1.1, lost: 2, base: 175 },
    { name: 'Out/23', churn: 2.0, lost: 3, base: 168 },
    { name: 'Nov/23', churn: 1.7, lost: 2, base: 162 },
    { name: 'Dez/23', churn: 0.9, lost: 1, base: 171 },
    { name: 'Jan/24', churn: 1.0, lost: 1, base: 170 },
    { name: 'Fev/24', churn: 1.2, lost: 2, base: 160 },
    { name: 'Mar/24', churn: 2.1, lost: 3, base: 142 },
    { name: 'Abr/24', churn: 1.5, lost: 2, base: 133 },
    { name: 'Mai/24', churn: 0.8, lost: 1, base: 125 },
    { name: 'Jun/24', churn: 2.7, lost: 4, base: 148 },
    { name: 'Jul/24', churn: 1.9, lost: 2, base: 105 },
  ],
};

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const { name, churn, lost, base } = payload[0].payload;
    return (
      <div className="bg-[#23242b] px-4 py-2 rounded-lg shadow text-white flex flex-col items-center">
        <span className="text-base font-bold">{name}</span>
        <span className="text-lg font-extrabold text-[#FF4D97]">{churn}%</span>
        <span className="text-xs text-gray-300">{lost} clientes perdidos de {base}</span>
      </div>
    );
  }
  return null;
}

export function ChurnCard() {
  const [period, setPeriod] = useState('6m');
  const [showDropdown, setShowDropdown] = useState(false);
  const data = churnData[period];
  const last = data[data.length - 1];
  const prev = data[data.length - 2] || { churn: 0 };
  const diff = last.churn - prev.churn;
  const isPositive = diff > 0;

  return (
    <div className="bg-[#161817] rounded-xl p-6 shadow-lg flex flex-col gap-2 w-full transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:bg-[#FF4D97]/10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">Churn de Clientes por Mês</span>
          <span className="text-gray-400" title="Churn é a taxa de clientes que saíram em relação à base total."><Info size={16} /></span>
        </div>
        <div className="relative w-fit">
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#101212] text-xs text-white hover:bg-[#FF4D97]/10 transition-colors border border-[#23242b] min-w-[120px] justify-between"
          >
            {periods.find((p) => p.value === period)?.label}
            <ChevronDown size={16} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-[#161817] rounded-lg shadow-lg border border-[#23242b] z-10">
              {periods.map((p) => (
                <button
                  key={p.value}
                  onClick={() => {
                    setPeriod(p.value);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#FF4D97]/10 ${period === p.value ? 'text-[#FF4D97]' : 'text-white'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-6 mb-2">
        <div className="flex flex-col items-start">
          <span className="text-3xl font-extrabold text-[#FF4D97]">{last.churn}%</span>
          <span className="text-xs text-gray-400">Churn atual</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-red-500 text-white' : 'bg-green-500 text-black'}`}>{isPositive ? <ArrowUpRight size={14} className="inline" /> : <ArrowDownRight size={14} className="inline" />} {Math.abs(diff).toFixed(1)}%</span>
          <span className="text-xs text-gray-400 ml-2">vs. mês anterior</span>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="churnArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF4D97" stopOpacity={0.18} />
                <stop offset="50%" stopColor="#FF4D97" stopOpacity={0.10} />
                <stop offset="100%" stopColor="#FF4D97" stopOpacity={0.00} />
              </linearGradient>
              <linearGradient id="churnLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF4D97" stopOpacity={0.0} />
                <stop offset="10%" stopColor="#FF4D97" stopOpacity={1} />
                <stop offset="90%" stopColor="#FF4D97" stopOpacity={1} />
                <stop offset="100%" stopColor="#FF4D97" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#23242b" vertical={false} />
            <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
            <YAxis stroke="#888" tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} domain={[0, 4]} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FF4D97', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area
              type="monotone"
              dataKey="churn"
              stroke={"none"}
              fill="url(#churnArea)"
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="churn"
              stroke="url(#churnLine)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#161817', stroke: '#FF4D97', strokeWidth: 3 }}
              strokeLinecap="round"
            />
            {/* Ponto destacado */}
            <ReferenceDot x={last.name} y={last.churn} r={6} fill="#161817" stroke="#FF4D97" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 