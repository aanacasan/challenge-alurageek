async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/produtos");
    
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida;
}

async function criaProduto(nome, preco, imagem) {
    const conexao = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: nome, 
            preco: preco, 
            imagem: imagem, 
        }),
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível criar o produto.");
    }

    const produtoCriado = await conexao.json();
    return produtoCriado;
}

async function deletaProduto(id) {
    const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE",
    });
  
    if (!conexao.ok) {
      throw new Error("Não foi possível deletar o produto.");
    }
  }

export const conectaApi = {
    listaProdutos,
    criaProduto,
    deletaProduto
};
