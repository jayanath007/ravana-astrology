import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface BirthDetails {
  birthDate: string;
  birthTime: string;
  latitude: number;
  longitude: number;
  timeZoneId: string;
}

export interface PlanetSign {
  planet: string;
  sign: number;
}

export function BirthDetailsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BirthDetails>({
    birthDate: '1987-10-09',
    birthTime: '14:41',
    latitude: 6.9271,
    longitude: 79.8612,
    timeZoneId: 'Asia/Colombo',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
   
    try {
      // Call both APIs in parallel
      const [ascendantResponse, planetSignsResponse] = await Promise.all([
        fetch('http://localhost:5188/api/birthchart/ascendant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }),
        fetch('http://localhost:5188/api/birthchart/planet-signs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

  
          body: JSON.stringify(formData),
        })
      ]);

      if (!ascendantResponse.ok) {
        throw new Error(`Ascendant API request failed: ${ascendantResponse.status} ${ascendantResponse.statusText}`);
      }

      if (!planetSignsResponse.ok) {
        throw new Error(`Planet signs API request failed: ${planetSignsResponse.status} ${planetSignsResponse.statusText}`);
      }

      // Get the zodiac sign number from the ascendant response
      const ascendantData = await ascendantResponse.json();
      const zodiacNumber = ascendantData.sign;

      // Get the planet signs array from the planet-signs response
      const planetSigns: PlanetSign[] = await planetSignsResponse.json();

      // Navigate to the astrological grid page with all data
      navigate('/chart', {
        state: {
          birthDetails: formData,
          zodiacNumber: zodiacNumber,
          planetSigns: planetSigns
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate birth chart');
      console.error('Error calculating birth chart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDivisionCharts = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Call both APIs in parallel
      const [ascendantResponse, planetSignsResponse] = await Promise.all([
        fetch('http://localhost:5188/api/birthchart/ascendant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }),
        fetch('http://localhost:5188/api/birthchart/planet-signs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
      ]);

      if (!ascendantResponse.ok) {
        throw new Error(`Ascendant API request failed: ${ascendantResponse.status} ${ascendantResponse.statusText}`);
      }

      if (!planetSignsResponse.ok) {
        throw new Error(`Planet signs API request failed: ${planetSignsResponse.status} ${planetSignsResponse.statusText}`);
      }

      // Get the zodiac sign number from the ascendant response
      const ascendantData = await ascendantResponse.json();
      const zodiacNumber = ascendantData.sign;

      // Get the planet signs array from the planet-signs response
      const planetSigns: PlanetSign[] = await planetSignsResponse.json();

      // Navigate to the division charts page with all data
      navigate('/divisions', {
        state: {
          birthDetails: formData,
          zodiacNumber: zodiacNumber,
          planetSigns: planetSigns
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate birth chart');
      console.error('Error calculating birth chart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude'
        ? parseFloat(value) || 0
        : value,
    }));
  };

  return (
    <div className="container mx-auto p-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-neutral-900 dark:text-neutral-100">
          Birth Chart Calculator
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-6 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 shadow-lg"
        >
          {/* Birth Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="birthDate" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Birth Date
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Birth Time */}
          <div className="flex flex-col gap-2">
            <label htmlFor="birthTime" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Birth Time
            </label>
            <input
              id="birthTime"
              name="birthTime"
              type="time"
              value={formData.birthTime}
              onChange={handleChange}
              required
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Latitude */}
          <div className="flex flex-col gap-2">
            <label htmlFor="latitude" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Latitude
            </label>
            <input
              id="latitude"
              name="latitude"
              type="number"
              step="0.0001"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="e.g., 6.9271"
              required
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Longitude */}
          <div className="flex flex-col gap-2">
            <label htmlFor="longitude" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Longitude
            </label>
            <input
              id="longitude"
              name="longitude"
              type="number"
              step="0.0001"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="e.g., 79.8612"
              required
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time Zone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="timeZoneId" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Time Zone ID
            </label>
            <input
              id="timeZoneId"
              name="timeZoneId"
              type="text"
              value={formData.timeZoneId}
              onChange={handleChange}
              placeholder="e.g., Asia/Colombo"
              required
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors"
            >
              {isLoading ? 'Calculating...' : 'Calculate Birth Chart'}
            </button>

            <button
              type="button"
              onClick={handleDivisionCharts}
              disabled={isLoading}
              className="px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors"
            >
              {isLoading ? 'Calculating...' : 'View Division Charts'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
