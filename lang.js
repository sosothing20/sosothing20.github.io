// 저장된 선택 → 브라우저 언어 순으로 언어를 정하고, 버튼으로 바꿀 수 있게 한다
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = saved || ((navigator.language || '').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en');

  function apply(next) {
    lang = next;
    root.setAttribute('data-lang', next);
    root.setAttribute('lang', next);
    var buttons = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', buttons[i].getAttribute('data-set-lang') === next ? 'true' : 'false');
    }
  }

  apply(lang);
  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    var buttons = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var next = this.getAttribute('data-set-lang');
        try { localStorage.setItem('lang', next); } catch (e) {}
        apply(next);
      });
    }
  });
})();
