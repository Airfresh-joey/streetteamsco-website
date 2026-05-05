declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

export function initGA() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
}

// --- GA4 Event Tracking Functions ---

export function trackCTAClick(ctaName: string, page: string) {
  window.gtag?.('event', 'cta_click', {
    cta_name: ctaName,
    page_location: page,
  });
}

export function trackFormSubmit(formName: string) {
  window.gtag?.('event', 'form_submit', {
    form_name: formName,
  });
}

export function trackFormAbandonment(formName: string, lastField: string) {
  window.gtag?.('event', 'form_abandonment', {
    form_name: formName,
    last_field: lastField,
  });
}

export function trackCalculatorUse(serviceType: string, estimatedCost: number) {
  window.gtag?.('event', 'calculator_use', {
    service_type: serviceType,
    estimated_cost: estimatedCost,
  });
}

export function trackCalendlyOpen(page: string) {
  window.gtag?.('event', 'calendly_open', {
    page_location: page,
  });
}

export function trackPhoneClick() {
  window.gtag?.('event', 'phone_click', {
    link_text: 'phone_number',
  });
}

export function trackEmailClick() {
  window.gtag?.('event', 'email_click', {
    link_text: 'hello@streetteamsco.com',
  });
}
