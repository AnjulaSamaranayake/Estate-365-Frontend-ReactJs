import React, { useState } from 'react';
import { X } from 'lucide-react';
import './DemoWarning.css';

const DemoWarning = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="demo-warning">
      <div className="warning-content">
        <p>⚠️ This is a demo website. All properties are fictional.</p>
        <button 
          className="close-warning"
          onClick={() => setVisible(false)}
          aria-label="Close warning"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default DemoWarning;