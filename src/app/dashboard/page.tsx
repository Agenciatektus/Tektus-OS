"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { 
  BarChart3, 
  Users, 
  Settings, 
  CreditCard,
  MessageSquare,
  FileText
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const quickActions = [
    {
      title: "Ordens de Serviço",
      description: "Gerencie suas ordens de serviço",
      icon: FileText,
      href: "/dashboard/os",
      color: "text-blue-500"
    },
    {
      title: "Clientes",
      description: "Gerencie seus clientes",
      icon: Users,
      href: "/dashboard/clientes",
      color: "text-green-500"
    },
    {
      title: "Mensagens",
      description: "Central de mensagens",
      icon: MessageSquare,
      href: "/dashboard/mensagens",
      color: "text-purple-500"
    },
    {
      title: "Relatórios",
      description: "Visualize relatórios e métricas",
      icon: BarChart3,
      href: "/dashboard/relatorios",
      color: "text-orange-500"
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => router.push("/dashboard/configuracoes")}>
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard/assinatura")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Gerenciar Assinatura
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Card
            key={action.title}
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(action.href)}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg bg-opacity-10 ${action.color} bg-current`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <div>
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Área de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Resumo do Mês</h3>
            {/* Aqui vai o gráfico de resumo */}
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Gráfico de resumo será implementado aqui
            </div>
          </div>
        </Card>
        <Card className="col-span-3">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
            {/* Lista de atividades recentes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nova OS criada</p>
                  <p className="text-xs text-muted-foreground">Há 5 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-green-100">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Novo cliente cadastrado</p>
                  <p className="text-xs text-muted-foreground">Há 1 hora</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
