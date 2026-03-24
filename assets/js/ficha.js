import { obterPersonagens, salvarLista } from "./storage.js";

const form = document.getElementById("form-personagem");

const editandoId = Number(localStorage.getItem("editando"));

// 🔹 inputs (AGORA 5)
const atributos = {
  forca: document.getElementById("forca"),
  intelecto: document.getElementById("intelecto"),
  presenca: document.getElementById("presenca"),
  vigor: document.getElementById("vigor"),
  agilidade: document.getElementById("agilidade")
};

const pontosTexto = document.getElementById("pontos");

// 🔹 estado
let pontos = 4;

// 🔹 inicializar todos em 1
Object.values(atributos).forEach(input => {
  input.value = 1;
  input.min = 0;
  input.max = 3;
});

// 🔹 calcular pontos
function atualizarPontos() {
  const total = Object.values(atributos)
    .reduce((soma, input) => soma + Number(input.value), 0);

  // 5 atributos começando em 1 = 5 base + 4 extras = 9
  pontos = 9 - total;

  pontosTexto.innerText = `Pontos restantes: ${pontos}`;
}

// 🔹 validar
function validarInput(input) {
  let valor = Number(input.value);

  if (valor > 3) valor = 3;
  if (valor < 0) valor = 0;

  input.value = valor;

  atualizarPontos();

  if (pontos < 0) {
    input.value = valor - 1;
    atualizarPontos();
  }
}

// 🔹 eventos
Object.values(atributos).forEach(input => {
  input.addEventListener("input", () => validarInput(input));
});

// 🔹 editar
if (editandoId) {
  const personagens = obterPersonagens();
  const personagem = personagens.find(p => p.id === editandoId);

  if (personagem) {
    document.getElementById("nome").value = personagem.nome;
    document.getElementById("classe").value = personagem.classe;

    // preencher atributos
    Object.keys(atributos).forEach(key => {
      atributos[key].value = personagem[key];
    });

    atualizarPontos();
  }
} else {
  atualizarPontos();
}

// 🔹 salvar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pontos < 0) {
    alert("Você gastou mais pontos do que pode!");
    return;
  }

  const personagens = obterPersonagens();

  const personagem = {
    id: editandoId || Date.now(),
    nome: document.getElementById("nome").value,
    classe: document.getElementById("classe").value,

    // 🔥 salva todos automaticamente
    ...Object.fromEntries(
      Object.entries(atributos).map(([key, input]) => [key, Number(input.value)])
    )
  };

  let novaLista;

  if (editandoId) {
    novaLista = personagens.map(p =>
      p.id === editandoId ? personagem : p
    );
    localStorage.removeItem("editando");
  } else {
    novaLista = [...personagens, personagem];
  }

  salvarLista(novaLista);

  window.location.href = "index.html";
});