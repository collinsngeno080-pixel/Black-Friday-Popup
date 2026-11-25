/* FileLabelPro Black Friday pop-up
   - Opens after a short delay on every page load, including refreshes
   - Closes with the X, "Not now", the Esc key, or a click on the blurred background
   - Keeps keyboard focus inside while open, and returns it afterwards
   - Never opens once the offer has ended
   Add ?bfpopup=1 to the address to open it faster (0.3s) for testing. */
(function () {
  var DELAY_MS = 3000;                           // wait before showing

  function pad(n) { return String(n).padStart(2, '0'); }

  function init() {
    var pop = document.querySelector('.flp-pop[data-ends]');
    if (!pop) return;

    var end = Date.parse(pop.getAttribute('data-ends'));
    var forced = /[?&]bfpopup=1\b/.test(location.search) || location.protocol === 'file:';
    if (isNaN(end) || end <= Date.now()) { pop.remove(); return; }

    var card = pop.querySelector('.flp-pop__card');
    var lastFocus = null;
    var timer = null;

    function tick() {
      var s = Math.floor((end - Date.now()) / 1000);
      if (s <= 0) { close(); pop.remove(); return; }
      var d = Math.floor(s / 86400); s %= 86400;
      var h = Math.floor(s / 3600); s %= 3600;
      var m = Math.floor(s / 60); s %= 60;
      var parts = { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
      pop.querySelectorAll('[data-unit]').forEach(function (el) {
        el.textContent = parts[el.getAttribute('data-unit')];
      });
    }

    function focusables() {
      return Array.prototype.slice.call(
        card.querySelectorAll('a[href], button:not([disabled])')
      );
    }

    function onKey(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function open() {
      lastFocus = document.activeElement;
      pop.hidden = false;
      // next frame so the fade-in transition runs
      requestAnimationFrame(function () {
        pop.classList.add('is-open');
        document.documentElement.classList.add('flp-pop-lock');
        card.focus();
      });
      tick();
      timer = setInterval(tick, 1000);
      document.addEventListener('keydown', onKey);
    }

    function close() {
      pop.classList.remove('is-open');
      document.documentElement.classList.remove('flp-pop-lock');
      document.removeEventListener('keydown', onKey);
      clearInterval(timer);
      setTimeout(function () { pop.hidden = true; }, 250);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    pop.querySelectorAll('[data-pop-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });
    pop.addEventListener('click', function (e) { if (e.target === pop) close(); });

    setTimeout(open, forced ? 300 : DELAY_MS);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
