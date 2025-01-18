import { conectaApi } from "./conectaApi.js";

function constroiCard(nome, preco, imagem) {
  const produto = document.createElement("div");
  produto.className = "card";

  produto.innerHTML = `
    <img src= "${imagem}" alt="${nome}" />
    <h3>${nome}</h3>
    <p>R$ ${preco}</p>
    <button class="delete">Excluir</button>
  `;

  const botaoDeletar = produto.querySelector(".delete");
  botaoDeletar.addEventListener("click", async () => {
    try {
      await conectaApi.deletaProduto(id);
      produto.remove();
      verificaMensagemVazia();

    } catch (erro) {
        console.error("Erro ao deletar produto:", erro);
    }
    
  });

  return produto;
}

function verificaMensagemVazia() {
  const containerProdutos = document.querySelector(".produtos");
  const mensagemVazia = document.querySelector(".mensagem-vazia");

  if (containerProdutos.children.length === 0) {
    mensagemVazia.style.display = "block";
  } else {
    mensagemVazia.style.display = "none";
  }
}

const formulario = document.querySelector("[data-lista]");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputs = formulario.querySelectorAll("input");
    const nome = inputs[0].value;
    const preco = inputs[1].value;
    const imagem = inputs[2].value;

    try {
        const novoProduto = await conectaApi.criaProduto(nome, preco, imagem);
        console.log("Produto criado com sucesso:", novoProduto);

        const containerProdutos = document.querySelector(".produtos");
        const novoCard = constroiCard(
          novoProduto.nome, 
          novoProduto.preco,
          novoProduto.imagem
        );
        
        containerProdutos.appendChild(novoCard);

        verificaMensagemVazia();

        formulario.reset();
    } catch (erro) {
        console.error("Erro ao criar produto:", erro);
    }
});
