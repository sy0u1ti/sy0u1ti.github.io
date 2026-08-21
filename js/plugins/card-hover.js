/**
 * card-hover.js & reading-progress v2.0
 * 3D Tilt, Dynamic Spotlight & Reading Progress Bar
 */
(function() {
  'use strict';

  // 1. Reading Progress Bar at Top
  function initReadingProgress() {
    let bar = document.getElementById('reading-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'reading-progress-bar';
      document.body.appendChild(bar);
    }
    function updateProgress() {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      bar.style.width = scrolled + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // 2. 3D Card Tilt & Spotlight
  const MAX_TILT = 5; // degrees

  function bindCardHover(card) {
    if (card._tiltBound) return;
    card._tiltBound = true;

    // Ensure spotlight span exists
    let spotlight = card.querySelector('.card-hover__spotlight');
    if (!spotlight) {
      spotlight = document.createElement('span');
      spotlight.className = 'card-hover__spotlight';
      spotlight.setAttribute('aria-hidden', 'true');
      card.appendChild(spotlight);
    }

    let rafId = null;

    function handleMouseMove(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * MAX_TILT;
        const rotateY = ((x - centerX) / centerX) * MAX_TILT;

        card.style.setProperty('--card-hover-mouse-x', x + 'px');
        card.style.setProperty('--card-hover-mouse-y', y + 'px');
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -6px, 12px)`;
        card.classList.add('is-card-hover-active');
      });
    }

    function handleMouseLeave() {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
      card.classList.remove('is-card-hover-active');
    }

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.25s ease, border-color 0.25s ease';
    });
    card.addEventListener('mousemove', handleMouseMove, { passive: true });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
      handleMouseLeave();
    });
  }

  function initAllCards() {
    const cards = document.querySelectorAll('.post-card, .wiki-card, .link-card, .card-hover');
    cards.forEach(bindCardHover);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initReadingProgress();
      initAllCards();
    });
  } else {
    initReadingProgress();
    initAllCards();
  }

  // Support PJAX / Dynamic transitions
  window.addEventListener('load', initAllCards);
  document.addEventListener('pjax:complete', initAllCards);
  document.addEventListener('stellar:mdrender', initAllCards);
})();
