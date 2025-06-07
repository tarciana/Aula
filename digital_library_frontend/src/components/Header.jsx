// digital_library_frontend/src/components/Header.jsx

import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 rounded-lg shadow-lg mb-8 flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-4xl font-extrabold mb-4 sm:mb-0">Minha Biblioteca Digital</h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="text-lg hover:text-blue-200 transition duration-300">
              Início
            </a>
          </li>
          {/* Adicionar outros links de navegação aqui, se necessário */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;