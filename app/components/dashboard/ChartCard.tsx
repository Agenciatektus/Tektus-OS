'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  type: 'line' | 'pie';
  data: ChartData[];
}

const COLORS = ['#00FF85', '#00DD4B', '#161817', '#D9D9D9'];

export function ChartCard({ title, type, data }: ChartCardProps) {
  return (
    <div className="bg-[#161817] rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:bg-[#00FF85]/10">
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161817',
                  border: '1px solid #00FF85',
                  borderRadius: '4px',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00FF85"
                strokeWidth={2}
              />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161817',
                  border: '1px solid #00FF85',
                  borderRadius: '4px',
                }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
} 