(function () {
  var root  = document.documentElement;
  var stage = document.querySelector('.stage');
  var scene = document.querySelector('.scene');
  var h1    = document.querySelector('.h1');
  var cn    = document.querySelector('.cn');
  var hdr   = document.getElementById('hdr');
  var scale = 1;
  root.classList.add('anim');

  /* ---------- hero canvas scaling ---------- */
  function fit() {
    var w = root.clientWidth;
    if (!w) return;                     // hidden tab / detached frame reports 0
    scale = w / (w < 600 ? 375 : 1280);
    root.style.setProperty('--s', scale);
  }
  fit();
  addEventListener('resize', fit, {passive:true});
  if (window.ResizeObserver) new ResizeObserver(fit).observe(root);

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- hero entrance ---------- */
  function start(){ if (stage) stage.classList.add('ready'); }
  if (document.readyState === 'complete') start(); else addEventListener('load', start);
  setTimeout(start, 1200);

  /* ---------- reveal on scroll ---------- */
  var targets = document.querySelectorAll('[data-reveal],[data-rise],[data-zoom],[data-wipe],[data-rise-ship]');
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -6% 0px'});
    targets.forEach(function(el){ io.observe(el); });
  }

  /* ---------- counters ---------- */
  var nums = document.querySelectorAll('[data-count]');
  if (reduced || !('IntersectionObserver' in window)) {
    nums.forEach(function(n){ n.textContent = (+n.dataset.count).toLocaleString('he-IL'); });
  } else {
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target, to = +el.dataset.count, t0 = 0;
        requestAnimationFrame(function step(ts){
          if (!t0) t0 = ts;
          var k = Math.min(1, (ts - t0) / 1500);
          k = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(to * k).toLocaleString('he-IL');
          if (k < 1) requestAnimationFrame(step);
        });
      });
    }, {threshold:0.5});
    nums.forEach(function(n){ cio.observe(n); });
  }

  /* ---------- header state ---------- */
  var stuck = false;
  function header(){
    var s = scrollY > 40;
    if (s !== stuck){ stuck = s; hdr.classList.toggle('stuck', s); }
  }

  /* ---------- hero parallax ----------
     the photo layer drifts up a little faster than the page while the
     headline lags behind it, so "בסין" sinks in behind the building.   */
  function parallax(){
    if (!scene) return;
    var y = scrollY / scale;
    var mob = root.clientWidth < 600;
    /* the photo eases up, the headline rises faster — so "בסין" lifts out
       from behind the building instead of sinking as you scroll          */
    scene.style.translate = '0 ' + (-Math.min(y,700) * (mob ? .03 : .05)).toFixed(2) + 'px';
    if (h1) h1.style.translate = '0 ' + (-Math.min(y,900) * (mob ? .09 : .15)).toFixed(2) + 'px';
    if (cn) cn.style.translate = '0 ' + (-Math.min(y,800) * (mob ? .02 : .04)).toFixed(2) + 'px';
  }

  var ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      ticking = false;
      header();
      if (!reduced && scrollY < 2000) parallax();
    });
  }
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- mobile drawer ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  function menu(open){
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  burger.addEventListener('click', function(){ menu(!document.body.classList.contains('menu-open')); });
  drawer.addEventListener('click', function(e){ if (e.target.tagName === 'A') menu(false); });
  addEventListener('keydown', function(e){ if (e.key === 'Escape') menu(false); });

  /* ---------- lead form ---------- */
  var form = document.getElementById('lead');
  if (form) form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    /* TODO: point this at the real endpoint / CRM */
    form.classList.add('sent');
    form.scrollIntoView({block:'center', behavior:'smooth'});
  });

  var up = document.querySelector('[data-top]');
  if (up) up.addEventListener('click', function () {
    scrollTo({top: 0, behavior: reduced ? 'auto' : 'smooth'});
  });

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- mark the current page in the nav ---------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .drawer a').forEach(function(a){
    var href = a.getAttribute('href') || '';
    if (href === here || (here === 'index.html' && href === './')) a.classList.add('here');
  });
})();
