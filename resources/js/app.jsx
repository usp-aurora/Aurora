import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles';

import globalStyles from './styles/globalStyles'
import theme from './styles/theme'
import { pageView } from './analytics';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <Global styles={globalStyles} />
          <ThemeProvider theme={theme}>
            <App {...props} />
          </ThemeProvider>
      </>
    )
  },
})

window.addEventListener('inertia:finish', (event) => {
  pageView(event.detail.visit.url);
});