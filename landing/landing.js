/* =====================================================================
   דף נחיתה — מנוע המחשבון
   שאלה אחת בכל מסך, מעבר מתגלגל, והפרטים האישיים נאספים בסוף בלבד.
   הקופי כולו יושב ב-index.html (כולל תבניות התוצאה) — כאן רק הלוגיקה.
   ===================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     חיבור לידים: כאן מזינים את כתובת ה-endpoint / ה-CRM.
     ריק = הדף מציג הודעת תודה בצד הלקוח בלבד (מצב פיתוח).
     ה-payload נשלח כ-JSON ומכיל את כל תשובות השאלון, לא רק את השם
     והטלפון — כדי שהשיחה הראשונה תתחיל מנקודה שכבר יודעים בה משהו.
     ------------------------------------------------------------------ */
  var ENDPOINT = '';   /* TODO: point this at the real endpoint / CRM */

  var root    = document.documentElement;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('anim');

  var stack   = document.getElementById('qz-stack');
  var railSteps = [].slice.call(document.querySelectorAll('.calc-step'));
  var read    = document.getElementById('calc-read');
  var backBtn = document.getElementById('qz-back');
  var foot      = document.querySelector('.calc-foot');
  var footInfo  = document.querySelector('.calc-info');
  var docFace   = document.getElementById('panel');
  var docScroll = document.getElementById('panel-scroll');
  var docOpen   = false;
  var result  = document.getElementById('qz-result');
  if (!stack) return;

  var screens = [].slice.call(stack.querySelectorAll('.qz-s'));
  var qCount  = screens.filter(function (s) { return s.dataset.screen === 'q'; }).length;
  var live    = 0;          /* אינדקס המסך הפעיל */
  var trail   = [];         /* היסטוריית מסכים, בשביל כפתור החזרה */
  var OUT_MS  = reduced ? 0 : 200;

  /* =================================================================
     1 · מעבר בין מסכים
     ================================================================= */
  function isQ(el)   { return el.dataset.screen === 'q'; }
  function qIndex(el){ return +el.dataset.q || 0; }

  function paintRail(el) {
    var isRes = el.dataset.screen === 'result';
    var q = isQ(el) ? qIndex(el) : (isRes ? qCount : 0);
    railSteps.forEach(function (cell, i) {
      var n = i + 1;
      cell.classList.toggle('is-live', !isRes && n === q);
      cell.classList.toggle('is-done', isRes || n < q);
    });
    read.hidden = !q;
    read.textContent = isRes ? 'התוצאה' : (q ? 'שאלה ' + q + ' מתוך ' + qCount : '');
    /* במסך הפתיחה כפתור המידע יושב ליד ההנעה לפעולה, ולכן התחתית
       ריקה שם. משהשאלון מתחיל — הוא זמין בתחתית, שקט. */
    var atIntro = el.dataset.screen === 'intro';
    backBtn.hidden = docOpen || atIntro;
    if (footInfo) footInfo.hidden = docOpen || atIntro;
    /* במסך הפתיחה אין בתחתית כלום, ולכן היא נעלמת — סרגל ריק נראה
       כמו תקלה ולא כמו חלק מהמכשיר */
    /* בפָן השני הדרך חזרה יושבת מעל הכותרת, ובמסך הפתיחה אין
       בתחתית כלום — בשני המצבים סרגל ריק, ולכן הוא נעלם */
    if (foot) foot.hidden = docOpen || atIntro;
  }

  function go(next, opts) {
    opts = opts || {};
    if (next === live || next < 0 || next >= screens.length) return;

    var from = screens[live];
    var to   = screens[next];

    if (!opts.back) trail.push(live);
    live = next;

    from.classList.add('is-out');
    setTimeout(function () {
      from.classList.remove('is-out', 'is-live');
      from.hidden = true;

      to.hidden = false;
      to.classList.remove('is-live');
      void to.offsetWidth;                 /* מאלץ הרצה מחדש של האנימציה */
      to.classList.add('is-live');

      paintRail(to);
      focusFirst(to);
      if (opts.top || scrollY > 4) scrollTop();
    }, OUT_MS);
  }

  function focusFirst(el) {
    if (el.dataset.screen === 'result') {
      var h = el.querySelector('.qz-res-h');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({preventScroll: true}); }
      return;
    }
    var first = el.querySelector('.opt input:checked') ||
                el.querySelector('.opt input, [data-start], input, button');
    if (first) first.focus({preventScroll: true});
  }

  function scrollTop() {
    scrollTo({top: 0, behavior: reduced ? 'auto' : 'smooth'});
  }

  function screenIndexByQ(q) {
    for (var i = 0; i < screens.length; i++) {
      if (isQ(screens[i]) && qIndex(screens[i]) === q) return i;
    }
    return -1;
  }

  function resultIndex() {
    for (var i = 0; i < screens.length; i++) {
      if (screens[i].dataset.screen === 'result') return i;
    }
    return screens.length - 1;
  }

  /* מהמסך הנוכחי — הלאה. אחרי השאלה האחרונה: מסך התוצאה. */
  function advance() {
    var cur = screens[live];
    if (!isQ(cur)) return;                 /* ממסך פתיחה או תוצאה אין „הלאה” */
    if (qIndex(cur) === qCount) { buildResult(); go(resultIndex(), {top: true}); return; }
    go(live + 1);
  }

  /* =================================================================
     2 · תשובות
     ================================================================= */
  function picked(name) { return stack.querySelector('input[name="' + name + '"]:checked'); }
  function pickedAll(name) {
    return [].slice.call(stack.querySelectorAll('input[name="' + name + '"]:checked'));
  }
  function said(name) {
    var el = picked(name);
    return el ? (el.dataset.said || el.value) : '';
  }
  function isLowGate(el) { return !!(el && el.dataset.gate === 'low'); }

  /* הרמזים = מה שסומן במסך 5 („אף אחד מאלה” אינו רמז) */
  function signals() {
    return pickedAll('signals').filter(function (i) { return !i.dataset.none; });
  }
  function relevantSignals(path) {
    var key = path.toLowerCase();
    return signals().filter(function (i) { return (i.dataset.rel || 'ab').indexOf(key) > -1; });
  }

  /* לוגיקת פיצול התוצאה:
     · מסך 2 (היקף) הוא שער הכניסה — מתחת ל-20 אלף דולר → מסלול C
     · מסך 6 (טיימינג) „עוד לא יודע, בודק אפשרויות” → מסלול C גם אם ההיקף מתאים
     · מסך 3 (איך קונה) קובע בין A ל-B — מתווך/עליבאבא → A, ישירות מהמפעל → B */
  function route() {
    if (isLowGate(picked('scope')))  return 'C';
    if (isLowGate(picked('timing'))) return 'C';
    var ch = picked('channel');
    return (ch && ch.dataset.route) || 'C';
  }

  function listHe(items) {
    if (!items.length) return '';
    if (items.length === 1) return '„' + items[0] + '”';
    var q = items.map(function (t) { return '„' + t + '”'; });
    return q.slice(0, -1).join(', ') + ' ו' + q[q.length - 1];
  }

  /* =================================================================
     3 · מסך התוצאה
     ================================================================= */
  function buildResult() {
    var path = route();
    var tpl  = document.getElementById('tpl-' + path);
    if (!tpl) return;

    var sig   = signals();
    var rel   = relevantSignals(path);
    var trend = picked('trend');

    var vars = {
      scope:   said('scope'),
      channel: said('channel'),
      field:   said('field'),
      timing:  said('timing'),
      count:   String(sig.length),
      rel:     listHe(rel.map(function (i) { return i.value; }))
    };

    var flags = {
      'signals':    sig.length > 0,
      'no-signals': sig.length === 0,
      'rel':        rel.length > 0,
      'no-rel':     rel.length === 0,
      'rising':     !!(trend && trend.dataset.signal)
    };

    var frag = tpl.content.cloneNode(true);

    /* מוציאים כל וריאנט שלא מתאים לתשובות */
    [].slice.call(frag.querySelectorAll('[data-when]')).forEach(function (el) {
      if (!flags[el.dataset.when]) el.remove();
      else el.removeAttribute('data-when');
    });

    /* {{token}} → הערך מהתשובות */
    (function walk(node) {
      for (var n = node.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3) {
          if (n.nodeValue.indexOf('{{') > -1) {
            n.nodeValue = n.nodeValue.replace(/\{\{(\w+)\}\}/g, function (m, k) {
              return vars[k] != null ? vars[k] : '';
            });
          }
        } else if (n.nodeType === 1) { walk(n); }
      }
    })(frag);

    /* „מספר הרמזים שזיהינו” — לא מציגים אחוז חיסכון על המסך */
    var listEl = frag.querySelector('[data-signal-list]');
    if (listEl) {
      sig.forEach(function (i) {
        var li = document.createElement('li');
        li.className = 'n';
        li.textContent = i.value;
        listEl.appendChild(li);
      });
    }

    result.textContent = '';
    result.appendChild(frag);

    var again = document.createElement('div');
    again.className = 'qz-again';
    again.innerHTML = '<button class="lnk quiet" type="button" data-restart>לענות מחדש<i></i></button>';
    result.appendChild(again);
    again.querySelector('[data-restart]').addEventListener('click', restart);

    var form = result.querySelector('.qz-form');
    if (form) wireForm(form, path, vars, sig);
  }

  function restart() {
    stack.querySelectorAll('input[type=radio],input[type=checkbox]').forEach(function (i) { i.checked = false; });
    stack.querySelectorAll('.qz-other').forEach(function (o) { o.classList.remove('is-open'); });
    stack.querySelectorAll('input[type=text]').forEach(function (i) { i.value = ''; });
    syncNext();
    trail = [];
    go(screenIndexByQ(1), {top: true});
  }

  /* =================================================================
     4 · הטופס
     ================================================================= */
  var PHONE = /^(0|972)\d{8,9}$/;

  function fieldOf(input) { return input.closest('.fld'); }

  function checkField(input) {
    var ok = true;
    if (input.required) {
      if (input.type === 'tel') ok = PHONE.test(input.value.replace(/\D/g, ''));
      else ok = input.value.trim().length > 1;
    }
    var fld = fieldOf(input);
    if (fld) fld.classList.toggle('has-err', !ok);
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    return ok;
  }

  function wireForm(form, path, vars, sig) {
    form.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('blur', function () {
        if (input.value !== '' || fieldOf(input).classList.contains('has-err')) checkField(input);
      });
      input.addEventListener('input', function () {
        if (fieldOf(input).classList.contains('has-err')) checkField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var inputs = [].slice.call(form.querySelectorAll('input'));
      var bad = inputs.filter(function (i) { return !checkField(i); });
      if (bad.length) { bad[0].focus(); return; }

      var btn = form.querySelector('.cta');
      var data = new FormData(form);
      var payload = {
        path: path,
        name: (data.get('name') || '').trim(),
        phone: (data.get('phone') || '').trim(),
        product: (data.get('product') || '').trim() || null,
        next_scope: (data.get('next_scope') || '').trim() || null,
        answers: {
          field: (picked('field') || {}).value || '',
          field_other: (stack.querySelector('[name=field_other]') || {}).value || '',
          scope: (picked('scope') || {}).value || '',
          channel: (picked('channel') || {}).value || '',
          trend: (picked('trend') || {}).value || '',
          signals: sig.map(function (i) { return i.value; }),
          timing: (picked('timing') || {}).value || ''
        },
        signals_count: sig.length,
        page: location.href,
        at: new Date().toISOString()
      };

      if (!ENDPOINT) { done(form, payload); return; }

      btn.disabled = true;
      fetch(ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        done(form, payload);
      }).catch(function () {
        btn.disabled = false;
        var err = form.querySelector('.qz-note');
        if (err) {
          err.textContent = 'משהו נתקע בשליחה. נסה שוב בעוד רגע — הפרטים לא נשלחו.';
          err.style.color = '#FF8A72';
        }
      });
    });
  }

  function done(form, payload) {
    var offer = form.closest('.qz-offer');
    offer.classList.add('sent');
    /* אין endpoint — משאירים את הליד בקונסול כדי שאפשר יהיה לבדוק חיווט */
    if (!ENDPOINT && window.console) console.info('[lead]', payload);
    var ok = offer.querySelector('.qz-ok');
    if (ok) {
      ok.setAttribute('tabindex', '-1');
      ok.focus({preventScroll: true});
      ok.scrollIntoView({block: 'center', behavior: reduced ? 'auto' : 'smooth'});
    }
  }

  /* =================================================================
     5 · אינטראקציה על המסכים
     ================================================================= */
  /* „המשך” נדלק רק כשיש מה להמשיך איתו */
  function syncNext() {
    screens.forEach(function (s) {
      var btn = s.querySelector('[data-next]');
      if (!btn) return;
      if (s.dataset.kind === 'many') {
        btn.disabled = !s.querySelector('input:checked');
      } else {
        var other = s.querySelector('[data-other-field] input');
        btn.disabled = !!(other && !other.value.trim());
      }
    });
  }

  /* המעבר האוטומטי נקבע פעם אחת לכל מסך: radio משדר change ואחריו click,
     ולחיצה חוזרת על אפשרות שכבר נבחרה משדרת click בלבד. שני המקרים
     מגיעים לאותה נקודה, וה-debounce מונע מעבר כפול. */
  var pending = null;
  function schedule() {
    if (pending !== null) return;
    pending = live;
    setTimeout(function () { pending = null; advance(); }, reduced ? 0 : 260);
  }

  /* בחירה בודדת: „אחר” פותח שדה חופשי, כל השאר ממשיך הלאה מעצמו */
  function answeredOne(screen, input) {
    var other = screen.querySelector('.qz-other');
    if (other) {
      var open = !!input.dataset.other;
      other.classList.toggle('is-open', open);
      syncNext();
      if (open) {
        var f = other.querySelector('input');
        if (f) f.focus({preventScroll: true});
        return;
      }
    }
    schedule();
  }

  stack.addEventListener('change', function (e) {
    var input = e.target;
    if (!input.name) return;
    var screen = input.closest('.qz-s');
    /* הטופס במסך התוצאה יושב באותו stack — שינוי בשדה שלו אינו תשובה לשאלה */
    if (!screen || screen.dataset.screen !== 'q') return;

    /* בחירה מרובה: „אף אחד מאלה” מנקה את השאר, וכל שאר הסימונים מנקים אותו */
    if (input.type === 'checkbox') {
      if (input.dataset.none && input.checked) {
        screen.querySelectorAll('input[type=checkbox]').forEach(function (i) {
          if (i !== input) i.checked = false;
        });
      } else if (input.checked) {
        var none = screen.querySelector('input[data-none]');
        if (none) none.checked = false;
      }
      syncNext();
      return;
    }

    answeredOne(screen, input);
  });

  stack.addEventListener('input', function (e) {
    if (e.target.name === 'field_other') syncNext();
  });

  stack.addEventListener('click', function (e) {
    var next = e.target.closest('[data-next]');
    if (next && !next.disabled) { advance(); return; }

    /* חזרה אחורה ואישור אותה תשובה — radio לא משדר change, המשמעות זהה */
    var lbl = e.target.closest('.opt');
    if (!lbl) return;
    var input = lbl.querySelector('input');
    var screen = lbl.closest('.qz-s');
    if (!input || input.type !== 'radio' || !input.checked) return;
    if (!screen || screen.dataset.screen !== 'q') return;
    answeredOne(screen, input);
  });

  /* Enter בשדה החופשי = המשך */
  stack.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    if (e.target.name !== 'field_other') return;
    e.preventDefault();
    var btn = e.target.closest('.qz-s').querySelector('[data-next]');
    if (btn && !btn.disabled) advance();
  });

  document.querySelectorAll('[data-start]').forEach(function (b) {
    b.addEventListener('click', function () {
      trail = [];
      go(screenIndexByQ(1), {top: true});
    });
  });

  backBtn.addEventListener('click', function () {
    var prev = trail.pop();
    if (prev == null) return;
    go(prev, {back: true, top: true});
  });

  /* מקשי 1–9 בוחרים אפשרות, כמו בשאלונים המתגלגלים */
  addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' && t.type === 'text' || t.tagName === 'TEXTAREA')) return;
    var n = parseInt(e.key, 10);
    if (!(n >= 1 && n <= 9)) return;
    var cur = screens[live];
    if (!isQ(cur)) return;
    var inputs = cur.querySelectorAll('.opt input');
    var pick = inputs[n - 1];
    if (!pick) return;
    e.preventDefault();
    pick.checked = pick.type === 'checkbox' ? !pick.checked : true;
    pick.dispatchEvent(new Event('change', {bubbles: true}));
  });

  /* =================================================================
     6 · הפָּן השני של המכשיר
     המידע לא צף מעל הדף — הוא מחליף את תוכן החלון בתוך אותה שילדה.
     השאלון נשאר ב-DOM ורק מוסתר, ולכן החזרה היא לאותו מקום עם כל
     התשובות, בלי טעינה מחדש ובלי איבוד מצב.
     ================================================================= */
  var infoBtns = [].slice.call(document.querySelectorAll('[data-info]'));
  var docFrom  = null;

  function docEdge() {
    if (!docScroll) return;
    var atEnd = docScroll.scrollTop + docScroll.clientHeight >= docScroll.scrollHeight - 4;
    docFace.classList.toggle('is-end', atEnd);
  }

  function docSet(open) {
    if (!docFace) return;
    /* לתפוס את המיקוד לפני כל הסתרה: paintRail מסתיר את כפתור המידע,
       ומעביר את המיקוד ל-body לפני שנספיק לזכור מאיפה באנו. */
    if (open) docFrom = document.activeElement;
    docOpen = open;
    stack.hidden = open;
    docFace.hidden = !open;
    infoBtns.forEach(function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    paintRail(screens[live]);

    if (open) {
      docScroll.scrollTop = 0;
      docEdge();
      var h = docFace.querySelector('#panel-t');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({preventScroll: true}); }
    } else if (docFrom && docFrom.isConnected && !docFrom.hidden) {
      docFrom.focus({preventScroll: true});
      docFrom = null;
    } else {
      var b = document.querySelector('[data-info]:not([hidden])');
      if (b) b.focus({preventScroll: true});
      docFrom = null;
    }
  }

  if (docFace) {
    infoBtns.forEach(function (b) { b.addEventListener('click', function () { docSet(true); }); });
    document.querySelectorAll('[data-close]').forEach(function (b) {
      b.addEventListener('click', function () { docSet(false); });
    });
    docScroll.addEventListener('scroll', docEdge, {passive: true});
    addEventListener('resize', function () { if (docOpen) docEdge(); }, {passive: true});
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && docOpen) { e.preventDefault(); docSet(false); }
    });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  syncNext();
  paintRail(screens[live]);
})();
