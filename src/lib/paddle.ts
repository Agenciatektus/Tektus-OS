// Este arquivo não deve mais importar ou inicializar o Paddle diretamente.
// Use hooks client-side, como usePaddle, para acessar o Paddle no navegador.

// Você pode manter funções utilitárias aqui, se necessário, mas sem dependências do Paddle.

// Função para criar uma assinatura
export async function createSubscription(priceId: string, customerId: string) {
  try {
    const subscription = await paddle.subscriptions.create({
      priceId,
      customerId,
      items: [
        {
          priceId,
          quantity: 1,
        },
      ],
    });
    return subscription;
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    throw error;
  }
}

// Função para cancelar uma assinatura
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await paddle.subscriptions.cancel(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    throw error;
  }
}

// Função para obter os detalhes de uma assinatura
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await paddle.subscriptions.get(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Erro ao obter detalhes da assinatura:', error);
    throw error;
  }
} 