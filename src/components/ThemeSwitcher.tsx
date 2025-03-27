// components/ThemeSwitcher.tsx
'use client';

import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { useTheme } from '@/context/ThemeContext';

const ThemeSwitcher = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="mr-2 lg:mr-8 p-2 rounded-full border-4 transition-all duration-300 hover:cursor-pointer"
      aria-label={darkMode ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
    >
      {darkMode ? (
        <IoSunnyOutline className="text-foreground" size={30} />
      ) : (
        <IoMoonOutline className="text-foreground" size={30} />
      )}
    </button>
  );
};

export default ThemeSwitcher;