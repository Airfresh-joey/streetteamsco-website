#!/usr/bin/env node
// Generate REAL static /case-studies/ pages from src/data/portfolioCaseStudies.ts (v5 design).
// Replaces the old fabricated case-study pages with the real Air Fresh portfolio.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'case-studies');
const BASE = 'https://streetteamsco.com';

// --- load the TS data array ---
let src = fs.readFileSync(path.join(ROOT, 'src/data/portfolioCaseStudies.ts'), 'utf8');
src = src.slice(src.indexOf('export const portfolioCaseStudies'));
src = src.replace(/export const portfolioCaseStudies[^=]*=/, 'const portfolioCaseStudies =');
src = src.slice(0, src.indexOf('\n];') + 3); // isolate just the array literal
const studies = new Function(src + '\n; return portfolioCaseStudies;')();

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap';

const CSS = `*{margin:0;padding:0;box-sizing:border-box;}
:root{--ink:#121110;--orange:#FF4D00;--orange-deep:#E04300;--paper:#F7F5EF;--curb:#FFD23F;--display:'Anton','Arial Narrow',Impact,sans-serif;--body:'Archivo',system-ui,sans-serif;--mono:'Space Mono',monospace;}
body{font-family:var(--body);color:var(--ink);background:var(--paper);line-height:1.6;}
a{color:var(--orange-deep);text-decoration:none;}a:hover{text-decoration:underline;}
header{background:var(--paper);padding:1rem 0;position:sticky;top:0;z-index:100;box-shadow:0 2px 0 var(--ink);}
.hdr{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;justify-content:space-between;align-items:center;}
.logo{font-family:var(--display);font-size:1.4rem;text-transform:uppercase;color:var(--ink);}
.nav a{font-family:var(--mono);font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--ink);margin-left:1.3rem;}
.nav a:hover{color:var(--orange);}
.hero{background:var(--ink);color:var(--paper);padding:4.5rem 2rem 3.5rem;position:relative;overflow:hidden;}
.hero.bg{background-size:cover;background-position:center;}
.hero.bg::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,17,16,.72),rgba(18,17,16,.9));}
.hero-in{max-width:1000px;margin:0 auto;position:relative;}
.crumb{font-family:var(--mono);font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--curb);margin-bottom:1.2rem;}
.crumb a{color:var(--curb);}
.pill{display:inline-block;background:var(--orange);color:var(--ink);font-family:var(--mono);font-size:.68rem;text-transform:uppercase;letter-spacing:.06em;padding:4px 11px;margin-bottom:1rem;font-weight:700;}
.hero h1{font-family:var(--display);font-weight:400;text-transform:uppercase;font-size:clamp(2.1rem,5vw,3.6rem);line-height:.98;}
.hero .tag{font-size:1.15rem;opacity:.92;margin-top:.8rem;max-width:720px;}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;max-width:1000px;margin:-2.2rem auto 0;padding:0 2rem;position:relative;z-index:5;}
.stat{background:var(--ink);color:var(--paper);border:2px solid var(--ink);padding:1.3rem;text-align:center;}
.stat .n{font-family:var(--display);font-size:1.9rem;color:var(--orange);line-height:1;}
.stat .l{font-family:var(--mono);font-size:.66rem;text-transform:uppercase;letter-spacing:.05em;opacity:.85;margin-top:.4rem;}
.wrap{max-width:900px;margin:0 auto;padding:3rem 2rem 4rem;}
.wrap h2{font-family:var(--display);font-weight:400;text-transform:uppercase;font-size:1.7rem;margin:2.4rem 0 1rem;}
.wrap p{margin-bottom:1.2rem;font-size:1.06rem;color:#2a2826;}
.meta{display:flex;flex-wrap:wrap;gap:.5rem;margin:1.5rem 0;}
.chip{border:2px solid var(--ink);padding:.35rem .8rem;font-size:.85rem;font-family:var(--mono);}
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.75rem;margin:1.5rem 0;}
.gallery img{width:100%;height:170px;object-fit:cover;border:2px solid var(--ink);display:block;}
.cta{background:var(--orange);border:2px solid var(--ink);box-shadow:8px 8px 0 var(--ink);padding:2.5rem;text-align:center;margin:3rem 0 0;}
.cta h2{font-family:var(--display);font-weight:400;text-transform:uppercase;color:var(--ink);font-size:1.8rem;margin-bottom:1rem;}
.cta a{display:inline-block;background:var(--ink);color:var(--orange);font-family:var(--mono);font-weight:700;text-transform:uppercase;padding:.9rem 2rem;box-shadow:5px 5px 0 rgba(18,17,16,.3);}
.cta a:hover{background:#000;text-decoration:none;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;}
.card{border:2px solid var(--ink);background:#fff;display:block;color:var(--ink);transition:transform .15s,box-shadow .15s;}
.card:hover{transform:translate(-3px,-3px);box-shadow:6px 6px 0 var(--ink);text-decoration:none;}
.card .thumb{height:180px;background-size:cover;background-position:center;background-color:var(--ink);border-bottom:2px solid var(--ink);}
.card .body{padding:1.1rem 1.25rem;}
.card .cat{font-family:var(--mono);font-size:.64rem;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-deep);}
.card h3{font-family:var(--display);font-weight:400;text-transform:uppercase;font-size:1.15rem;line-height:1.05;margin:.35rem 0;}
.card .tg{font-size:.9rem;color:#555;}
.card .kpi{font-family:var(--mono);font-size:.78rem;color:var(--ink);margin-top:.6rem;font-weight:700;}
footer{background:var(--ink);color:#b9b5ae;padding:2.5rem 2rem 4rem;text-align:center;font-size:.85rem;}
footer a{color:#e8e4dc;}footer a:hover{color:var(--orange);}
@media(max-width:768px){.nav{display:none;}.wrap{padding:2rem 1.3rem;}.stats{margin-top:1rem;}}`;

const HEADER = `<header><div class="hdr"><a href="/" class="logo">STREET TEAMS CO</a><div class="nav"><a href="/services/street-teams">Services</a><a href="/case-studies/">Case Studies</a><a href="/locations">Locations</a><a href="/contact">Get Quote</a></div></div></header>`;
const FOOTER = `<footer><p>&copy; 2026 <a href="/">Street Teams Co</a> · <a href="/case-studies/">Case Studies</a> · <a href="/portfolio">Portfolio</a> · <a href="/contact">Get a Free Quote</a> · hello@streetteamsco.com</p></footer>`;

function shell({ title, desc, canonical, og, jsonld, body }) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="article"><meta property="og:url" content="${canonical}">${og ? `<meta property="og:image" content="${og}">` : ''}
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="${FONTS_URL}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link href="${FONTS_URL}" rel="stylesheet"></noscript>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WL8QZB3S96"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-WL8QZB3S96');</script>
<style>${CSS}</style></head><body>${HEADER}${body}${FOOTER}</body></html>`;
}

function studyPage(s) {
  const url = `${BASE}/case-studies/${s.id}`;
  const desc = (s.tagline ? s.tagline + '. ' : '') + String(s.description || '').slice(0, 150);
  const statHtml = Object.entries(s.stats || {}).map(([l, n]) => `<div class="stat"><div class="n">${esc(n)}</div><div class="l">${esc(l)}</div></div>`).join('');
  const services = (s.services || []).map(x => `<span class="chip">${esc(x)}</span>`).join('');
  const markets = (s.markets || []).map(x => `<span class="chip">${esc(x)}</span>`).join('');
  const gallery = (s.images && s.images.length) ? `<h2>From the Field</h2><div class="gallery">${s.images.map(i => `<img src="${i}" alt="${esc(s.name)} street team activation" loading="lazy">`).join('')}</div>` : '';
  const heroStyle = s.heroImage ? ` bg" style="background-image:url('${s.heroImage}')"` : '"';
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${BASE}/case-studies/` },
      { '@type': 'ListItem', position: 3, name: s.name, item: url } ] },
    { '@context': 'https://schema.org', '@type': 'CreativeWork', name: s.name, headline: s.name, abstract: s.tagline,
      description: s.description, url, ...(s.heroImage ? { image: BASE + s.heroImage } : {}),
      provider: { '@type': 'Organization', name: 'Street Teams Co', url: BASE },
      ...(s.date ? { datePublished: s.date } : {}), about: s.industry },
  ];
  const body = `<section class="hero${heroStyle}><div class="hero-in"><div class="crumb"><a href="/">Home</a> / <a href="/case-studies/">Case Studies</a> / ${esc(s.name)}</div>${s.category ? `<span class="pill">${esc(s.category)}</span>` : ''}<h1>${esc(s.name)}</h1>${s.tagline ? `<p class="tag">${esc(s.tagline)}</p>` : ''}</div></section>
${statHtml ? `<div class="stats">${statHtml}</div>` : ''}
<div class="wrap"><h2>The Campaign</h2><p>${esc(s.description)}</p>
${services ? `<h2>Services Delivered</h2><div class="meta">${services}</div>` : ''}
${markets ? `<h2>Markets</h2><div class="meta">${markets}</div>` : ''}
${s.date ? `<p style="font-family:var(--mono);font-size:.85rem;color:#666;">Campaign date: ${esc(s.date)}</p>` : ''}
${gallery}
<div class="cta"><h2>Ready to Run a Campaign Like This?</h2><p style="color:var(--ink);margin-bottom:1.4rem;">Tell us your goals and we will build a custom plan. Every campaign is custom-quoted.</p><a href="/contact">Get a Free Quote</a></div>
<p style="margin-top:2rem;"><a href="/case-studies/">&larr; Back to all case studies</a></p></div>`;
  return shell({ title: `${s.name} | Street Teams Co Case Study`, desc, canonical: url, og: s.heroImage ? BASE + s.heroImage : '', jsonld, body });
}

function indexPage() {
  const cards = studies.map(s => {
    const kpi = Object.entries(s.stats || {})[0];
    return `<a class="card" href="/case-studies/${s.id}"><div class="thumb" style="${s.heroImage ? `background-image:url('${s.heroImage}')` : ''}"></div><div class="body"><div class="cat">${esc(s.category || s.industry || '')}</div><h3>${esc(s.name)}</h3><div class="tg">${esc(s.tagline || '')}</div>${kpi ? `<div class="kpi">${esc(kpi[1])} ${esc(kpi[0])}</div>` : ''}</div></a>`;
  }).join('');
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${BASE}/case-studies/` } ] },
    { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: studies.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${BASE}/case-studies/${s.id}`, name: s.name })) },
  ];
  const body = `<section class="hero"><div class="hero-in"><div class="crumb"><a href="/">Home</a> / Case Studies</div><span class="pill">${studies.length} Real Campaigns</span><h1>Street Team Case Studies</h1><p class="tag">Real campaigns we have run for brands like Wagamama, MrBeast, Netflix, Adidas, 1800 Tequila, Microsoft, and more &mdash; with the markets, tactics, and measured results.</p></div></section>
<div class="wrap" style="max-width:1200px;"><div class="grid">${cards}</div>
<div class="cta"><h2>Your Brand Could Be Next</h2><p style="color:var(--ink);margin-bottom:1.4rem;">Tell us your goals and we will build a custom plan. Every campaign is custom-quoted.</p><a href="/contact">Get a Free Quote</a></div></div>`;
  return shell({ title: `Street Team Marketing Case Studies | ${studies.length}+ Real Campaigns | Street Teams Co`, desc: `Real street team & brand ambassador case studies from ${studies.length}+ campaigns for brands like Wagamama, MrBeast, Netflix, Adidas, and Microsoft. See markets, tactics, and measured results.`, canonical: `${BASE}/case-studies/`, og: studies[0] && studies[0].heroImage ? BASE + studies[0].heroImage : '', jsonld, body });
}

// --- write ---
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const realSlugs = new Set(studies.map(s => s.id));
let written = 0;
for (const s of studies) { fs.writeFileSync(path.join(OUT, `${s.id}.html`), studyPage(s)); written++; }
fs.writeFileSync(path.join(OUT, 'index.html'), indexPage());

// remove leftover fabricated pages not in the real set
let removed = 0;
for (const f of fs.readdirSync(OUT)) {
  if (!f.endsWith('.html') || f === 'index.html') continue;
  if (!realSlugs.has(f.replace('.html', ''))) { fs.unlinkSync(path.join(OUT, f)); removed++; }
}
console.log(`case-studies: wrote ${written} real pages + index, removed ${removed} fabricated`);
