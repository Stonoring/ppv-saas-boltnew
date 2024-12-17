import { Button } from '@/components/ui/button';

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  isLoading: boolean;
}

export function ChatSuggestions({ suggestions, onSelect, isLoading }: ChatSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="secondary"
          size="sm"
          onClick={() => onSelect(suggestion)}
          disabled={isLoading}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}