import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'


export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // const [theme, setTheme] = useState<Theme>(() => {
  //   const savedTheme = localStorage.getItem("task-app-theme");

  //   if (savedTheme === "dark" || savedTheme === "light") {
  //     return savedTheme;
  //   }

  //   return "light";
  // });
  // useEffect(() => {
  //   localStorage.setItem("task-app-theme", theme);
  // }, [theme]);

  //using custom hooks instead of use
  const [theme, setTheme] = useLocalStorage<Theme>("task-app-theme", "light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }


  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}



export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
