// jest.config.js

module.exports = {
  // Define o ambiente de teste como JSDOM (simula um navegador)
  testEnvironment: 'jest-environment-jsdom',

  // Padrões para arquivos de teste (procura arquivos .test.js, .test.jsx, .spec.js, .spec.jsx)
  testMatch: [
    '<rootDir>/src/**/*.test.jsx',
    '<rootDir>/src/**/*.test.js',
    '<rootDir>/src/**/*.spec.js',
    '<rootDir>/src/**/*.spec.jsx'
  ],

  // Configura os transformadores para Babel (para que Jest possa entender JSX e JS moderno)
  transform: {
    // Usa 'babel-jest' para transpilar arquivos .js e .jsx
    '^.+\\.(js|jsx)$': ['babel-jest', {
      // Adiciona explicitamente os presets do Babel aqui, garantindo que o preset-react seja usado
      presets: ['@babel/preset-env', '@babel/preset-react']
    }],
  },

  // Mapeia imports para módulos mock (para lidar com arquivos CSS/imagens)
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Permite importar CSS sem erros em testes
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js', // Mock para arquivos de mídia
  },

  // Configurações a serem executadas antes de cada teste
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],

  // Coleta de cobertura de código
  collectCoverage: true, // Habilita a coleta de cobertura
  collectCoverageFrom: [ // Define quais arquivos devem ter a cobertura coletada
    'src/**/*.{js,jsx}',
    '!src/main.jsx', // Exclui o ponto de entrada principal do React
    '!src/App.jsx', // Exclui App.jsx se ele for apenas um container de exemplo
  ],
  coverageDirectory: 'coverage', // Pasta onde os relatórios de cobertura serão salvos
  coverageReporters: ['json-summary', 'text', 'lcov', 'html'], // Tipos de relatórios (adicionado 'html')
};
