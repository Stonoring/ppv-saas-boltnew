"use client"

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useChatStore } from '@/lib/stores/chat-store'

export function ChatInput() {
  const [input, setInput] = useState('')
  const { addMessage } = useChatStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Ajouter le message de l'utilisateur
    addMessage({
      role: 'user',
      content: input,
    })

    // Réinitialiser l'input
    setInput('')

    try {
      // Simuler une réponse de l'assistant (à remplacer par l'appel API)
      setTimeout(() => {
        addMessage({
          role: 'assistant',
          content: 'Je vous aide à comprendre le dispositif PPV.',
        })
      }, 1000)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Posez votre question..."
        className="min-h-[60px]"
      />
      <Button type="submit" size="icon" disabled={!input.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
