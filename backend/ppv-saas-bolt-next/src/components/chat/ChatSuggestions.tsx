"use client"

import { Button } from '@/components/ui/button'
import { useChatStore } from '@/lib/stores/chat-store'

export function ChatSuggestions() {
  const { suggestions, addMessage } = useChatStore()

  const handleSuggestionClick = (suggestion: string) => {
    addMessage({
      role: 'user',
      content: suggestion,
    })
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}
