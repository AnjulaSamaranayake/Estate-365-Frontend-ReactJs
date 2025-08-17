import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import DemoWarning from './DemoWarning';
import './Layout.css';

const Layout = () => {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="app-container">
      {showWarning && <DemoWarning onClose={() => setShowWarning(false)} />}
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} HomeHarbor. All rights reserved.</p>
        <p>Created by ANJU.</p>
      </footer>
    </div>
  );
};

export default Layout;