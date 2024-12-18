import { create } from 'zustand'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatSuggestion {
  text: string
  onClick: () => void
}

interface ChatStore {
  messages: ChatMessage[]
  suggestions: ChatSuggestion[]
  addMessage: (message: ChatMessage) => void
  setSuggestions: (suggestions: ChatSuggestion[]) => void
  clearMessages: () => void
  clearSuggestions: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  suggestions: [],
  addMessage: (message) => 
    set((state) => ({ 
      messages: [...state.messages, message],
      suggestions: [] // Clear suggestions when a new message is added
    })),
  setSuggestions: (suggestions) => 
    set({ suggestions }),
  clearMessages: () => 
    set({ messages: [], suggestions: [] }),
  clearSuggestions: () => 
    set({ suggestions: [] }),
}))
