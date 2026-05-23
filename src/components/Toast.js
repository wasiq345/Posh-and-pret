import React, { useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [message, onDone]);

  return (
    <div className="toast">
      <i className="fas fa-check-circle"></i>
      {message}
    </div>
  );
}
