import { cn } from '@/lib/utils';

interface ChatOverlayProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export function ChatOverlay({ isOpen, children }: ChatOverlayProps) {
  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
        "animate-in fade-in-0 duration-300"
      )}
    >
      {children}
    </div>
  );
}