import { useGridState } from '@/hooks/useGridState';
import { GRID_CONFIG } from './grid-config';
import { GridArea } from './GridArea';

export function AstrologicalGrid() {
  const { getLetter, setLetter } = useGridState();

  return (
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full border-2 border-neutral-300 dark:border-neutral-700"
          xmlns="http://www.w3.org/2000/svg"
        >
          {GRID_CONFIG.map((config) => (
            <GridArea
              key={config.id}
              config={config}
              letter={getLetter(config.id)}
              onLetterSelect={setLetter}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
