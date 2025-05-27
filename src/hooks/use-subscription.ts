import { useState } from 'react'
import { getCurrentUser } from '@/lib/supabase'
import { usePaddle } from '@/hooks/usePaddle'

export function useSubscription() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const paddle = usePaddle()

  const subscribe = async (priceId: string) => {
    try {
      setLoading(true)
      setError(null)

      const user = await getCurrentUser()
      if (!user) {
        throw new Error('Usuário não autenticado')
      }

      if (!paddle) {
        throw new Error('Paddle não está disponível no client')
      }

      const subscription = await paddle.subscriptions.create({
        priceId,
        customerId: user.id,
        items: [
          {
            priceId,
            quantity: 1,
          },
        ],
      })
      return subscription
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar assinatura')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const cancel = async (subscriptionId: string) => {
    try {
      setLoading(true)
      setError(null)

      const subscription = await cancelSubscription(subscriptionId)
      return subscription
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cancelar assinatura')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getSubscriptionDetails = async (subscriptionId: string) => {
    try {
      setLoading(true)
      setError(null)

      const subscription = await getSubscription(subscriptionId)
      return subscription
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter detalhes da assinatura')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    subscribe,
    cancel,
    getSubscriptionDetails,
  }
} 