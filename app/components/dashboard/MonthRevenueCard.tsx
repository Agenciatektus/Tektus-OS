'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const periods = [
  { label: 'Mês Atual', value: 'current' },
  { label: 'Últimos 3 meses', value: '3m' },
  { label: 'Últimos 6 meses', value: '6m' },
  { label: 'Ano', value: 'year' },
];

const data = {
  current: { recorrente: 12000, pontual: 3500 },
  '3m': { recorrente: 34000, pontual: 9000 },
  '6m': { recorrente: 67000, pontual: 18000 },
  year: { recorrente: 130000, pontual: 42000 },
};

const COLORS = ['#00FF85', '#00B86B']; // Verde claro e verde escuro para contraste

export function MonthRevenueCard() {
  const [period, setPeriod] = useState<'current' | '3m' | '6m' | 'year'>('current');
  const [showDropdown, setShowDropdown] = useState(false);
  const [types, setTypes] = useState({ recorrente: true, pontual: true });

  const handleTypeChange = (type: 'recorrente' | 'pontual') => {
    setTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const chartData = [
    types.recorrente ? { name: 'Recorrente', value: data[period].recorrente } : null,
    types.pontual ? { name: 'Pontual', value: data[period].pontual } : null,
  ].filter(Boolean);

  const total = chartData.reduce((acc, cur) => acc + (cur?.value || 0), 0);

  return (
    <div className="bg-[#161817] rounded-xl p-4 md:p-6 shadow-lg flex flex-col gap-2 w-full transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:bg-[#00FF85]/10 max-w-full col-span-1 mx-auto md:mx-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <span className="text-lg font-bold text-white">Faturamento do Mês</span>
        <div className="relative w-fit">
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#101212] text-xs text-white hover:bg-[#00FF85]/10 transition-colors border border-[#23242b] min-w-[120px] justify-between"
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
                    setPeriod(p.value as 'current' | '3m' | '6m' | 'year');
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#00FF85]/10 ${period === p.value ? 'text-[#00FF85]' : 'text-white'}`}
                >
                  {p.label}
                </button>
              ))}
              <div className="border-t border-[#23242b] my-1" />
              <div className="px-4 py-2 flex flex-col gap-2">
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={types.recorrente}
                    onChange={() => handleTypeChange('recorrente')}
                    className="accent-[#00FF85] w-4 h-4 rounded"
                  />
                  Recorrente
                </label>
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={types.pontual}
                    onChange={() => handleTypeChange('pontual')}
                    className="accent-[#00FF85] w-4 h-4 rounded"
                  />
                  Pontual
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-2">
        <div className="w-52 h-52 sm:w-60 sm:h-60 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={95}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg sm:text-xl font-extrabold text-[#00FF85] whitespace-nowrap">R$ {total.toLocaleString('pt-BR')}</span>
            <span className="text-xs text-gray-400">{types.recorrente && types.pontual ? 'Total' : types.recorrente ? 'Recorrente' : 'Pontual'}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-2 text-xs text-gray-400 w-full justify-center items-center">
          {types.recorrente && <span>Recorrente: <span className="text-white">R$ {data[period].recorrente.toLocaleString('pt-BR')}</span></span>}
          {types.pontual && <span>Pontual: <span className="text-white">R$ {data[period].pontual.toLocaleString('pt-BR')}</span></span>}
        </div>
      </div>
    </div>
  );
} 