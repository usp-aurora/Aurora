import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import theme from '../resources/js/styles/MUITheme';

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      default: theme,
    },
    defaultTheme: 'default',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
];

export default preview;

export const parameters = {
  backgrounds: {
    values: [
      {
        name: 'dark',
        value: '#333333',
      },
      {
        name: 'light',
        value: '#f8f8f8',
      },
    ],
  },
};