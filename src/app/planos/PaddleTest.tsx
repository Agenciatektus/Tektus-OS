"use client";
import { useEffect } from "react";
import { initializePaddle, Environments } from "@paddle/paddle-js";

export default function PaddleTest() {
  useEffect(() => {
    async function init() {
      console.log("TOKEN TESTE:", process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN);
      console.log("ENV TESTE:", process.env.NEXT_PUBLIC_PADDLE_ENV);
      try {
        if (!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) {
          throw new Error("Token do Paddle não encontrado");
        }
        
        const paddle = await initializePaddle({
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
          environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
        });
        
        console.log("Paddle TEST:", paddle);
        if (!paddle) {
          throw new Error("Falha ao inicializar Paddle");
        }
        
        alert("Paddle inicializada com sucesso!");
      } catch (e) {
        console.error("Erro ao inicializar Paddle:", e);
        alert("Erro ao inicializar Paddle! Veja o console.");
      }
    }
    init();
  }, []);
  return <div style={{color: 'white', padding: 32}}>Teste de inicialização Paddle (veja o console)</div>;
} 