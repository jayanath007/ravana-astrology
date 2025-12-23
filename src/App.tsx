import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AstrologicalGrid } from '@/components/astrological-grid/AstrologicalGrid';
import { BirthDetailsForm } from '@/components/birth-details/BirthDetailsForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BirthDetailsForm />} />
        <Route path="/chart" element={<AstrologicalGrid />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
