import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onSend: (message: string) => void;
  isOpen: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onFocus,
  onSend,
  isOpen,
  placeholder = "Comment puis-je vous aider ?",
  disabled
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };

  return (
    <div 
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50",
        "transition-all duration-300",
        isOpen ? "scale-105" : "scale-100"
      )}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full pl-9 py-6 pr-4 shadow-lg",
            "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
            "transition-all duration-300",
            isOpen ? "rounded-t-lg" : "rounded-full"
          )}
        />
      </div>
    </div>
  );
}