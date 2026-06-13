import { useEffect } from 'react';

/**
 * Adds the `.in` class to every `.ds-reveal` element as it scrolls into view.
 * Reduced-motion users get content revealed immediately (CSS handles the
 * no-transition case; we also reveal up-front to avoid any flash).
 * Re-runs whenever `deps` change (e.g. route/slug change) so newly mounted
 * page content is observed.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.ds-reveal'));
    if (els.length === 0) return;

    const reduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    // sibling stagger
    const groups = new Map<Element, number>();
    els.forEach((el) => {
      const p = el.parentElement;
      if (!p) return;
      const i = groups.get(p) || 0;
      el.style.transitionDelay = `${i * 80}ms`;
      groups.set(p, i + 1);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
