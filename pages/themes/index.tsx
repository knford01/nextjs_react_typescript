import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Typography } from '@mui/material';
import { themes, ThemeType } from '@/components/theme/ThemeStyles';
import { useState } from 'react';
import Theme from '@/components/theme/Theme';

const ThemeSelectionPage: React.FC = () => {
    const [selectedTheme, setSelectedTheme] = useState<ThemeType>('light');
    const router = useRouter();

    const handleThemeChange = (theme: ThemeType) => {
        setSelectedTheme(theme);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Select a Theme
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.keys(themes).map((themeKey) => (
                        <Button
                            key={themeKey}
                            variant="contained"
                            onClick={() => handleThemeChange(themeKey as ThemeType)}
                        >
                            {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                        </Button>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default ThemeSelectionPage;
