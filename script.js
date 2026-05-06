(function(){
  var nav = document.getElementById('nav');
  var toggle = document.querySelector('.nav__toggle');
  var mobile = document.getElementById('nav-mobile');

  function onScroll(){
    if(window.scrollY > 24){ nav.classList.add('is-scrolled'); }
    else{ nav.classList.remove('is-scrolled'); }
    setActive();
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  if(toggle && mobile){
    toggle.addEventListener('click', function(){
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      if(open){ mobile.setAttribute('hidden',''); }
      else{ mobile.removeAttribute('hidden'); }
    });
    mobile.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        toggle.setAttribute('aria-expanded','false');
        mobile.setAttribute('hidden','');
      });
    });
  }

  function setActive(){
    var sections = document.querySelectorAll('main > section[id]');
    var scrollPos = window.scrollY + 140;
    var current = null;
    sections.forEach(function(sec){
      if(sec.offsetTop <= scrollPos){ current = sec.id; }
    });
    document.querySelectorAll('.nav__link').forEach(function(a){
      var href = a.getAttribute('href');
      if(href === '#' + current){ a.classList.add('is-active'); }
      else{ a.classList.remove('is-active'); }
    });
  }

  function revealAll(){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-visible'); });
  }

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },{ threshold: 0.05, rootMargin: '0px 0px 80px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el){
      var rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight && rect.bottom > 0){
        el.classList.add('is-visible');
      } else {
        io.observe(el);
      }
    });
  } else {
    revealAll();
  }
  setTimeout(function(){
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(function(el){
      var rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight + 200) el.classList.add('is-visible');
    });
  }, 100);

  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var ok = true;
      var fields = [
        { id:'f-nome', err:'Inserisci il tuo nome.' },
        { id:'f-email', err:'Inserisci una email valida.', email:true },
        { id:'f-msg', err:'Scrivi un messaggio.' }
      ];
      fields.forEach(function(f){
        var el = document.getElementById(f.id);
        var wrap = el.closest('.field');
        var errEl = wrap.querySelector('.field__error');
        var v = el.value.trim();
        var bad = !v;
        if(!bad && f.email){
          bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        }
        if(bad){
          ok = false;
          wrap.classList.add('is-invalid');
          errEl.textContent = f.err;
        } else {
          wrap.classList.remove('is-invalid');
          errEl.textContent = '';
        }
      });
      if(ok){
        var success = document.getElementById('form-success');
        success.removeAttribute('hidden');
        form.querySelectorAll('.field, button').forEach(function(el){ el.style.display='none'; });
        success.scrollIntoView({ behavior:'smooth', block:'center' });
      }
    });
  }

  var y = document.getElementById('year');
  if(y){ y.textContent = String(new Date().getFullYear()); }

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(ev){
      var href = a.getAttribute('href');
      if(href.length > 1){
        var t = document.querySelector(href);
        if(t){
          ev.preventDefault();
          var top = t.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: top, behavior:'smooth' });
          history.replaceState(null,'',href);
        }
      }
    });
  });
})();
