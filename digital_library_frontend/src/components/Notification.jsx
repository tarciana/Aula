// digital_library_frontend/src/components/Notification.jsx

import React, { useEffect, useState } from 'react';

/**
 * Componente Notification para exibir mensagens de feedback (sucesso ou erro).
 * A mensagem desaparece automaticamente após um tempo.
 *
 * @param {object} props - As propriedades passadas para o componente.
 * @param {string} props.message - O texto da mensagem a ser exibida.
 * @param {'success' | 'error'} props.type - O tipo da mensagem ('success' para verde, 'error' para vermelho).
 * @param {function} props.onClose - Função de callback chamada quando a notificação é fechada ou desaparece.
 */
function Notification({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // A notificação desaparece após 5 segundos (RF006: Exibição de Mensagens)
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 5000);

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, [onClose]);

  if (!isVisible || !message) {
    return null;
  }

  const baseClasses = "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white font-semibold flex items-center";
  const typeClasses = type === 'success' ? "bg-green-500" : "bg-red-500"; // Cores para sucesso/erro

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <span>{message}</span>
      <button
        onClick={() => { setIsVisible(false); if (onClose) onClose(); }}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
}

export default Notification;
