/* ========================================================
   NISARI — Interactions
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================
     1. MOBILE NAV TOGGLE
     ====================================================== */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });

  // Close mobile nav on link click
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
    });
  });

  /* ======================================================
     2. SCROLL-AWARE NAV (hide on scroll down, show on up)
     ====================================================== */
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateNav = () => {
    const currentY = window.scrollY;

    if (currentY > 120 && currentY > lastScrollY) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  });

  /* ======================================================
     3. SCROLL REVEAL (IntersectionObserver)
     ====================================================== */
  const revealElements = document.querySelectorAll(
    '.section-title, .section-body, .section-label, .about__image, ' +
    '.tree__card, .tree__grandparents, .family__blessing, ' +
    '.roots__details, .roots__map, .roots__visual, ' +
    '.contact__form, .contact__details'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ======================================================
     4. PARALLAX HERO Bg (gentle)
     ====================================================== */
  const heroBg = document.querySelector('.hero__bg');

  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    });
  }

  /* ======================================================
     5. FAMILY TREE CARD INTERACTION (gentle lift)
     ====================================================== */
  const treeCards = document.querySelectorAll('.tree__card');

  treeCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transition =
        'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease';
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform =
        `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* ======================================================
     6. FORM HANDLING
     ====================================================== */
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      shakeElement(form);
      return;
    }

    // Simulate submission
    const btn = form.querySelector('.btn--primary');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      btn.style.borderColor = '#78716c';
      btn.style.color = '#78716c';
      btn.style.background = 'transparent';

      form.querySelectorAll('.form__input').forEach((input) => {
        input.value = '';
      });

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.style.background = '';
      }, 2500);
    }, 800);
  });

  /* Shake animation helper */
  function shakeElement(el) {
    el.style.animation = 'none';
    void el.offsetHeight; // reflow
    el.style.animation = 'shake 0.4s ease';
    setTimeout(() => {
      el.style.animation = '';
    }, 500);
  }

  /* Inject shake keyframes */
  const styleShake = document.createElement('style');
  styleShake.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(styleShake);

  /* ======================================================
     7. FAMILY TREE REVEAL SEQUENCE
     ====================================================== */
  const treeBranchCards = document.querySelectorAll('.tree__branch .tree__card');

  treeBranchCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 80}ms`;
  });

  console.log('Nisari — A family home in Vadakara, Kerala.');
});
