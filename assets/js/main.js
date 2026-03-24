import { obterPersonagens, salvarLista } from "./storage.js";

const lista = document.getElementById("lista");
const btnCriar = document.getElementById("btn-criar");

// BOTÃO CRIAR
btnCriar.addEventListener("click", () => {
  localStorage.removeItem("editando");
  window.location.href = "ficha.html";
});

// RENDER
function renderizar() {
  const personagens = obterPersonagens();
  lista.innerHTML = "";

  personagens.forEach(p => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h2>${p.nome}</h2>
      <p>Classe: ${p.classe}</p>

      <p>Força: ${p.forca}</p>
      <p>Intelecto: ${p.intelecto}</p>
      <p>Presença: ${p.presenca}</p>
      <p>Vigor: ${p.vigor}</p>
      <p>Agilidade: ${p.agilidade}</p>

      <button class="editar">Editar</button>
      <button class="deletar">Deletar</button>
    `;

    // BOTÕES DO CARD
    div.querySelector(".editar").addEventListener("click", () => {
      localStorage.setItem("editando", p.id);
      window.location.href = "ficha.html";
    });

    div.querySelector(".deletar").addEventListener("click", () => {
      let personagens = obterPersonagens();
      personagens = personagens.filter(x => x.id !== p.id);
      salvarLista(personagens);
      renderizar();
    });

    lista.appendChild(div);
  });
}

renderizar();