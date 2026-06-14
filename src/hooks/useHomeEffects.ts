import { useEffect } from 'react';

/**
 * Ports the streetteamshomepagev5.html animation suite into the React homepage.
 * Everything is guarded by prefers-reduced-motion and pointer/hover capability,
 * and fully cleans up on unmount. Desktop gets the full set (cursor, magnetic,
 * letter physics); mobile/reduced-motion stay clean and fast.
 */
export function useHomeEffects() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hoverable = matchMedia('(hover: hover)').matches && matchMedia('(pointer: fine)').matches;
    const rafs: number[] = [];
    const cleanups: Array<() => void> = [];
    const RAF = (fn: FrameRequestCallback) => { const id = requestAnimationFrame(fn); rafs.push(id); return id; };

    if (!reduced) document.body.classList.add('ds-anim');

    // ---------- custom cursor (desktop) ----------
    if (!reduced && hoverable) {
      const cursor = document.createElement('div');
      cursor.className = 'ds-cursor';
      const label = document.createElement('span');
      cursor.appendChild(label);
      document.body.appendChild(cursor);
      let cx = -100, cy = -100, tx = -100, ty = -100;
      const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
      addEventListener('mousemove', onMove, { passive: true });
      const tick = () => {
        cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
        cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
        RAF(tick);
      };
      RAF(tick);
      const hot = (txt: string) => () => { cursor.classList.add('hot'); label.textContent = txt; };
      const cool = () => { cursor.classList.remove('hot'); label.textContent = ''; };
      const targets = Array.from(document.querySelectorAll('a, button'));
      targets.forEach((el) => {
        const txt = el.classList.contains('ds-btn-ink') || el.classList.contains('nav-cta') ? 'GO' : '';
        el.addEventListener('mouseenter', hot(txt));
        el.addEventListener('mouseleave', cool);
      });
      cleanups.push(() => { removeEventListener('mousemove', onMove); cursor.remove(); });
    }

    // ---------- magnetic buttons (desktop) ----------
    if (!reduced && hoverable) {
      const btns = Array.from(document.querySelectorAll<HTMLElement>('.ds-btn, .nav-cta'));
      btns.forEach((btn) => {
        const move = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          btn.style.transform = `translate(${dx * 0.16}px,${dy * 0.2}px)`;
        };
        const reset = () => { btn.style.transform = ''; };
        btn.addEventListener('mousemove', move);
        btn.addEventListener('mouseleave', reset);
        cleanups.push(() => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', reset); });
      });
    }

    // ---------- velocity-reactive tickers ----------
    if (!reduced) {
      const tracks = Array.from(document.querySelectorAll<HTMLElement>('.ds-ticker-track, .ds-city-track'))
        .map((el, i) => {
          el.classList.remove('ds-ticker-anim'); // take over from CSS marquee
          return { el, x: 0, speed: 0.5, dir: i % 2 === 0 ? -1 : 1, half: 0 };
        });
      const measure = () => tracks.forEach((t) => { t.half = t.el.scrollWidth / 2; });
      measure();
      addEventListener('resize', measure);
      let lastY = scrollY, velocity = 0;
      const onScroll = () => { velocity = Math.min(Math.abs(scrollY - lastY), 60); lastY = scrollY; };
      addEventListener('scroll', onScroll, { passive: true });
      const tickTickers = () => {
        velocity *= 0.92;
        const lean = Math.min(velocity * 0.18, 7);
        tracks.forEach((t) => {
          t.x += t.dir * (t.speed + velocity * 0.12);
          if (t.half > 0) { if (t.x <= -t.half) t.x += t.half; if (t.x > 0) t.x -= t.half; }
          t.el.style.transform = `translateX(${t.x}px) skewX(${-t.dir * lean}deg)`;
        });
        RAF(tickTickers);
      };
      RAF(tickTickers);
      cleanups.push(() => { removeEventListener('resize', measure); removeEventListener('scroll', onScroll); });
    }

    // ---------- masked heading line reveals ----------
    {
      const heads = Array.from(document.querySelectorAll<HTMLElement>('.ds-h2:not([data-words])'));
      heads.forEach((h2) => {
        if (h2.querySelector('.ds-mline')) return;
        const parts = h2.innerHTML.split(/<br\s*\/?>/i);
        h2.innerHTML = parts
          .map((p, i) => `<span class="ds-mline"><span class="ds-minner" style="transition-delay:${i * 120}ms">${p}</span></span>`)
          .join('');
      });
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: 0.2 });
        heads.forEach((h) => io.observe(h));
        cleanups.push(() => io.disconnect());
      } else {
        heads.forEach((h) => h.classList.add('in'));
      }
    }

    // ---------- manifesto word reveal ----------
    {
      const el = document.querySelector<HTMLElement>('[data-words]');
      if (el && !el.querySelector('.ds-w')) {
        el.classList.add('ds-words');
        const wrap = (node: Node) => {
          Array.from(node.childNodes).forEach((n) => {
            if (n.nodeType === 3) {
              const frag = document.createDocumentFragment();
              (n.textContent || '').split(/(\s+)/).forEach((part) => {
                if (/^\s+$/.test(part) || part === '') { frag.appendChild(document.createTextNode(part)); }
                else { const s = document.createElement('span'); s.className = 'ds-w'; s.textContent = part; frag.appendChild(s); }
              });
              node.replaceChild(frag, n);
            } else if (n.nodeType === 1) { wrap(n); }
          });
        };
        wrap(el);
        el.querySelectorAll<HTMLElement>('.ds-w').forEach((w, i) => { w.style.transitionDelay = `${i * 40}ms`; });
        if ('IntersectionObserver' in window) {
          const io = new IntersectionObserver((es, obs) => {
            es.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); obs.disconnect(); } });
          }, { threshold: 0.35 });
          io.observe(el);
          cleanups.push(() => io.disconnect());
        } else { el.classList.add('in'); }
      }
    }

    // ---------- A DAY ON THE STREET (scroll-scrubbed canvas) ----------
    const day = document.getElementById('ds-day');
    if (day) {
      const clock = day.querySelector<HTMLElement>('.ds-day-clock')!;
      const scene = day.querySelector<HTMLElement>('.ds-day-scene')!;
      const copy = day.querySelector<HTMLElement>('.ds-day-copy')!;
      const fill = day.querySelector<HTMLElement>('.ds-fill')!;
      const canvas = day.querySelector<HTMLCanvasElement>('.ds-day-canvas')!;
      const ctx = canvas.getContext('2d');
      const START = 5, END = 23;
      const moments = [
        { t: 5, scene: 'Load-in', copy: "Vans loaded, routes mapped, crew briefed. We're set up before the city wakes up.", density: 0.18 },
        { t: 8, scene: 'Commuter rush', copy: 'Transit hubs and coffee lines. Thousands of hand-to-hands before most offices even open.', density: 1 },
        { t: 12, scene: 'Lunch peak', copy: 'Office districts at full density. Maximum foot traffic, maximum conversations per hour.', density: 0.95 },
        { t: 17, scene: 'Happy hour', copy: 'Patios, plazas, and event exits. The crowd slows down — and actually stops to talk.', density: 0.6 },
        { t: 22, scene: 'Wrap + report', copy: 'GPS logs closed, photos uploaded, counts tallied. Your recap lands before you wake up.', density: 0.15 },
      ];

      if (reduced || !ctx) {
        clock.textContent = '12:00';
        scene.textContent = moments[2].scene;
        copy.textContent = moments[2].copy;
        fill.style.height = '60%';
        if (ctx) { ctx.fillStyle = '#1c1a18'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      } else {
        let dots: Array<{ x: number; y: number; r: number; vx: number; vy: number; tier: number }> = [];
        let buildings: Array<{ x: number; w: number; h: number; seed: number }> = [];
        let W = 0, H = 0;
        const size = () => {
          W = canvas.width = canvas.offsetWidth || innerWidth;
          H = canvas.height = canvas.offsetHeight || innerHeight;
          dots = Array.from({ length: 130 }, () => ({
            x: Math.random() * W, y: Math.random() * H, r: 1.8 + Math.random() * 3.2,
            vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7, tier: Math.random(),
          }));
          buildings = [];
          let bx = -10;
          while (bx < W + 10) {
            const bw = 42 + Math.random() * 92;
            const bh = H * (0.07 + Math.random() * 0.15);
            buildings.push({ x: bx, w: bw, h: bh, seed: Math.random() * 1000 });
            bx += bw + 3;
          }
        };
        const winRnd = (seed: number, i: number, j: number) => {
          const v = Math.sin(seed * 99.7 + i * 13.3 + j * 7.7) * 43758.5453;
          return v - Math.floor(v);
        };
        size();
        addEventListener('resize', size);

        const momentAt = (hour: number) => { let cur = moments[0]; for (const m of moments) if (hour >= m.t) cur = m; return cur; };
        const densityAt = (hour: number) => {
          for (let i = 0; i < moments.length - 1; i++) {
            const a = moments[i], b = moments[i + 1];
            if (hour >= a.t && hour <= b.t) { const p = (hour - a.t) / (b.t - a.t); return a.density + (b.density - a.density) * p; }
          }
          return moments[moments.length - 1].density;
        };

        let progress = 0, smooth = 0, lastScene = '', pendingScene: string | null = null;
        let fadeTimer: ReturnType<typeof setTimeout> | null = null;
        const onScroll = () => {
          const r = day.getBoundingClientRect();
          const total = r.height - innerHeight;
          progress = Math.min(Math.max(-r.top / total, 0), 1);
        };
        addEventListener('scroll', onScroll, { passive: true });
        onScroll(); smooth = progress;

        const render = () => {
          smooth += (progress - smooth) * 0.08;
          const hour = START + smooth * (END - START);
          clock.textContent = String(Math.floor(hour)).padStart(2, '0') + ':' + String(Math.floor((hour % 1) * 60)).padStart(2, '0');
          fill.style.height = smooth * 100 + '%';

          const m = momentAt(hour);
          if (m.scene !== lastScene && pendingScene !== m.scene) {
            pendingScene = m.scene;
            scene.classList.add('fading'); copy.classList.add('fading');
            if (fadeTimer) clearTimeout(fadeTimer);
            const mo = m;
            fadeTimer = setTimeout(() => {
              lastScene = mo.scene; pendingScene = null;
              scene.textContent = mo.scene; copy.textContent = mo.copy;
              scene.classList.remove('fading'); copy.classList.remove('fading');
              clock.classList.remove('tick'); void clock.offsetWidth; clock.classList.add('tick');
            }, 190);
          }

          const sunP = Math.min(Math.max((hour - 6) / (20.5 - 6), 0), 1);
          const sx = sunP * (W + 240) - 120;
          const sy = H * 0.86 - Math.sin(sunP * Math.PI) * H * 0.6;
          const noon = Math.sin(sunP * Math.PI);
          const sunVisible = hour > 5.7 && hour < 21;
          const sunCol = `hsl(${14 + noon * 16}, 100%, ${46 + noon * 9}%)`;

          const density = densityAt(hour);
          const visibleDots = Math.round(dots.length * density);
          const night = hour < 6.5 || hour > 20;
          ctx.fillStyle = night ? '#0e0d0c' : '#1c1a18';
          ctx.fillRect(0, 0, W, H);
          ctx.strokeStyle = 'rgba(247,245,239,.045)'; ctx.lineWidth = 1;
          for (let gx = 0; gx < W; gx += 52) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
          for (let gy = 0; gy < H; gy += 52) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

          if (sunVisible) {
            const glowR = 90 + noon * 70;
            const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
            g.addColorStop(0, sunCol); g.addColorStop(1, 'rgba(255,77,0,0)');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, glowR, 0, 7); ctx.fill();
            ctx.fillStyle = sunCol; ctx.beginPath(); ctx.arc(sx, sy, 24 + noon * 10, 0, 7); ctx.fill();
          }

          ctx.fillStyle = night ? '#070706' : '#100f0e';
          buildings.forEach((b) => ctx.fillRect(b.x, H - b.h, b.w, b.h));
          buildings.forEach((b) => {
            const cols = Math.floor(b.w / 16), rows = Math.floor(b.h / 18);
            for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
              const rnd = winRnd(b.seed, i, j);
              const lit = (hour > 17 + rnd * 5) || (hour < 6.5 && rnd > 0.88);
              if (!lit) continue;
              ctx.fillStyle = `rgba(255,178,72,${0.5 + rnd * 0.4})`;
              ctx.fillRect(b.x + 5 + i * 16, H - b.h + 6 + j * 18, 6, 8);
            }
          });

          const speed = 0.4 + density * 1.6;
          const rush = hour >= 7 && hour <= 9.5;
          const lunch = hour >= 11.5 && hour <= 13.5;
          const now = performance.now() / 900;
          for (let i = 0; i < visibleDots; i++) {
            const d = dots[i];
            let vx = d.vx * speed, vy = d.vy * speed;
            if (rush) { vx += (d.tier > 0.5 ? 1 : -1) * speed * 1.1; vy *= 0.35; }
            else if (lunch) { const a = now + d.tier * 6.28; vx += Math.cos(a) * 0.45; vy += Math.sin(a) * 0.45; }
            d.x += vx; d.y += vy;
            if (d.x < -20) d.x = W + 20; if (d.x > W + 20) d.x = -20;
            if (d.y < 0 || d.y > H) d.vy *= -1;
            ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 7);
            ctx.fillStyle = d.tier > 0.88 ? '#FF4D00' : (night ? 'rgba(247,245,239,.3)' : 'rgba(247,245,239,.55)');
            ctx.fill();
          }
          RAF(render);
        };
        RAF(render);
        cleanups.push(() => { removeEventListener('resize', size); removeEventListener('scroll', onScroll); if (fadeTimer) clearTimeout(fadeTimer); });
      }
    }

    return () => {
      rafs.forEach((id) => cancelAnimationFrame(id));
      cleanups.forEach((fn) => fn());
      document.body.classList.remove('ds-anim');
    };
  }, []);
}
