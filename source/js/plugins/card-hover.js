/**
 * card-hover.js v2.1
 * High-performance 3D Tilt, Dynamic Spotlight & Reading Progress
 */
(function() {
  'use strict';

  // 1. Reading Progress Bar at Top
  function initReadingProgress() {
    if (document.getElementById('reading-progress-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'reading-progress-bar';
    document.body.appendChild(bar);

    function updateProgress() {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      bar.style.width = scrolled + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // 2. 3D Tilt Physics & Dynamic Spotlight
  const MAX_TILT = 7; // degrees

  function bindCardHover(card) {
    if (!card || card._tiltBound) return;
    card._tiltBound = true;

    // Create spotlight element if not present
    let spotlight = card.querySelector('.card-hover__spotlight');
    if (!spotlight) {
      spotlight = document.createElement('span');
      spotlight.className = 'card-hover__spotlight';
      spotlight.setAttribute('aria-hidden', 'true');
      card.appendChild(spotlight);
    }

    let rafId = null;

    function onMouseMove(e) {
      const rect = card.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function() {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * MAX_TILT;
        const rotateY = ((x - centerX) / centerX) * MAX_TILT;

        card.style.setProperty('--card-hover-mouse-x', x.toFixed(1) + 'px');
        card.style.setProperty('--card-hover-mouse-y', y.toFixed(1) + 'px');
        card.style.setProperty('--card-hover-rotate-x', rotateX.toFixed(3) + 'deg');
        card.style.setProperty('--card-hover-rotate-y', rotateY.toFixed(3) + 'deg');
        card.classList.add('is-card-hover-active');
      });
    }

    function onMouseLeave() {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.setProperty('--card-hover-rotate-x', '0deg');
      card.style.setProperty('--card-hover-rotate-y', '0deg');
      card.classList.remove('is-card-hover-active');
    }

    card.addEventListener('mouseenter', function() {
      card.classList.add('is-card-hover-ready');
    });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  }

  function initAllCards() {
    const targets = document.querySelectorAll('.post-card, .wiki-card, .link-card, .card-hover');
    targets.forEach(bindCardHover);
  }

  function bootstrap() {
    initReadingProgress();
    initAllCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  window.addEventListener('load', initAllCards);
  document.addEventListener('pjax:complete', initAllCards);
  document.addEventListener('stellar:mdrender', initAllCards);
})();
