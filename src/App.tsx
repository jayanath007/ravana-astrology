import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AstrologicalGrid } from '@/components/astrological-grid/AstrologicalGrid';
import { BirthDetailsForm } from '@/components/birth-details/BirthDetailsForm';
import { DivisionChartsPage } from '@/components/division-charts/DivisionChartsPage';
import { ThathkalaPage } from '@/components/thathkala/ThathkalaPage';
import { DashaPage } from '@/components/dasha/DashaPage';
import { ChartErrorBoundary } from '@/components/error-boundary/ChartErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BirthDetailsForm />} />
        <Route path="/chart" element={<AstrologicalGrid />} />
        <Route
          path="/divisions"
          element={
            <ChartErrorBoundary>
              <DivisionChartsPage />
            </ChartErrorBoundary>
          }
        />
        <Route
          path="/thathkala"
          element={
            <ChartErrorBoundary>
              <ThathkalaPage />
            </ChartErrorBoundary>
          }
        />
        <Route
          path="/dasha"
          element={
            <ChartErrorBoundary>
              <DashaPage />
            </ChartErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
