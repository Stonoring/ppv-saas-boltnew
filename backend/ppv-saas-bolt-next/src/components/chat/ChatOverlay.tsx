"use client"

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatOverlayProps {
  onClick: () => void
}

export function ChatOverlay({ onClick }: ChatOverlayProps) {
  return (
    <div className="fixed bottom-4 right-4">
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={onClick}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
