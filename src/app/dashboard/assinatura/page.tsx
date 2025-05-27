"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AssinaturaPage() {
  const router = useRouter();

  // Dados mockados - depois serão substituídos por dados reais do banco
  const currentPlan = {
    name: "Profissional",
    price: "R$ 199,00",
    billingCycle: "mensal",
    nextBillingDate: "15/04/2024",
    features: [
      "Até 15 usuários",
      "Suporte prioritário",
      "Relatórios avançados",
      "Integração com WhatsApp",
      "API disponível",
      "Backup diário"
    ]
  };

  const availablePlans = [
    {
      name: "Básico",
      price: "R$ 99,00",
      features: [
        "Até 5 usuários",
        "Suporte por email",
        "Relatórios básicos",
        "Integração com WhatsApp"
      ],
      action: "Downgrade",
      icon: ArrowDownRight,
      color: "text-blue-500"
    },
    {
      name: "Empresarial",
      price: "R$ 399,00",
      features: [
        "Usuários ilimitados",
        "Suporte 24/7",
        "Relatórios personalizados",
        "Integração com WhatsApp",
        "API ilimitada",
        "Backup em tempo real",
        "SLA garantido"
      ],
      action: "Upgrade",
      icon: ArrowUpRight,
      color: "text-green-500"
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciar Assinatura</h2>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Voltar ao Dashboard
        </Button>
      </div>

      {/* Plano Atual */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold">Plano Atual</h3>
            <p className="text-muted-foreground">Detalhes da sua assinatura atual</p>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="font-medium">Ativo</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-medium mb-2">{currentPlan.name}</h4>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{currentPlan.price}</p>
              <p className="text-sm text-muted-foreground">
                Cobrança {currentPlan.billingCycle}
              </p>
              <p className="text-sm text-muted-foreground">
                Próxima cobrança: {currentPlan.nextBillingDate}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">Recursos Incluídos</h4>
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Outros Planos */}
      <div className="grid gap-6 md:grid-cols-2">
        {availablePlans.map((plan) => (
          <Card key={plan.name} className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">{plan.price}</p>
                <p className="text-sm text-muted-foreground">por mês</p>
              </div>
              <Button
                variant="outline"
                className={`${plan.color} border-current hover:bg-current hover:bg-opacity-10`}
              >
                <plan.icon className="mr-2 h-4 w-4" />
                {plan.action}
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Recursos Incluídos</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {/* Informações de Pagamento */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Informações de Pagamento</h3>
            <p className="text-muted-foreground">Gerencie seus métodos de pagamento</p>
          </div>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Atualizar Pagamento
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-4">
              <CreditCard className="h-6 w-6" />
              <div>
                <p className="font-medium">Cartão de Crédito</p>
                <p className="text-sm text-muted-foreground">Terminando em 4242</p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">Expira em 12/25</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <p>As alterações no plano serão aplicadas no próximo ciclo de faturamento.</p>
          </div>
        </div>
      </Card>
    </div>
  );
} 