import React from 'react';
import { X } from 'lucide-react';
import './DemoWarning.css';

const DemoWarning = ({ onClose }) => {
  return (
    <div className="demo-warning-modal">
      <div className="warning-content">
        <h3>Demo Notice</h3>
        <p>This is a demonstration website. All properties are fictional.</p>
        <button 
          className="warning-confirm-btn"
          onClick={onClose}
          aria-label="Close warning"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default DemoWarning;