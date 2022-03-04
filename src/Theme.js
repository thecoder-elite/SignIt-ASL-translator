import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontSize: 16,
        fontFamily: " 'Roboto', sans-serif",
        button: {
            textTransform: "none",
        },
        h1: {
            fontSize: 40,
        },
        h2: {
            fontSize: 32,
        },
        h3: {
            fontSize: 25,
        }
    }
});
