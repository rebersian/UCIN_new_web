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

// function getValue(obj, path) {
//   return path.split('.').reduce((acc, part) => acc && acc[part], obj);
// }
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = translations[key];

    if (value) {
      el.innerHTML = value.replace(/\n/g, "<br>");
    }
  });
}
var idioma = localStorage.getItem("language") || "ca";
// idioma por defecto
loadLanguage(idioma);


