import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import GlobalStyles from './styles/GlobalStyles.jsx'

import MUITheme from './styles/MUITheme.jsx'
import { ThemeProvider } from '@mui/material/styles';

import { AuthProvider } from './Hooks/useAuthContext.jsx';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <AuthProvider>
          <ThemeProvider theme={MUITheme}>
            <GlobalStyles></GlobalStyles>
            <App {...props} />
          </ThemeProvider>
        </AuthProvider>
      </>
    )
  },
})