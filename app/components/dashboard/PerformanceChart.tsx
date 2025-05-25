'use client';
import { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, ChevronDown } from 'lucide-react';

const periods = [
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '6M', value: '6m' },
  { label: 'YTD', value: 'ytd' },
  { label: '1Y', value: '1y' },
  { label: 'ALL', value: 'all' },
];

const dataByPeriod = {
  '1m': [
    { name: 'JUN', value: 120000, change: 0 },
    { name: 'JUL', value: 153000, change: 13 },
  ],
  '3m': [
    { name: 'MAY', value: 90000, change: 0 },
    { name: 'JUN', value: 120000, change: 33 },
    { name: 'JUL', value: 153000, change: 13 },
  ],
  '6m': [
    { name: 'FEB', value: 60000, change: 0 },
    { name: 'MAR', value: 100000, change: 67 },
    { name: 'APR', value: 80000, change: -20 },
    { name: 'MAY', value: 90000, change: 13 },
    { name: 'JUN', value: 120000, change: 33 },
    { name: 'JUL', value: 153000, change: 13 },
  ],
  'ytd': [
    { name: 'JAN', value: 20000, change: 0 },
    { name: 'FEB', value: 60000, change: 200 },
    { name: 'MAR', value: 100000, change: 67 },
    { name: 'APR', value: 80000, change: -20 },
    { name: 'MAY', value: 90000, change: 13 },
    { name: 'JUN', value: 120000, change: 33 },
    { name: 'JUL', value: 153000, change: 13 },
  ],
  '1y': [
    { name: 'JAN', value: 20000, change: 0 },
    { name: 'FEB', value: 60000, change: 200 },
    { name: 'MAR', value: 100000, change: 67 },
    { name: 'APR', value: 80000, change: -20 },
    { name: 'MAY', value: 90000, change: 13 },
    { name: 'JUN', value: 120000, change: 33 },
    { name: 'JUL', value: 153000, change: 13 },
    { name: 'AUG', value: 153000, change: 0 },
    { name: 'SEP', value: 110000, change: -28 },
    { name: 'OCT', value: 90000, change: -18 },
    { name: 'NOV', value: 100000, change: 11 },
    { name: 'DEC', value: 120000, change: 20 },
  ],
  'all': [
    { name: 'JAN', value: 20000, change: 0 },
    { name: 'FEB', value: 60000, change: 200 },
    { name: 'MAR', value: 100000, change: 67 },
    { name: 'APR', value: 80000, change: -20 },
    { name: 'MAY', value: 90000, change: 13 },
    { name: 'JUN', value: 120000, change: 33 },
    { name: 'JUL', value: 153000, change: 13 },
    { name: 'AUG', value: 153000, change: 0 },
    { name: 'SEP', value: 110000, change: -28 },
    { name: 'OCT', value: 90000, change: -18 },
    { name: 'NOV', value: 100000, change: 11 },
    { name: 'DEC', value: 120000, change: 20 },
  ],
};

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const { value, change } = payload[0].payload;
    return (
      <div className="bg-[#23242b] px-4 py-2 rounded-lg shadow text-white flex flex-col items-center">
        <span className="text-lg font-bold">${(value / 1000).toFixed(0)}K</span>
        <span className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {Math.abs(change)}%</span>
      </div>
    );
  }
  return null;
}

export function PerformanceChart() {
  const [period, setPeriod] = useState('1y');
  const data = dataByPeriod[period];
  // Ponto selecionado: último do período
  const selectedIdx = data.length - 1;
  const selected = data[selectedIdx];
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-[#161817] rounded-xl p-4 shadow-lg w-full transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:bg-[#00FF85]/10">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-lg">Desempenho em Vendas</span>
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
                    setPeriod(p.value);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#00FF85]/10 ${period === p.value ? 'text-[#00FF85]' : 'text-white'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {/* Gradiente para preenchimento */}
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF4D97" stopOpacity={0.18} />
                <stop offset="50%" stopColor="#FF4D97" stopOpacity={0.10} />
                <stop offset="100%" stopColor="#FF4D97" stopOpacity={0.00} />
              </linearGradient>
              {/* Gradiente para linha */}
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF4D97" stopOpacity={0.0} />
                <stop offset="10%" stopColor="#FF4D97" stopOpacity={1} />
                <stop offset="90%" stopColor="#FF4D97" stopOpacity={1} />
                <stop offset="100%" stopColor="#FF4D97" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#23242b" vertical={false} />
            <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
            <YAxis stroke="#888" tickLine={false} axisLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FF4D97', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={"none"}
              fill="url(#areaGradient)"
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#161817', stroke: '#FF4D97', strokeWidth: 3 }}
              strokeLinecap="round"
            />
            {/* Ponto destacado */}
            <ReferenceDot x={selected.name} y={selected.value} r={6} fill="#161817" stroke="#FF4D97" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 