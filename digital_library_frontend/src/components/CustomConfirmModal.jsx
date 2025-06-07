// digital_library_frontend/src/components/CustomConfirmModal.jsx

import React from 'react';

function CustomConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full m-4 transform scale-95 transition-transform duration-300 ease-out">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomConfirmModal;
