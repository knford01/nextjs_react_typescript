import React, { createContext, useContext, useState, ReactNode } from 'react';
import { themes, ThemeType } from './ThemeStyles';
import { ThemeProvider, Theme } from '@mui/material/styles';

type ThemeContextType = {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }
    return context;
};

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ThemeProvider theme={themes[theme]}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
