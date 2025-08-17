import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import SearchPage from './components/SearchPage.jsx';
import PropertyDetails from "./components/PropertyDetails.jsx";
import ContactAgent from "./components/ContactAgent.jsx";
import ContactForm from './components/ContactForm.jsx';
import Layout from './components/Layout.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="property/:id" element={<PropertyDetails />} />
        <Route path="contact" element={<ContactAgent />} />
        <Route path="contact-form" element={<ContactForm />} />
      </Route>
    </Routes>
  );
}

export default App;