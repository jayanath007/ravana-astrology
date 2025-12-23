import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGridState } from '@/hooks/useGridState';
import { GRID_CONFIG } from './grid-config';
import { GridArea } from './GridArea';
import type { BirthDetails } from '@/components/birth-details/BirthDetailsForm';

export function AstrologicalGrid() {
  const location = useLocation();
  const navigate = useNavigate();
  const birthDetails = location.state?.birthDetails as BirthDetails | undefined;
  const zodiacNumber = location.state?.zodiacNumber as number | undefined;

  const { getLetter, setLetter } = useGridState();
  const [offsetValue, setOffsetValue] = useState(zodiacNumber || 1);
  const [inputValue, setInputValue] = useState(String(zodiacNumber || 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(inputValue);
    if (!isNaN(num) && num >= 1 && num <= 12) {
      setOffsetValue(num);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Header with Birth Details */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white font-medium rounded-md transition-colors mb-4"
        >
          ← Back to Input
        </button>

        {birthDetails && (
          <div className="p-4 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800">
            <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">Birth Details</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">Date:</span>{' '}
                <span className="text-neutral-900 dark:text-neutral-100">{birthDetails.birthDate}</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">Time:</span>{' '}
                <span className="text-neutral-900 dark:text-neutral-100">{birthDetails.birthTime}</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">Latitude:</span>{' '}
                <span className="text-neutral-900 dark:text-neutral-100">{birthDetails.latitude}</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">Longitude:</span>{' '}
                <span className="text-neutral-900 dark:text-neutral-100">{birthDetails.longitude}</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">Time Zone:</span>{' '}
                <span className="text-neutral-900 dark:text-neutral-100">{birthDetails.timeZoneId}</span>
              </div>
              {zodiacNumber && (
                <div>
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Ascendant:</span>{' '}
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{zodiacNumber}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-8">
        {/* Input Form - Left Panel */}
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800">
            <label htmlFor="zodiac-input" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Enter Number (1-12)
            </label>
            <input
              id="zodiac-input"
              type="number"
              min="1"
              max="12"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Grid */}
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
                offsetValue={offsetValue}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
