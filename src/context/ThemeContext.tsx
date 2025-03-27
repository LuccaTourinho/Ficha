import { createContext, useState, useEffect, useContext } from "react";

type ThemeContextType = {
    darkMode: boolean;
    toggleTheme: (darkMode: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [darkMode, setDarkMode] = useState<boolean>(false)

    useEffect(() => {
        // Verifica o localStorage e a preferência do sistema
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        setDarkMode(savedTheme ? savedTheme === 'dark' : systemPrefersDark);
      }, []);

    useEffect(() => {
        // Aplica a classe ao HTML e salva no localStorage
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };