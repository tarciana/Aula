// digital_library_frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // Onde o Tailwind deve procurar por classes CSS em seus arquivos
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garante que todos os arquivos JS, TS, JSX, TSX em src/ sejam escaneados
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
