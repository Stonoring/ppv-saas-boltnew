import { cn } from '@/lib/utils';

interface ChatMessageProps {
  content: string;
  type: 'user' | 'assistant';
  isLoading?: boolean;
}

export function ChatMessage({ content, type, isLoading }: ChatMessageProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-4 animate-in slide-in-from-bottom-2">
        <div className="animate-pulse flex gap-1">
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <div className="w-2 h-2 rounded-full bg-primary/50 animation-delay-200" />
          <div className="w-2 h-2 rounded-full bg-primary/50 animation-delay-500" />
        </div>
        <span className="text-sm text-muted-foreground">
          L'assistant est en train de faire ses recherches...
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-4 rounded-lg animate-in slide-in-from-bottom-2",
        type === 'user' ? "bg-muted/50" : "bg-primary/5",
        "prose prose-sm max-w-none overflow-auto"
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}