document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', () => nav.classList.toggle('nav--open'));
  nav.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => nav.classList.remove('nav--open')));

  let lastY = window.scrollY, ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        nav.classList.toggle('nav--hidden', y > 120 && y > lastY);
        lastY = y; ticking = false;
      });
      ticking = true;
    }
  });

  const els = document.querySelectorAll('.section-title, .section-body, .section-label, .about__image, .tree__card, .tree__grandparents, .family__blessing, .roots__details, .roots__map, .contact__form, .contact__details');
  const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('reveal--visible'); obs.unobserve(e.target); } }); }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
  els.forEach(el => { el.classList.add('reveal'); obs.observe(el); });

  const bg = document.querySelector('.hero__bg');
  if (bg) window.addEventListener('scroll', () => { if (window.scrollY < window.innerHeight) bg.style.transform = `translateY(${window.scrollY * 0.15}px)`; });

  document.querySelectorAll('.tree__card').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `perspective(600px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-3px)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });

  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (!f.name.value.trim() || !f.email.value.trim() || !f.message.value.trim()) { shake(f); return; }
    const btn = f.querySelector('.btn--primary'), orig = btn.textContent;
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      btn.style.cssText = 'border-color:#78716c;color:#78716c;background:transparent';
      f.querySelectorAll('.form__input').forEach(i => i.value = '');
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.cssText = ''; }, 2500);
    }, 800);
  });

  function shake(el) {
    el.style.animation = 'none'; void el.offsetHeight;
    el.style.animation = 'shake 0.4s ease';
    setTimeout(() => el.style.animation = '', 500);
  }
  const s = document.createElement('style');
  s.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}';
  document.head.appendChild(s);

  document.querySelectorAll('.tree__branch .tree__card').forEach((c, i) => c.style.transitionDelay = `${i * 80}ms`);
});