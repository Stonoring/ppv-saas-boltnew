import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sendChatMessage } from '@/lib/chat';
import { ChatInput } from './ChatInput';
import { ChatDialog } from './ChatDialog';
import { ChatOverlay } from './ChatOverlay';
import { ChatSuggestions } from './ChatSuggestions';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  "Qu'est-ce que la prime de partage de la valeur ?",
  "Qui est éligible dans mon entreprise ?",
  "Comment calculer le montant optimal ?",
  "Quelles sont les étapes de mise en place ?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: text.trim(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await sendChatMessage(text);
      const botMessage: Message = {
        id: Date.now(),
        type: 'assistant',
        content: response,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de communiquer avec l'assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInput('');
  };

  return (
    <>
      <ChatInput
        value={input}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onSend={handleSend}
        isOpen={isOpen}
        disabled={isLoading}
      />

      <ChatOverlay isOpen={isOpen}>
        <ChatDialog
          messages={messages}
          isLoading={isLoading}
          onClose={handleClose}
          onSend={handleSend}
          inputValue={input}
          onInputChange={handleInputChange}
        >
          {messages.length === 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Questions fréquentes
              </h3>
              <ChatSuggestions
                suggestions={suggestions}
                onSelect={handleSend}
                isLoading={isLoading}
              />
            </div>
          )}
        </ChatDialog>
      </ChatOverlay>
    </>
  );
}