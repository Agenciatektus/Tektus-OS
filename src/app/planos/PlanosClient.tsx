"use client";
import { useState, useEffect } from "react";
import { usePaddlePrices } from '@/hooks/usePaddlePrices';
import { PricingTier } from '@/constants/pricing-tier';
import { initializePaddle, Paddle, Environments } from '@paddle/paddle-js';

export default function PlanosClient() {
  if (typeof window === "undefined") return null;

  // Debug log para saber se o token está disponível no client
  console.log("TOKEN NEXT_PUBLIC_PADDLE_CLIENT_TOKEN:", process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN);

  // Debug log para saber se está no client
  console.log("PlanosClient renderizou no client!");

  const [isMonthly, setIsMonthly] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);

  const frequency = isMonthly ? 'month' : 'year';
  const { prices, loading } = usePaddlePrices(paddle, 'BR');

  useEffect(() => setIsClient(true), []);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
      }).then((paddle) => {
        if (paddle) setPaddle(paddle);
      });
    }
  }, []);

  useEffect(() => {
    console.log("Paddle:", paddle);
    console.log("Prices:", prices);
    console.log("Loading:", loading);
  }, [paddle, prices, loading]);

  if (!isClient) return <div className="w-full flex justify-center items-center py-20 text-white text-xl">Carregando ambiente do navegador...</div>;
  if (!paddle) return <div className="w-full flex justify-center items-center py-20 text-white text-xl">Não foi possível inicializar a Paddle. Verifique as credenciais e conexão.</div>;
  if (loading) return <div className="w-full flex justify-center items-center py-20 text-white text-xl">Carregando planos...</div>;
  if (!prices || Object.keys(prices).length === 0) return <div className="w-full flex justify-center items-center py-20 text-white text-xl">Nenhum plano encontrado. Verifique a integração com a Paddle.</div>;

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
      {/* Header modularizado com efeito de scroll */}
      {/* ...adicione aqui o header e o restante do conteúdo da página, igual estava no PlanosPage... */}
      {/* Cards dos planos com dados dinâmicos da Paddle */}
      <div className="isolate grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PricingTier.map((plan) => (
          <div key={plan.id} className="relative rounded-lg bg-background/70 backdrop-blur-[6px] overflow-hidden">
            {plan.featured && (
              <>
                <div className="featured-price-title" />
                <div className="featured-yellow-highlight-bg" />
                <div className="featured-hard-blur-bg" />
                <div className="featured-vertical-hard-blur-bg" />
                <div className="featured-soft-blur-bg" />
              </>
            )}
            <div className="flex items-center gap-3 px-8 pt-8 mb-6">
              <img src={plan.icon} alt={plan.name} className="h-8 w-8" />
              <span className="text-[20px] leading-[30px] font-semibold">{plan.name}</span>
            </div>
            <div className="px-8 flex items-end gap-2 mb-4">
              <span className="text-[80px] leading-[96px] tracking-[-1.6px] font-medium">
                {loading ? '...' : prices[plan.priceId[frequency]] || '---'}
              </span>
              <span className="text-[12px] font-medium mb-4">/mês</span>
            </div>
            <p className="px-8 text-center text-[16px] leading-[24px] mb-10">{plan.description}</p>
            <div className="px-8 mb-4">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium cursor-pointer ring-offset-background transition-colors focus:ring-ring focus:ring-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative bg-[#fcfcfc33] text-white secondary-button-animation disabled:bg-[#191A1A] h-11 px-5 py-[10px] w-full">
                Selecionar Plano
              </button>
            </div>
            <ul className="p-8 flex flex-col gap-3 mt-2">
              {plan.features.map((feature, i) => (
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
        ))}
      </div>
    </div>
  );
} 