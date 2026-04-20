import { useEffect } from 'react';

interface MetaTagsOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
}

function setMetaTag(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useMetaTags({ title, description, canonical, ogImage, schema }: MetaTagsOptions) {
  useEffect(() => {
    document.title = title;

    // Meta description
    setMetaTag('name', 'description', description);

    // Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    if (canonical) {
      setMetaTag('property', 'og:url', canonical);
    }
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }

    // Twitter Card
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    if (ogImage) {
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    } else if (linkCanonical) {
      linkCanonical.remove();
    }

    // JSON-LD Schema
    if (schema) {
      const existingScript = document.querySelector('script[data-page-schema]');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-schema', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [title, description, canonical, ogImage, schema]);
}
