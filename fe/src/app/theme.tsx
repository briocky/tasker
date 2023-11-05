'use client';
import { createTheme } from '@mui/material/styles';
import { PaletteColorOptions } from '@mui/material/styles/createPalette';

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    primary: {
      main: '#78123A',
    },
    secondary: {
      main: '#FFCD4B',
    },
    gray: palette.augmentColor({
      color: {
        main: '#858585E5',
      },
    }),
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    gray: string;
  }
  interface PaletteOptions {
    gray: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray: true;
  }
}

export default theme;
