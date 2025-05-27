"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";

type PlanCardProps = {
  icon: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
};

// Componente reutilizável para os cards de plano
function PlanCard({
  icon,
  name,
  price,
  description,
  features,
  highlight,
  badge,
}: PlanCardProps) {
  return (
    <div className={`relative pricing-card-border bg-background/70 backdrop-blur-[6px] rounded-lg overflow-hidden text-white flex flex-col w-full ${highlight ? "z-10" : ""}`}
      style={{ overflow: 'hidden' }}
    >
      {/* Efeitos especiais do Pro */}
      {highlight && (
        <>
          <div className="featured-price-title" />
          <div className="featured-yellow-highlight-bg" />
          <div className="featured-hard-blur-bg" />
          <div className="featured-vertical-hard-blur-bg" />
          <div className="featured-soft-blur-bg" />
        </>
      )}
      {/* Badge Most popular */}
      {badge && (
        <span className="absolute top-4 right-4 featured-card-badge text-[12px] px-2 py-1 rounded font-bold uppercase tracking-wide shadow">
          {badge}
        </span>
      )}
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 px-8 pt-8 mb-6">
        <img src={icon} alt={name} className="h-8 w-8" />
        <span className="text-[20px] leading-[30px] font-semibold">{name}</span>
      </div>
      {/* Preço */}
      <div className="px-8 flex items-end gap-2 mb-4">
        <span className="text-[80px] leading-[96px] tracking-[-1.6px] font-medium">R$ {price}</span>
        <span className="text-[12px] font-medium mb-4">/mês</span>
      </div>
      {/* Descrição */}
      <p className="px-8 text-center text-[16px] leading-[24px] mb-10">{description}</p>
      {/* Botão */}
      <div className="px-8 mb-4">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium cursor-pointer ring-offset-background transition-colors focus:ring-ring focus:ring-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative bg-[#fcfcfc33] text-white secondary-button-animation disabled:bg-[#191A1A] h-11 px-5 py-[10px] w-full">
          Selecionar Plano
        </button>
      </div>
      {/* Efeito luminoso no topo do card Pro */}
      {highlight && (
        <div
          className="absolute"
          style={{
            top: 0,
            left: 'calc(50% - 124px)',
            width: '248px',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 15%, rgba(255,248,0,0.6) 50%, rgba(255,255,255,0) 85%)',
            zIndex: 20,
          }}
        />
      )}
      {/* Lista de benefícios */}
      <ul className="p-8 flex flex-col gap-3 mt-2">
        {features.map((feature: string, i: number) => (
          <li key={i} className="flex gap-x-3 items-start text-base">
            <svg className="lucide lucide-circle-check h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Atualizar os planos para Starter, Pro e Advanced
const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: "/assets/icons/price-tiers/basic-icon.svg",
    price: 99,
    description: "Ideal para pequenas empresas começarem sua gestão.",
    features: [
      "Até 5 usuários",
      "Suporte por email",
      "Relatórios básicos",
      "Integração com WhatsApp",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: "/assets/icons/price-tiers/pro-icon.svg",
    price: 199,
    description: "Para empresas em crescimento que precisam de mais recursos.",
    features: [
      "Até 15 usuários",
      "Suporte prioritário",
      "Relatórios avançados",
      "Integração com WhatsApp",
      "API disponível",
      "Backup diário",
    ],
    highlight: true,
    badge: "Mais popular",
  },
  {
    id: "advanced",
    name: "Advanced",
    icon: "/assets/icons/price-tiers/free-icon.svg",
    price: 399,
    description: "Para grandes empresas que precisam de performance e escala.",
    features: [
      "Usuários ilimitados",
      "Suporte 24/7",
      "Relatórios personalizados",
      "Integração com WhatsApp",
      "API ilimitada",
      "Backup em tempo real",
      "SLA garantido",
    ],
  },
];

const features = [
  {
    title: "Gestão Completa",
    description: "Centralize todas as operações da sua agência em um único lugar",
    icon: "📊",
  },
  {
    title: "Automação Inteligente",
    description: "Automatize tarefas repetitivas e aumente a produtividade",
    icon: "⚡",
  },
  {
    title: "Relatórios Detalhados",
    description: "Acompanhe métricas importantes com dashboards personalizados",
    icon: "📈",
  },
  {
    title: "Integração Total",
    description: "Conecte-se com as principais ferramentas do mercado",
    icon: "🔄",
  },
];

// Header modularizado com efeito de scroll
type HeaderWithScrollEffectProps = {
  children: React.ReactNode;
};

function HeaderWithScrollEffect({ children }: HeaderWithScrollEffectProps) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-[6px] shadow-md' : 'bg-transparent'}`}>
      {children}
    </header>
  );
}

export default function PlanosPage() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setIsClient(true), []);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isClient) return null;

  return (
    <div className="relative min-h-screen bg-[#0f1515] flex flex-col overflow-hidden">
      {/* Camadas de fundo na ordem correta */}
      <img
        src="/assets/background/grid-bg.svg"
        alt="Grid background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '80vw',
          height: 'auto',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
      <img
        src="/assets/background/grain-blur.svg"
        alt="Grain blur background"
        style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(50vh - 270px)',
          transform: 'translateX(-50%)',
          width: '1280px',
          maxWidth: '90vw',
          height: 'auto',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      />
      <div className="background-base grid-bg" style={{zIndex: 0, width: '80vw', left: 0, top: 0, position: 'absolute', inset: 0, pointerEvents: 'none'}} />
      <div className="background-base grain-blur" style={{zIndex: 1, position: 'absolute', inset: 0, pointerEvents: 'none'}} />
      <div className="background-base grain-background" style={{zIndex: 2, position: 'absolute', inset: 0, pointerEvents: 'none'}} />

      {/* Header modularizado com efeito de scroll */}
      <HeaderWithScrollEffect>
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex justify-between items-center">
          <img
            src="/logo-tektus/logo-tektus-os-branca.svg"
            alt="Tektus OS"
            className="h-8"
          />
          <nav className="flex items-center gap-8">
            <a href="#funcionalidades" className="text-gray-300 hover:text-white transition">
              Funcionalidades
            </a>
            <a href="#planos" className="text-gray-300 hover:text-white transition">
              Planos
            </a>
            <Link
              href="/login"
              className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </nav>
        </div>
      </HeaderWithScrollEffect>

      {/* Conteúdo principal */}
      <main className="relative z-10 flex-1 flex flex-col items-center">
        {/* Título e subtítulo */}
        <div className="w-full max-w-[1280px] px-4 pt-[250px] pb-16">
          <h1 className="text-[48px] md:text-[80px] font-bold text-white text-center drop-shadow-lg leading-[56px] md:leading-[80px]">
            Ferramentas poderosas.<br />Preços simples.
          </h1>
          <p className="mt-4 text-[18px] md:text-[20px] text-gray-300 text-center max-w-2xl mx-auto leading-[28px] md:leading-[30px]">
            Planos para empresas de todos os tamanhos — de startups a grandes empresas.
          </p>
        </div>

        {/* Seção de Funcionalidades */}
        <section id="funcionalidades" className="w-full py-20">
          <div className="max-w-[1280px] mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Funcionalidades que transformam sua agência
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative rounded-lg bg-background/70 backdrop-blur-[6px] overflow-hidden border flex flex-col items-center"
                  style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <div className="p-8 w-full flex flex-col items-center">
                    {/* Se quiser destacar algum card, descomente a linha abaixo */}
                    {/* <div className="featured-yellow-highlight-bg"></div> */}
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-center">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Planos */}
        <section id="planos" className="w-full py-20">
          <div className="max-w-[1280px] mx-auto px-4">
            {/* Alternador Mensal/Anual visual customizado */}
            <div className="flex justify-center mb-12">
              <button
                type="button"
                aria-label="Alternar mensal/anual"
                className="relative p-0 border-none bg-transparent cursor-pointer"
                style={{ outline: 'none' }}
                onClick={() => setIsMonthly((prev) => !prev)}
              >
                <svg
                  width="217"
                  height="56"
                  viewBox="0 0 217 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: 'block' }}
                >
                  {/* Fundo escuro */}
                  <rect width="217" height="56" rx="10" fill="#0F1515" />
                  {/* Slider claro */}
                  <rect
                    x={isMonthly ? 6 : 111}
                    y={6}
                    width={100}
                    height={44}
                    rx={6}
                    fill="#182222"
                    style={{
                      transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
                    }}
                  />
                  {/* Texto Mensal */}
                  <text
                    x="54"
                    y="29"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Inter, sans-serif"
                    fontWeight="bold"
                    fontSize="18"
                    fill="#fff"
                    opacity={isMonthly ? 1 : 0.5}
                    style={{ pointerEvents: 'none' }}
                  >
                    Mensal
                  </text>
                  {/* Texto Anual */}
                  <text
                    x="163"
                    y="29"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Inter, sans-serif"
                    fontWeight="bold"
                    fontSize="18"
                    fill="#fff"
                    opacity={isMonthly ? 0.5 : 1}
                    style={{ pointerEvents: 'none' }}
                  >
                    Anual
                  </text>
                </svg>
              </button>
            </div>
            {/* Cards dos planos com estrutura padronizada AeroEdit */}
            <div className="isolate grid grid-cols-1 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div key={plan.id} className="relative rounded-lg bg-background/70 backdrop-blur-[6px] overflow-hidden">
                  {/* Borda gradiente vertical apenas na borda do card */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-lg"
                    style={{
                      border: '1px solid transparent',
                      zIndex: 10,
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(15,21,21,0)) border-box',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor',
                    }}
                  />
                  {/* Borda gradiente no topo do card */}
                  <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-b from-white/20 to-transparent"></div>
                  <div className="pricing-card-border relative flex flex-col w-full h-full">
                    {/* Efeito luminoso Pro */}
                    {plan.highlight && (
                      <div className="absolute inset-0 z-[-1] bg-[url('/assets/background/login-gradient.svg')] bg-top bg-contain bg-no-repeat"></div>
                    )}
                    {/* Borda luminosa amarela (opcional, pode ser base do card ou título) */}
                    {plan.highlight && (
                      <div className="featured-yellow-highlight-bg"></div>
                    )}
                    {/* Badge Most popular */}
                    {plan.badge && (
                      <span className="absolute top-4 right-4 featured-card-badge text-[12px] px-2 py-1 rounded font-bold uppercase tracking-wide shadow">
                        {plan.badge}
                      </span>
                    )}
                    {/* Cabeçalho */}
                    <div className="flex items-center gap-3 px-8 pt-8 mb-6">
                      <img src={plan.icon} alt={plan.name} className="h-8 w-8" />
                      <span className="text-[20px] leading-[30px] font-semibold">{plan.name}</span>
                    </div>
                    {/* Preço */}
                    <div className="px-8 flex items-end gap-2 mb-4">
                      <span className={`text-[80px] leading-[96px] tracking-[-1.6px] font-medium ${plan.highlight ? 'featured-price-title' : ''}`}>R$ {plan.price}</span>
                      <span className="text-[12px] font-medium mb-4">/mês</span>
                    </div>
                    {/* Descrição */}
                    <p className="px-8 text-center text-[16px] leading-[24px] mb-10">{plan.description}</p>
                    {/* Botão */}
                    <div className="px-8 mb-4">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium cursor-pointer ring-offset-background transition-colors focus:ring-ring focus:ring-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative bg-[#fcfcfc33] text-white secondary-button-animation disabled:bg-[#191A1A] h-11 px-5 py-[10px] w-full">
                        Selecionar Plano
                      </button>
                    </div>
                    {/* Efeito luminoso no topo do card Pro */}
                    {plan.highlight && (
                      <div
                        className="absolute"
                        style={{
                          top: 0,
                          left: 'calc(50% - 124px)',
                          width: '248px',
                          height: '1px',
                          background: 'linear-gradient(90deg, rgba(255,255,255,0) 15%, rgba(255,248,0,0.6) 50%, rgba(255,255,255,0) 85%)',
                          zIndex: 20,
                        }}
                      />
                    )}
                    {/* Lista de benefícios */}
                    <ul className="p-8 flex flex-col gap-3 mt-2">
                      {plan.features.map((feature: string, i: number) => (
                        <li key={i} className="flex gap-x-3 items-start text-base">
                          <svg className="lucide lucide-circle-check h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="bg-[#0f1515] py-8 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6 flex-wrap justify-center">
              <img src="/assets/icons/logo/paddle-logo.svg" alt="Paddle" className="h-6" />
              <img src="/assets/icons/logo/tailwind-logo.svg" alt="Tailwind" className="h-6" />
              <img src="/assets/icons/logo/supabase-logo.svg" alt="Supabase" className="h-6" />
              <img src="/assets/icons/logo/nextjs-logo.svg" alt="Next.js" className="h-6" />
              <img src="/assets/icons/logo/shadcn-logo.svg" alt="shadcn/ui" className="h-6" />
            </div>
            <p className="text-gray-500 text-sm mt-2">
              © 2025 Tektus OS. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 