"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const DEFAULT_THEME = "blue";

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Helper para definir o cookie no lado do cliente
 */
function setThemeCookie(themeName: string) {
  const date = new Date();
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 ano de expiração
  document.cookie = `active_theme=${themeName}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: string;
}) {
  // 1. o setter do useState
  const [activeTheme, _setActiveTheme] = useState<string>(
    () => initialTheme || DEFAULT_THEME
  );

  // 2. Função 'setActiveTheme' que será passada para o context.
  const setActiveTheme = useCallback((theme: string) => {
    // Atualiza o estado do React
    _setActiveTheme(theme);
    // Atualiza o cookie
    setThemeCookie(theme);
  }, []); // O useCallback garante que a função não seja recriada

  useEffect(() => {
    // Lógica para atualizar o <body>.
    const themeClassesToRemove = Array.from(document.body.classList).filter(
      (className) =>
        className.startsWith("theme-") &&
        className !== "theme-container" &&
        className !== "theme-scaled"
    );

    themeClassesToRemove.forEach((className) => {
      document.body.classList.remove(className);
    });

    document.body.classList.add(`theme-${activeTheme}`);

    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled");
    } else {
      document.body.classList.remove("theme-scaled");
    }
  }, [activeTheme]); // Este efeito ainda roda quando 'activeTheme' muda

  return (
    // 3. Passando a nossa função 'setActiveTheme' para o provider
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider"
    );
  }
  return context;
}
