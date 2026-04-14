let translations = {};

function setActiveLang(lang) {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  document.querySelector(`.lang-btn[onclick*="${lang}"]`)
    ?.classList.add("active");
}

async function loadLanguage(lang) {
  const res = await fetch(`/locales/${lang}.json`);
  translations = await res.json();
  applyTranslations();
  setActiveLang(lang);
  localStorage.setItem("language", lang);
  document.dispatchEvent(new Event("languageChanged"));
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.dataset.i18n.split(".");
    let text = translations;

    keys.forEach(k => {
      text = text?.[k];
    });

    if (text) el.innerHTML = text;
  });
}

var idioma = localStorage.getItem("language") || "ca";
// idioma por defecto
loadLanguage(idioma);


