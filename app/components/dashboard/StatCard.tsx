interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-[#161817] rounded-xl p-6 shadow-lg flex flex-col gap-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:bg-[#00FF85]/10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {icon && <div className="text-[#00FF85] text-xl">{icon}</div>}
      </div>
      
      <div className="mt-4">
        <p className="text-3xl font-extrabold text-white">{value}</p>
        
        {trend && (
          <div className="mt-2 flex items-center gap-2">
            <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${trend.isPositive ? 'bg-[#00FF85] text-black' : 'bg-red-500 text-white'}`}>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
            <span className="text-xs text-gray-400 ml-2">vs. mês anterior</span>
          </div>
        )}
      </div>
    </div>
  );
} 