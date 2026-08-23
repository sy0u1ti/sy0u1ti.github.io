/**
 * Lightweight reading progress indicator & view-transition resilience.
 *
 * Kept separate from Stellar's card-hover plugin so each feature can fail
 * independently and so PJAX/View Transition navigations do not register
 * duplicate scroll listeners.
 */
(function () {
  'use strict';

  var bar = null;
  var frame = null;
  var bound = false;

  // Suppress harmless View Transition abort rejections during rapid cross-document navigation
  window.addEventListener('unhandledrejection', function (event) {
    if (
      event.reason &&
      (event.reason.message === 'Transition was skipped' ||
        event.reason.name === 'AbortError' ||
        (typeof event.reason.toString === 'function' && event.reason.toString().indexOf('Transition was skipped') !== -1))
    ) {
      event.preventDefault();
    }
  });

  function ensureBar() {
    if (bar && document.documentElement.contains(bar)) return bar;
    bar = document.getElementById('reading-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'reading-progress-bar';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
    }
    return bar;
  }

  function render() {
    frame = null;
    var el = ensureBar();
    var root = document.documentElement;
    var max = Math.max(0, root.scrollHeight - root.clientHeight);
    var progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    el.style.transform = 'scaleX(' + progress.toFixed(4) + ')';
    el.dataset.progress = String(Math.round(progress * 100));
  }

  function schedule() {
    if (frame === null) frame = window.requestAnimationFrame(render);
  }

  function bind() {
    if (bound) {
      schedule();
      return;
    }
    bound = true;
    ensureBar();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('pageshow', schedule, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) schedule();
    });
    document.addEventListener('pjax:complete', schedule);
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true });
  } else {
    bind();
  }
})();