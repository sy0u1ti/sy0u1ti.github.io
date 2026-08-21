/**
 * card-hover.js v2.2 - Exact Official Stellar Calibration
 * 1:1 Apple-style physics, silky smooth 3D tilt, subtle specular spotlight
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

  // 2. Official 3D Tilt Physics & Ambient Spotlight
  const MAX_TILT = 3; // Official gentle 3 degrees for Apple/Stellar weighted feel

  function bindCardHover(card) {
    if (!card || card._tiltBound) return;
    card._tiltBound = true;

    let spotlight = card.querySelector('.card-hover__spotlight');
    if (!spotlight) {
      spotlight = document.createElement('span');
      spotlight.className = 'card-hover__spotlight';
      spotlight.setAttribute('aria-hidden', 'true');
      card.appendChild(spotlight);
    }

    let frame = null;
    let pointer = null;

    function render() {
      frame = null;
      if (!pointer || !document.documentElement.contains(card)) return;

      const rect = card.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = Math.max(0, Math.min(rect.width, pointer.x - rect.left));
      const y = Math.max(0, Math.min(rect.height, pointer.y - rect.top));
      const r = (x / rect.width) * 2 - 1;
      const i = (y / rect.height) * 2 - 1;

      card.style.setProperty('--card-hover-mouse-x', x.toFixed(1) + 'px');
      card.style.setProperty('--card-hover-mouse-y', y.toFixed(1) + 'px');
      card.style.setProperty('--card-hover-rotate-x', (-i * MAX_TILT).toFixed(3) + 'deg');
      card.style.setProperty('--card-hover-rotate-y', (r * MAX_TILT).toFixed(3) + 'deg');
    }

    function onPointerEnter(e) {
      pointer = { x: e.clientX, y: e.clientY };
      card.classList.add('is-card-hover-ready', 'is-card-hover-active');
      if (frame === null) {
        frame = requestAnimationFrame(render);
      }
    }

    function onPointerMove(e) {
      pointer = { x: e.clientX, y: e.clientY };
      if (frame === null) {
        frame = requestAnimationFrame(render);
      }
    }

    function onPointerLeave() {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      pointer = null;
      card.classList.remove('is-card-hover-active');
      card.style.setProperty('--card-hover-rotate-x', '0deg');
      card.style.setProperty('--card-hover-rotate-y', '0deg');
      card.style.setProperty('--card-hover-mouse-x', '50%');
      card.style.setProperty('--card-hover-mouse-y', '50%');
    }

    card.addEventListener('pointerenter', onPointerEnter, { passive: true });
    card.addEventListener('pointermove', onPointerMove, { passive: true });
    card.addEventListener('pointerleave', onPointerLeave, { passive: true });
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
