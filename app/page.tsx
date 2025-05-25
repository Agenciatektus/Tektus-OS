'use client';

import { DashboardLayout } from './components/layout/DashboardLayout';
import { StatCard } from './components/dashboard/StatCard';
import { TopUsersRanking } from './components/dashboard/TopUsersRanking';
import { PerformanceChart } from './components/dashboard/PerformanceChart';
import { MonthRevenueCard } from './components/dashboard/MonthRevenueCard';
import { ChurnCard } from './components/dashboard/ChurnCard';
import { TeamGallery } from './components/dashboard/TeamGallery';
import {
  Users,
  TrendingUp, 
  Calendar, 
  MessageSquare 
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Bem-vindo ao Tektus SO</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Clientes Ativos"
            value="24"
            icon={<Users className="w-5 h-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          
          <StatCard
            title="Vendas do Mês"
            value="R$ 45.000"
            icon={<TrendingUp className="w-5 h-5" />}
            trend={{ value: 8, isPositive: true }}
          />
          
          <StatCard
            title="Tarefas Pendentes"
            value="12"
            icon={<Calendar className="w-5 h-5" />}
            trend={{ value: 5, isPositive: false }}
          />
          
          <StatCard
            title="NPS Médio"
            value="9.2"
            icon={<MessageSquare className="w-5 h-5" />}
            trend={{ value: 0.5, isPositive: true }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart />
          <MonthRevenueCard />
        </div>

        {/* Ranking de Usuários + Churn lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <TopUsersRanking />
          <ChurnCard />
        </div>

        {/* Recent Activity */}
        <div className="bg-[#161817] rounded-lg p-6 mt-8">
          <h3 className="text-lg font-medium mb-4">Atividades Recentes</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-[#0D100F] rounded-lg">
              <div className="w-2 h-2 bg-[#00FF85] rounded-full"></div>
              <div>
                <p className="text-sm">Nova tarefa criada: &quot;Atualização do site&quot;</p>
                <p className="text-xs text-gray-400">Há 5 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[#0D100F] rounded-lg">
              <div className="w-2 h-2 bg-[#00FF85] rounded-full"></div>
              <div>
                <p className="text-sm">Novo cliente adicionado: &quot;Empresa XYZ&quot;</p>
                <p className="text-xs text-gray-400">Há 15 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[#0D100F] rounded-lg">
              <div className="w-2 h-2 bg-[#00FF85] rounded-full"></div>
              <div>
                <p className="text-sm">Reunião agendada: &quot;Planejamento Q3&quot;</p>
                <p className="text-xs text-gray-400">Há 1 hora</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TeamGallery />
    </DashboardLayout>
  );
}
