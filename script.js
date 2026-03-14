(function () {
  function updateButtons(lang){
    document.querySelectorAll('.lang-pill').forEach(function(btn){
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setLang(lang){
    var fr = document.getElementById('lang-fr');
    var en = document.getElementById('lang-en');
    if (!fr || !en) return;
    fr.style.display = (lang === 'fr') ? 'block' : 'none';
    en.style.display = (lang === 'en') ? 'block' : 'none';
    document.documentElement.lang = lang;
    var active = lang === 'fr' ? fr : en;
    var title = active.getAttribute('data-page-title');
    if (title) document.title = title;
    updateButtons(lang);
    try { localStorage.setItem('spt-lang-premium', lang); } catch(e) {}
  }

  function getInitialLang(){
    try {
      var saved = localStorage.getItem('spt-lang-premium');
      if (saved === 'fr' || saved === 'en') return saved;
    } catch(e) {}
    var navLang = (navigator.language || 'fr').toLowerCase();
    return navLang.indexOf('en') === 0 ? 'en' : 'fr';
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.lang-pill').forEach(function(btn){
      btn.addEventListener('click', function(){
        setLang(btn.dataset.lang);
      });
    });
    setLang(getInitialLang());
  });
})();