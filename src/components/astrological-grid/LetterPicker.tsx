import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface LetterPickerProps {
  children: React.ReactNode;
  currentLetter: string | null;
  onSelect: (letter: string | null) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function LetterPicker({
  children,
  currentLetter,
  onSelect,
  open,
  onOpenChange,
}: LetterPickerProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid grid-cols-7 gap-2 p-2">
          {LETTERS.map((letter) => (
            <Button
              key={letter}
              variant={currentLetter === letter ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                onSelect(letter);
                onOpenChange(false);
              }}
              className="aspect-square p-0"
            >
              {letter}
            </Button>
          ))}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onSelect(null);
              onOpenChange(false);
            }}
            className="col-span-7"
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
