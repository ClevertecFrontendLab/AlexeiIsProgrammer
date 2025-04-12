import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        lime: {
            50: '#FFFFD3',
        },
        blackAlpha: {
            700: '#000000A3',
        },
    },
    fonts: {},
    fontSizes: {},
    fontWeights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },
    lineHeights: {},
    letterSpacings: {},
});

export default theme;
