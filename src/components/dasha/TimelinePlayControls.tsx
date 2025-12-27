import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelinePlayControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onJumpToToday: () => void;
  className?: string;
}

export function TimelinePlayControls({
  isPlaying,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onJumpToToday,
  className,
}: TimelinePlayControlsProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {/* Step Backward Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onStepBackward}
        aria-label="Step backward one day"
        title="Step backward one day"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Play/Pause Toggle Button */}
      <Button
        variant="default"
        size="icon"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause timeline animation' : 'Play timeline animation'}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      {/* Step Forward Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onStepForward}
        aria-label="Step forward one day"
        title="Step forward one day"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Separator */}
      <div className="h-8 w-px bg-neutral-300 dark:bg-neutral-600 mx-2" />

      {/* Jump to Today Button */}
      <Button
        variant="outline"
        onClick={onJumpToToday}
        aria-label="Jump to today's date"
        title="Jump to today"
        className="gap-2"
      >
        <Calendar className="h-4 w-4" />
        <span className="hidden sm:inline">අද</span>
      </Button>
    </div>
  );
}
