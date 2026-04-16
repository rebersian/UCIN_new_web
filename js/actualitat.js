let noticiasData = [];

function t(key) {
  return translations[key] || key;
}

function renderNoticias(data) {
  const lista = document.getElementById("lista-noticias");
  lista.innerHTML = "";

  data.forEach(item => {
    const a = document.createElement("a");
    a.textContent = t(item.title);

    a.href = "#";
    a.onclick = (e) => {
      e.preventDefault();
      document.getElementById("contenido").innerHTML = `
        <iframe src="${item.file}" width="100%" height="100%"></iframe>
      `;
    };

    lista.appendChild(a);
  });
}

fetch("../data/actualitat.json")
  .then(res => res.json())
  .then(data => {
    noticiasData = data;
    renderNoticias(noticiasData);
  });


  document.addEventListener("languageChanged", () => {
    renderNoticias(noticiasData);
});