import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
}

interface ChatDialogProps {
  messages: Message[];
  isLoading: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  children?: React.ReactNode;
}

export function ChatDialog({ 
  messages, 
  isLoading, 
  onClose, 
  onSend,
  inputValue,
  onInputChange,
  children 
}: ChatDialogProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(inputValue);
    }
  };

  return (
    <div 
      className={cn(
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "w-full max-w-2xl max-h-[80vh] bg-background rounded-lg shadow-xl",
        "animate-in slide-in-from-bottom-4 duration-300",
        "flex flex-col"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">Assistant PPV</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea 
        className="flex-1 h-[calc(80vh-8rem)] overflow-y-auto px-4"
      >
        <div className="space-y-4 py-4">
          {children}
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              type={message.type}
            />
          ))}
          {isLoading && (
            <ChatMessage
              content=""
              type="assistant"
              isLoading={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Posez votre question..."
          disabled={isLoading}
          className="w-full"
        />
      </div>
    </div>
  );
}