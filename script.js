(function () {
  var body = document.body;
  var buttons = document.querySelectorAll(".lang-btn");
  var KEY = "le-piume-doc-lang";

  function setLang(lang) {
    body.setAttribute("data-lang", lang);
    buttons.forEach(function (b) {
      var active = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var initial = "it";
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "it" || saved === "pt") initial = saved;
  } catch (e) {}
  setLang(initial);

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      setLang(b.getAttribute("data-lang"));
    });
  });
})();
