"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback, // Vamos usar o useCallback
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
  // 1. Renomeamos o setter original do useState
  const [activeTheme, _setActiveTheme] = useState<string>(
    () => initialTheme || DEFAULT_THEME
  );

  // 2. Criamos nossa nova função 'setActiveTheme'
  //    que será passada para o contexto.
  const setActiveTheme = useCallback((theme: string) => {
    // Atualiza o estado do React
    _setActiveTheme(theme);
    // Atualiza o cookie
    setThemeCookie(theme);
  }, []); // O useCallback garante que a função não seja recriada

  useEffect(() => {
    // Esta lógica para atualizar o <body> continua perfeita.
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
    // 3. Passamos a nossa nova função 'setActiveTheme' para o provider
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
            {children}   {" "}
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
