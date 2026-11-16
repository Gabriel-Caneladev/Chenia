(() => {
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverOK = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- Ícones ---------- */
  const ICON = {
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    heart: '<path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/><path d="M3 13h18"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    'arrow-ur': '<path d="M7 17L17 7M8 7h9v9"/>',
    'arrow-up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
    caret: '<path d="M6 9l6 6 6-6"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8h.01M12 16v-5M12 13c0-1.5 1-2 2-2s2 .7 2 2.5V16"/>',
    whatsapp: '<path d="M3 21l1.6-4.7A9 9 0 119 20.4L3 21z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .7c-.8-.4-1.5-1.1-1.9-1.9l.7-1-1-2L9 9z"/>',
    youtube: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z"/>',
    facebook: '<path d="M14 8h2.5V4.5H14a3.5 3.5 0 00-3.5 3.5v2H8v3.5h2.5V20H14v-6.5h2.5L17 10h-3V8z"/>'
  };
  const svg = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[n] || ICON['arrow-ur']}</svg>`;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const digits = v => String(v || '').replace(/\D/g, '');

  /* ---------- URLs ---------- */
  const wa = S.whatsapp ? `https://wa.me/${digits(S.whatsapp)}${S.whatsappMessage ? `?text=${encodeURIComponent(S.whatsappMessage)}` : ''}` : '';
  const waLink = msg => S.whatsapp ? `https://wa.me/${digits(S.whatsapp)}?text=${encodeURIComponent(msg)}` : '';
  const pd = digits(S.phone);
  const URLS = {
    whatsapp: wa,
    email: S.email ? `mailto:${S.email}` : '',
    phone: pd ? `tel:${pd.length <= 11 ? '+55' : '+'}${pd}` : '',
    cta: (S.cta && S.cta.href) || wa,
    maps: S.address && S.address.mapsUrl,
    instagram: S.social && S.social.instagram,
    linkedin: S.social && S.social.linkedin,
    youtube: S.social && S.social.youtube,
    facebook: S.social && S.social.facebook
  };

  /* ---------- Textos, links, ícones, foto ---------- */
  $$('[data-bind]').forEach(el => { const v = get(S, el.dataset.bind); if (v) el.textContent = v; });
  $$('[data-brand-split]').forEach(el => {
    if (!S.brand) return;
    const [f, ...r] = S.brand.split(' ');
    el.innerHTML = `<b>${esc(f)}</b>${r.length ? ` <em>${esc(r.join(' '))}</em>` : ''}${S.tagline ? `<small>${esc(S.tagline)}</small>` : ''}`;
  });
  $$('[data-href]').forEach(el => { const v = URLS[el.dataset.href]; if (v) el.href = v; });
  $$('[data-icon]').forEach(el => { el.innerHTML = svg(el.dataset.icon); });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  $$('[data-legal]').forEach(el => { el.textContent = S.legal || ''; });
  $$('[data-photo]').forEach(img => { if (S.photo) img.src = S.photo; if (S.brand) img.alt = S.brand; });
  if (S.title) document.title = S.title;

  /* ---------- Cor de destaque personalizada (opcional) ---------- */
  if (S.accent) {
    const h = S.accent.replace('#', '');
    const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
    const lum = (0.299 * (n >> 16 & 255) + 0.587 * (n >> 8 & 255) + 0.114 * (n & 255)) / 255;
    root.style.setProperty('--accent', S.accent);
    root.style.setProperty('--accent-ink', lum > 0.6 ? '#0a0b10' : '#fff');
  }

  /* ---------- Menu e serviços ---------- */
  const services = () => (S.services || []).map(s => ({ ...s, href: s.href || '#' }));
  const svcHtml = s => `<a class="svc" href="${esc(s.href)}"><span class="ic">${svg(s.icon || 'heart')}</span><span class="svc-t"><strong>${esc(s.title)}</strong><small>${esc(s.desc || '')}</small></span></a>`;
  $$('[data-services]').forEach(el => {
    const plain = el.dataset.services === 'plain';
    el.innerHTML = services().map(s => plain ? `<a href="${esc(s.href)}">${esc(s.title)}</a>` : svcHtml(s)).join('');
  });
  $$('[data-nav]').forEach(el => {
    const mode = el.dataset.nav;
    el.innerHTML = (S.nav || []).map(n => {
      if (mode === 'mega' && n.mega) return `<button type="button" class="mega-trigger" data-mega-trigger aria-expanded="false" aria-controls="mega">${esc(n.label)}<span class="ic">${svg('caret')}</span></button>`;
      if (mode === 'mobile-mega' && n.mega) return `<details class="m-acc"><summary>${esc(n.label)}<span class="ic">${svg('caret')}</span></summary><div class="m-acc-body">${services().map(svcHtml).join('')}</div></details>`;
      return `<a href="${esc(n.href)}">${esc(n.label)}</a>`;
    }).join('');
  });

  /* ---------- Redes sociais ---------- */
  const SOC = { instagram: 'Instagram', linkedin: 'LinkedIn', youtube: 'YouTube', facebook: 'Facebook' };
  $$('[data-social]').forEach(el => {
    el.classList.add('soc-row');
    el.innerHTML = Object.keys(SOC).filter(k => URLS[k]).map(k => `<a class="soc" href="${esc(URLS[k])}" target="_blank" rel="noopener" aria-label="${SOC[k]}"><span class="ic">${svg(k)}</span></a>`).join('');
  });

  /* ---------- Horário de atendimento (status + tabela) ---------- */
  const tz = S.timezone || 'America/Sao_Paulo';
  const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const mins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const nowIn = () => {
    const o = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()).forEach(p => { o[p.type] = p.value; });
    return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday), min: (Number(o.hour) % 24) * 60 + Number(o.minute) };
  };
  const status = () => {
    const n = nowIn(), H = S.hours || [], t = H[n.day];
    if (t && n.min >= mins(t[0]) && n.min < mins(t[1])) return { open: true, day: n.day, text: `Aberto agora · fecha às ${t[1]}` };
    if (t && n.min < mins(t[0])) return { open: false, day: n.day, text: `Fechado · abre hoje às ${t[0]}` };
    for (let i = 1; i <= 7; i++) { const d = (n.day + i) % 7; if (H[d]) return { open: false, day: n.day, text: `Fechado · abre ${i === 1 ? 'amanhã' : DAYS[d].toLowerCase()} às ${H[d][0]}` }; }
    return { open: false, day: n.day, text: 'Fechado' };
  };
  const refresh = () => {
    const st = status();
    $$('[data-open-status]').forEach(el => { el.textContent = st.text; const w = el.closest('.status'); if (w) w.setAttribute('data-state', st.open ? 'open' : 'closed'); });
    $$('[data-hours]').forEach(el => {
      el.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => { const h = (S.hours || [])[d]; return `<li class="${d === st.day ? 'is-today' : ''}"><span>${DAYS[d]}</span><span>${h ? `${h[0]} – ${h[1]}` : 'Fechado'}</span></li>`; }).join('');
    });
  };
  refresh();
  setInterval(refresh, 30000);

  /* ---------- Formulário → WhatsApp (a pessoa revisa antes de enviar) ---------- */
  $$('[data-wa-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const msg = `Olá! Meu nome é ${String(d.get('name') || '').trim()}.\n\n${String(d.get('msg') || '').trim()}`;
    window.open(`https://wa.me/${digits(S.whatsapp)}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  }));

  /* ---------- Header: estado compacto, menu mobile, mega menu, scrollspy ---------- */
  const header = $('.site-header');
  const toggle = $('.menu-toggle'), menu = $('.mobile-menu');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    if (menu) { menu.classList.toggle('is-open', open); menu.setAttribute('aria-hidden', String(!open)); }
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  };
  if (toggle) toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  if (menu) $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));

  const trig = $('[data-mega-trigger]');
  const setMega = v => {
    if (!trig || !header) return;
    trig.setAttribute('aria-expanded', String(v));
    header.classList.toggle('mega-open', v);
    document.body.classList.toggle('mega-open', v);
  };
  if (trig && header) {
    trig.addEventListener('click', () => setMega(hoverOK ? true : trig.getAttribute('aria-expanded') !== 'true'));
    if (hoverOK) {
      trig.addEventListener('pointerenter', () => setMega(true));
      header.addEventListener('pointerleave', () => setMega(false));
      $$('.desktop-nav a', header).forEach(a => a.addEventListener('pointerenter', () => setMega(false)));
    }
    document.addEventListener('click', e => { if (!header.contains(e.target)) setMega(false); });
    $$('.mega a', header).forEach(a => a.addEventListener('click', () => setMega(false)));
  }
  addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); setMega(false); } });

  const spyLinks = $$('[data-spy] a[href^="#"]');
  const targets = [...new Set(spyLinks.map(a => a.getAttribute('href')).filter(h => h.length > 1))].map(h => [h, $(h)]).filter(([, el]) => el);
  const spy = () => {
    const line = innerHeight * .4; let cur = null;
    targets.forEach(([h, el]) => { const r = el.getBoundingClientRect(); if (r.top <= line && r.bottom > line) cur = h; });
    spyLinks.forEach(a => {
      const on = a.getAttribute('href') === cur;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  };

  /* ---------- Voltar ao topo com anel de progresso ---------- */
  const tops = $$('[data-top]');
  const C = 163.36;
  const progress = () => {
    const max = root.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    tops.forEach(b => { const fg = b.querySelector('.ring-fg'); if (fg) fg.style.strokeDashoffset = String(C * (1 - p)); });
  };
  tops.forEach(b => b.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })));

  /* transição suave de cor: seções escuras "acendem" ao entrar na tela */
  if ('IntersectionObserver' in window && !reduced) {
    document.documentElement.classList.add('js-tone');
    const tio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); tio.unobserve(e.target); } }), { threshold: .12 });
    $$('.sec-dark').forEach(s => tio.observe(s));
  }

  let ticking = false;
  const onScroll = () => {
    if (header) {
      header.classList.toggle('is-scrolled', scrollY > 30);
      const probe = header.getBoundingClientRect().top + 30;
      const dark = $$('[data-theme]').some(s => { const r = s.getBoundingClientRect(); return r.top <= probe && r.bottom > probe && s.dataset.theme === 'dark'; });
      header.classList.toggle('is-dark', dark);
    }
    spy(); progress();
  };
  addEventListener('scroll', () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); }, { passive: true });
  addEventListener('resize', () => { if (innerWidth > 900) setMenu(false); onScroll(); });
  onScroll();

  /* ---------- Revelar ao rolar, botões magnéticos, parallax do arco ---------- */
  const reveals = $$('.reveal, .lines');
  if (reduced || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('is-visible'));
  else {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: .05 });
    reveals.forEach((el, i) => { el.style.transitionDelay = `${Math.min((i % 5) * 70, 280)}ms`; io.observe(el); });
  }
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .12}px, ${(e.clientY - r.top - r.height / 2) * .18}px)`; });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    $$('[data-parallax-stage]').forEach(stage => {
      const layers = $$('[data-parallax]', stage);
      stage.addEventListener('pointermove', e => {
        const r = stage.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
        layers.forEach(l => { const k = Number(l.dataset.parallax || 1); l.style.translate = `${nx * 14 * k}px ${ny * 11 * k}px`; });
      });
      stage.addEventListener('pointerleave', () => layers.forEach(l => { l.style.translate = ''; }));
    });
  }

  /* ==========================================================
     SEÇÕES DE CONTEÚDO
     ========================================================== */

  /* ---------- Lista de serviços (vem de config.js) ---------- */
  $$('[data-svc-list]').forEach(el => {
    el.innerHTML = services().map((s, i) => {
      const w = waLink(s.message || `Olá! Gostaria de saber mais sobre ${s.title}.`);
      const attrs = w ? `href="${esc(w)}" target="_blank" rel="noopener" aria-label="${esc(s.title)} — agendar pelo WhatsApp"` : `href="${esc(s.href)}"`;
      return `<a class="svc-row" ${attrs}><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${esc(s.title)}</span><span class="d">${esc(s.desc || '')}</span><span class="go"><span class="ic">${svg('arrow-ur')}</span></span></a>`;
    }).join('');
  });

  /* ---------- @ do Instagram a partir do link ---------- */
  $$('[data-handle]').forEach(el => {
    const u = URLS[el.dataset.handle];
    let h = '';
    try { h = u ? new URL(u).pathname.split('/').filter(Boolean).pop() : ''; } catch (e) {}
    if (h) el.textContent = `@${h.replace(/^@/, '')}`;
  });

  /* ---------- Faixa animada (velocidade constante) ---------- */
  $$('[data-marquee]').forEach(track => {
    const items = S.marquee && S.marquee.length ? S.marquee : [S.tagline || S.brand];
    const unit = items.map(t => `<span>${esc(t)}</span><i>✦</i>`).join('');
    track.innerHTML = unit.repeat(Math.ceil(10 / items.length));
    track.innerHTML += track.innerHTML;
    if (reduced) return;
    let x = 0;
    const tick = () => {
      x -= .7;
      const half = track.scrollWidth / 2;
      if (half > 0 && -x >= half) x += half;
      track.style.transform = `translate3d(${x}px,0,0)`;
      requestAnimationFrame(tick);
    };
    tick();
  });

  /* ---------- Perguntas frequentes (uma aberta por vez) ---------- */
  $$('[data-faq]').forEach(list => {
    const items = $$('.faq-item', list);
    items.forEach(it => {
      const b = $('.faq-q', it);
      b.addEventListener('click', () => {
        const open = !it.classList.contains('open');
        items.forEach(o => { o.classList.remove('open'); $('.faq-q', o).setAttribute('aria-expanded', 'false'); });
        if (open) { it.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
      });
    });
  });

  /* ---------- Contadores ---------- */
  const runCount = el => {
    const to = Number(el.dataset.count);
    if (reduced) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1500;
    const step = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduced) {
    counters.forEach(c => { c.textContent = '0'; });
    const co = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); } }), { threshold: .6 });
    counters.forEach(c => co.observe(c));
  }

  /* ---------- Frase que acende palavra por palavra ---------- */
  const wrapWords = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.append(p);
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.append(s); }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrapWords(n);
    });
  };
  const wordBlocks = $$('[data-words]').map(el => { wrapWords(el); return { el, ws: $$('.w', el) }; });

  /* ---------- Linha de progresso do passo a passo ---------- */
  const stepLists = $$('[data-progress]');

  const fab = $('.wa-fab'), foot = $('.site-footer');
  const onContentScroll = () => {
    const vh = innerHeight;
    if (fab && foot) fab.classList.toggle('is-hidden', foot.getBoundingClientRect().top < vh * .85);
    wordBlocks.forEach(({ el, ws }) => {
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (vh * .85 - r.top) / (vh * .4 + r.height)));
      const k = Math.round(p * ws.length * 1.05);
      ws.forEach((w, i) => w.classList.toggle('on', reduced || i < k));
    });
    stepLists.forEach(l => {
      const line = vh * .6, r = l.getBoundingClientRect();
      l.style.setProperty('--p', Math.max(0, Math.min(1, (line - r.top) / r.height)).toFixed(3));
      $$('.how-step', l).forEach(s => s.classList.toggle('on', s.getBoundingClientRect().top < line));
    });
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty('--progress', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
  };
  addEventListener('scroll', onContentScroll, { passive: true });
  addEventListener('resize', onContentScroll);
  onContentScroll();
})();
