// digital_library_frontend/src/components/CustomToast.jsx

import React, { useState, useEffect } from 'react';

function CustomToast({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 3000); // Esconde o toast após 3 segundos

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!isVisible) return null;

  const typeClasses = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-blue-600',
  };

  return (
    <div
      className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-xl text-white text-center transition-all duration-300 transform ${typeClasses[type] || 'bg-gray-700'} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
      role="alert"
    >
      <div className="flex justify-between items-center gap-4">
        <span>{message}</span>
        <button onClick={() => { setIsVisible(false); if (onClose) onClose(); }} className="ml-4 text-white font-bold text-lg leading-none hover:text-gray-200">&times;</button>
      </div>
    </div>
  );
}

export default CustomToast;
