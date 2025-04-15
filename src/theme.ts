import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            300: '#C4FF61',
            400: '#B1FF2E',
            600: '#2DB100',
            700: '#207E00',
            800: '#134B00',
        },
        blackAlpha: {
            50: '#0000000A',
            200: '#00000014',
            300: '#00000029',
            400: '#0000003D',
            600: '#0000007A',
            700: '#000000A3',
            900: '#000000EB',
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
