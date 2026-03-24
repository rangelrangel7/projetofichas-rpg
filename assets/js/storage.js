const KEY = "personagens";

export function obterPersonagens() {
  const dados = localStorage.getItem(KEY);
  return dados ? JSON.parse(dados) : [];
}

export function salvarLista(lista) {
  localStorage.setItem(KEY, JSON.stringify(lista));
}