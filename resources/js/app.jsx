import './bootstrap';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import GlobalStyles from './styles/GlobalStyles.jsx'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <GlobalStyles></GlobalStyles>
        <App {...props} />
      </>
    )
  },
})