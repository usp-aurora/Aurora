import axios from 'axios';

export const pageView = (url) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: url,
    });
  }
};

/**
 * Registra um evento de interface no backend do Aurora (tabela activity_events)
 * e também no Google Analytics, se disponível.
 *
 * Os nomes aceitos pelo backend ficam em config/metrics.php ("client_events").
 * Falhas são ignoradas: métricas nunca devem atrapalhar o usuário.
 */
export const trackEvent = (event, properties = {}) => {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event.replace(/\./g, '_'), properties);
    }
    axios.post('/api/metrics/track', { event, properties }).catch(() => {});
  } catch {
    // ignora
  }
};
