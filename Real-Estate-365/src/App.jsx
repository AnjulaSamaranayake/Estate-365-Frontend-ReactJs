import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import SearchPage from './components/SearchPage.jsx';
import PropertyDetails from "./components/PropertyDetails";
function App() {
  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
  );
}

export default App;
