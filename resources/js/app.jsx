import { createInertiaApp } from '@inertiajs/react'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles';

import globalStyles from './styles/globalStyles.jsx'
import theme from './styles/theme.jsx'

import { AuthProvider } from './Hooks/useAuthContext.jsx';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <StrictMode>
          <Global styles={globalStyles} />
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <App {...props} />
            </ThemeProvider>
          </AuthProvider>
        </StrictMode>
      </>
    )
  },
})