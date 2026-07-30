(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var started = false, cur = null;
  function tick(){
    var words = document.querySelectorAll('.storytext .w');
    if (words.length) {
      var box = document.querySelector('.storytext');
      if (box && !box.classList.contains('scrollfx')) box.classList.add('scrollfx');
      var vh = window.innerHeight;
      var r = box.getBoundingClientRect();
      var start = vh * 0.92, end = vh * 0.28;
      var p = (start - r.top) / (start - end);
      p = p < 0 ? 0 : (p > 1 ? 1 : p);
      if (cur === null) cur = p;
      cur += (p - cur) * 0.1;
      var lit = cur * (words.length + 6);
      for (var i = 0; i < words.length; i++) {
        if (words[i].classList.contains('lime')) { words[i].style.opacity = '1'; continue; }
        var t = (lit - i) / 3;
        t = t < 0 ? 0 : (t > 1 ? 1 : t);
        t = t * t * (3 - 2 * t);
        words[i].style.opacity = String(0.1 + 0.9 * t);
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // magnetic buttons — only the single nearest button within reach responds
  document.addEventListener('mousemove', function(e){
    var els = document.querySelectorAll('.magnet');
    var best = null, bestD = Infinity, bestDx = 0, bestDy = 0, bestReach = 0;
    for (var i = 0; i < els.length; i++) {
      var el = els[i], b = el.getBoundingClientRect();
      var cx = b.left + b.width / 2, cy = b.top + b.height / 2;
      var dx = e.clientX - cx, dy = e.clientY - cy;
      var d = Math.sqrt(dx * dx + dy * dy);
      var reach = Math.max(b.width, b.height) * 0.38 + 17;
      if (d < reach && d < bestD) { best = el; bestD = d; bestDx = dx; bestDy = dy; bestReach = reach; }
    }
    for (var j = 0; j < els.length; j++) {
      if (els[j] === best) {
        var f = (1 - bestD / bestReach) * 0.42;
        els[j].style.transform = 'translate(' + (bestDx * f).toFixed(2) + 'px,' + (bestDy * f).toFixed(2) + 'px)';
      } else if (els[j].style.transform) {
        els[j].style.transform = '';
      }
    }
  }, { passive: true });

  // grid hover trail
  (function(){
    var CELL = 72;
    var cells = {};
    function hostAt(x, y){
      var hs = document.querySelectorAll('.gridfx, .gridfx2');
      for (var n = 0; n < hs.length; n++) {
        var hb = hs[n].getBoundingClientRect();
        if (x >= hb.left && x <= hb.right && y >= hb.top && y <= hb.bottom) return hs[n];
      }
      return null;
    }
    document.addEventListener('mousemove', function(e){
      var h = hostAt(e.clientX, e.clientY); if (!h) return;
      var hot = document.querySelectorAll('.magnet, .btn, .navl, .scrollarrow');
      for (var q = 0; q < hot.length; q++) {
        var hb = hot[q].getBoundingClientRect();
        var pad = 34;
        if (e.clientX > hb.left - pad && e.clientX < hb.right + pad && e.clientY > hb.top - pad && e.clientY < hb.bottom + pad) {
          for (var kk in cells) { if (cells[kk]) cells[kk].style.opacity = '0'; }
          return;
        }
      }
      var b = h.getBoundingClientRect();
      if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) return;
      var gx = Math.floor((e.clientX - b.left) / CELL);
      var gy = Math.floor((e.clientY - b.top) / CELL);
      var key = (h.className || '') + gx + ':' + gy;
      if (cells[key]) { cells[key].dataset.t = Date.now(); return; }
      var d = document.createElement('div');
      d.style.cssText = 'position:absolute;left:' + (gx * CELL) + 'px;top:' + (gy * CELL) + 'px;width:' + CELL + 'px;height:' + CELL + 'px;background:#C9F24D;opacity:' + (h.classList.contains('gridfx2') ? '.3' : '.55') + ';transition:opacity 1.4s ease;pointer-events:none';
      d.dataset.t = Date.now();
      h.appendChild(d);
      cells[key] = d;
      requestAnimationFrame(function(){
        setTimeout(function(){
          d.style.opacity = '0';
          setTimeout(function(){ if (d.parentNode) d.parentNode.removeChild(d); delete cells[key]; }, 1500);
        }, 90);
      });
    }, { passive: true });
  })();
})();

// KPI reveal + count-up in capability cards
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function fmt(v, el){
    var to = parseFloat(el.dataset.to);
    var dec = (el.dataset.to.indexOf('.') > -1) ? 1 : 0;
    var s = to >= 1000 ? Math.round(v).toLocaleString('en-US') : v.toFixed(dec);
    return (el.dataset.prefix || '') + s + (el.dataset.suffix || '');
  }
  function run(card){
    if (reduce) return;
    card.querySelectorAll('.kpi-pct').forEach(function(el){
      if (el._ran) return; el._ran = true;
      var to = parseFloat(el.dataset.to), t0 = null, dur = 1100;
      function s(ts){ if (!t0) t0 = ts; var p = Math.min((ts-t0)/dur,1); p = 1-Math.pow(1-p,3); el.textContent = Math.round(to*p) + '%'; if (p<1) requestAnimationFrame(s); }
      el.textContent = '0%'; requestAnimationFrame(s);
    });
    card.querySelectorAll('.kpi-count').forEach(function(el){
      if (el._ran) return; el._ran = true;
      var to = parseFloat(el.dataset.to), t0 = null, dur = 1200;
      function step(ts){
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        p = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(to * p, el);
        if (p < 1) requestAnimationFrame(step);
      }
      el.textContent = fmt(0, el);
      requestAnimationFrame(step);
    });
  }
  function attach(){
    var cards = document.querySelectorAll('.fcard');
    if (!cards.length) { requestAnimationFrame(attach); return; }
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.35 });
    cards.forEach(function(c){ if (!c._obs) { c._obs = true; io.observe(c); } });
    var vh = window.innerHeight;
    cards.forEach(function(c){
      if (c.classList.contains('lit')) return;
      var b = c.getBoundingClientRect();
      if (b.top < vh * 0.85 && b.bottom > 0) run(c);
    });
    requestAnimationFrame(attach);
  }
  requestAnimationFrame(attach);
})();

// live REC timer
(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function pad(n){ return n < 10 ? '0' + n : '' + n; }
  setInterval(function(){
    document.querySelectorAll('.kpi-timer').forEach(function(el){
      var t = (el._t == null) ? parseInt(el.dataset.from || '0', 10) : el._t;
      t += 1; el._t = t;
      el.textContent = pad(Math.floor(t / 60)) + ':' + pad(t % 60);
    });
  }, 1000);
})();

// cohort percentages read the bar's OWN animation clock (single source of truth)
(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var RISE = 0.55; // barloop reaches full scaleX at 55%
  function tick(){
    document.querySelectorAll('.kpi-bar').forEach(function(track){
      var bar = track.querySelector('i');
      var label = track.parentNode && track.parentNode.querySelector('.kpi-pct');
      if (!bar || !label) return;
      var to = parseFloat(label.dataset.to);
      if (isNaN(to)) return;
      var p = 1;
      if (bar.getAnimations) {
        var a = bar.getAnimations()[0];
        if (a && a.effect && a.effect.getComputedTiming) {
          var t = a.effect.getComputedTiming().progress;
          if (t != null) p = Math.min(t / RISE, 1);
        }
      }
      label.textContent = Math.round(to * p) + '%';
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// scroll circle follows the cursor while inside it
(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.addEventListener('mousemove', function(e){
    var els = document.querySelectorAll('.magnetc');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], b = el.getBoundingClientRect();
      var cx = b.left + b.width / 2, cy = b.top + b.height / 2;
      var dx = e.clientX - cx, dy = e.clientY - cy;
      if (Math.sqrt(dx * dx + dy * dy) < b.width / 2) {
        el.style.transform = 'translate(' + (dx * 0.42).toFixed(2) + 'px,' + (dy * 0.42).toFixed(2) + 'px)';
      } else if (el.style.transform) {
        el.style.transform = '';
      }
    }
  }, { passive: true });
})();


// video pause / play (icon derives from real paused state)
(function(){
  function sync(btn, v){
    var pa = btn.querySelector('.vpause'), pl = btn.querySelector('.vplayico');
    if (pa) pa.style.display = v.paused ? 'none' : 'block';
    if (pl) pl.style.display = v.paused ? 'block' : 'none';
    btn.setAttribute('aria-label', v.paused ? 'Play video' : 'Pause video');
  }
  document.addEventListener('click', function(e){
    var btn = e.target.closest && e.target.closest('.vplay');
    if (!btn) return;
    var box = btn.closest('.mediabox');
    var v = box && box.querySelector('video');
    if (!v) return;
    if (v.paused) { v.play().catch(function(){}); } else { v.pause(); }
    sync(btn, v);
  });
  function watch(){
    document.querySelectorAll('.vplay').forEach(function(btn){
      var box = btn.closest('.mediabox');
      var v = box && box.querySelector('video');
      if (v) sync(btn, v);
    });
    requestAnimationFrame(watch);
  }
  requestAnimationFrame(watch);
})();

// force video properties React cannot serialize, then autoplay
(function(){
  function arm(){
    document.querySelectorAll('video.pvid').forEach(function(v){
      if (!v.muted) v.muted = true;
      if (!v.loop) v.loop = true;
      if (!v._userPaused && v.paused && v.readyState >= 2) v.play().catch(function(){});
    });
    requestAnimationFrame(arm);
  }
  requestAnimationFrame(arm);
  document.addEventListener('click', function(e){
    var btn = e.target.closest && e.target.closest('.vplay');
    if (!btn) return;
    var box = btn.closest('.mediabox');
    var v = box && box.querySelector('video');
    if (v) v._userPaused = !v.paused;
  }, true);
})();

// booking modal: submit -> inline success
(function(){
  document.addEventListener('submit', function(e){
    var form = e.target.closest && e.target.closest('.bform');
    if (!form) return;
    e.preventDefault();
    var card = form.closest('.bcard');
    var nameEl = form.querySelector('[name=name]');
    var mailEl = form.querySelector('[name=email]');
    function flag(el, msg){
      var slot = form.querySelector('.berr[data-for=' + el.name + ']');
      if (slot) { slot.textContent = msg || ''; slot.classList.toggle('on', !!msg); }
      el.classList.toggle('bad', !!msg);
      return !msg;
    }
    var okName = flag(nameEl, nameEl.value.trim() ? '' : 'Please enter your full name.');
    var v = mailEl.value.trim();
    var okMail = flag(mailEl, !v ? 'Please enter your work email.' : (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'That email doesn\'t look right.'));
    if (!okName || !okMail) { (okName ? mailEl : nameEl).focus(); return; }
    var name = (form.querySelector('[name=name]') || {}).value || '';
    var mail = (form.querySelector('[name=email]') || {}).value || '';
    var done = card && card.querySelector('.bdone');
    if (!done) return;
    var n = done.querySelector('.bname'), m = done.querySelector('.bmail');
    if (n && name.trim()) n.textContent = name.trim().split(' ')[0];
    if (m && mail.trim()) m.textContent = mail.trim();
    card.classList.add('sent');
    card.scrollTop = 0;
  });
  // reset the modal whenever it is closed
  window.addEventListener('hashchange', function(){
    if (location.hash === '#book') return;
    document.querySelectorAll('.bcard').forEach(function(card){
      var f = card.querySelector('.bform'), d = card.querySelector('.bdone');
      if (card.classList.contains('sent')) { card.classList.remove('sent'); if (f) f.reset(); }
    });
  });
})();

// booking form: digits-only phone, live error clearing
(function(){
  document.addEventListener('input', function(e){
    var el = e.target;
    if (!el.form || !el.form.classList.contains('bform')) return;
    if (el.name === 'phone') {
      var d = el.value.replace(/\D/g, '').slice(0, 10);
      if (d !== el.value) el.value = d;
    }
    if (el.name === 'name' || el.name === 'email') {
      var slot = el.form.querySelector('.berr[data-for=' + el.name + ']');
      if (slot && slot.classList.contains('on')) { slot.classList.remove('on'); el.classList.remove('bad'); }
    }
  });
})();
