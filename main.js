// ================================================
// LA PERRA DE TINKERBELL – JavaScript principal
// ================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll shadow ──────────────────────
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ── Catalog filter ────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      productCards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = '';
          card.style.animation = 'fadeIn .3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── Lightbox (gallery) ────────────────────────
  const lightbox    = document.getElementById('lightbox');
  const lbEmoji     = document.getElementById('lbEmoji');
  const lbTitle     = document.getElementById('lbTitle');
  const lbDesc      = document.getElementById('lbDesc');
  const lbClose     = document.getElementById('lbClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        lbEmoji.textContent = item.dataset.emoji || '🎨';
        lbTitle.textContent = item.dataset.title || 'Producto artesanal';
        lbDesc.textContent  = item.dataset.desc  || 'Hecho a mano con amor.';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ── Order form validation ─────────────────────
  const form       = document.getElementById('orderForm');
  const successMsg = document.getElementById('successMsg');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-control, .form-select').forEach(f => {
        f.classList.remove('is-invalid');
      });

      // Required fields
      ['nombre','email','producto'].forEach(id => {
        const field = document.getElementById(id);
        if (!field) return;
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        }
      });

      // Email format
      const emailField = document.getElementById('email');
      if (emailField && emailField.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value.trim())) {
          emailField.classList.add('is-invalid');
          valid = false;
        }
      }

      if (valid) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        window.scrollTo({ top: successMsg.offsetTop - 100, behavior: 'smooth' });
      }
    });
  }

  // ── Scroll-reveal animation ───────────────────
  const revealEls = document.querySelectorAll('.category-card, .product-card, .value-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(el);
    });
  }

  // ── Active nav link ───────────────────────────
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href').endsWith(currentPage)) {
      link.classList.add('active');
      link.style.color = 'var(--brown)';
      link.style.fontWeight = '700';
    }
  });

});