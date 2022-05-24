import { blue, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme {
    // additional styles as needed
  }

  // allow configuration using `createTheme`
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeOptions {
    // additional styles as needed
  }
}
