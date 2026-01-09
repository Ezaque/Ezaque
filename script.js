// Seleciona elementos
const imagemGrande = document.getElementById("imagem-grande");
const tituloLancamento = document.getElementById("titulo-lancamento");
const descricaoLancamento = document.getElementById("descricao-lancamento");
const thumbs = document.querySelectorAll(".lancamento-thumbs img");

let indiceAtual = 0;
let intervalo;

// Função para atualizar imagem e info
function atualizarLancamento(index) {
  const thumb = thumbs[index];
  imagemGrande.src = thumb.src;
  tituloLancamento.textContent = thumb.dataset.titulo;
  descricaoLancamento.textContent = thumb.dataset.descricao;

  // Marca miniatura ativa
  thumbs.forEach(t => t.classList.remove("active"));
  thumb.classList.add("active");

  indiceAtual = index;
}

// Clique nas miniaturas
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    atualizarLancamento(index);
    reiniciarAutoplay();
  });
});

// Autoplay
function autoplay() {
  indiceAtual = (indiceAtual + 1) % thumbs.length;
  atualizarLancamento(indiceAtual);
}

// Reinicia autoplay quando usuário interagir
function reiniciarAutoplay() {
  clearInterval(intervalo);
  intervalo = setInterval(autoplay, 5000);
}

// Inicialização
if (thumbs.length > 0) {
  atualizarLancamento(0); // Primeira ativa
  intervalo = setInterval(autoplay, 5000); // Começa autoplay
}
