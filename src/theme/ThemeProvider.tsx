import React, { createContext, useContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
    theme: Theme
    isDark: boolean
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemScheme = Appearance.getColorScheme()
    const [theme, setTheme] = useState<Theme>(systemScheme === 'dark' ? 'dark' : 'light')

    useEffect(() => {
        const ap = Appearance as unknown as { setColorScheme?: (s: Theme) => void };
        ap.setColorScheme?.(theme);
    }, [theme]);

    useEffect(() => {
        const sub = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? 'dark' : 'light')
        })
        return () => sub.remove()
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextValue => {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
    return ctx
}

export default ThemeProvider
