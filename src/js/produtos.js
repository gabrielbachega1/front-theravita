// CADASTRO DE PRODUTOS
const formularioProd = document.querySelector("#form-cadastro-prod");
const iNomeProd = document.querySelector("#nome-prod-cadastro");
const iValorVenda = document.querySelector("#valor-venda-cadastro");
const iValorCompra = document.querySelector("#valor-compra-cadastro");

function cadastrarProduto() {
  fetch("http://localhost:8800/produtos/cadastrar", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      descricao: iNomeProd.value,
      valorVenda: iValorVenda.value,
      valorCompra: iValorCompra.value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.erro || `Erro ${res.status}: ${res.statusText}`);
        });
      }
      return res.json();
    })
    .then(function (data) {
      console.log("Cadastro realizado com sucesso:", data);
      alert("Produto cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao cadastrar o produto:", error);
      alert(`Falha ao cadastrar o produto: ${error.message}`);
    });
}

function limparProduto() {
  iNomeProd.value = "";
  iValorVenda.value = "";
  iValorCompra.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  formularioProd.addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrarProduto();
    limparProduto();
  });
});

// LISTAR PRODUTOS
const tabelaProdutos = document.querySelector("#tabela-produtos tbody");
function listarProdutos() {
  fetch("http://localhost:8800/produtos/listar")
    .then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.erro || `Erro ${res.status}: ${res.statusText}`);
        });
      }
      return res.json();
    })
    .then((produtos) => {
      tabelaProdutos.innerHTML = "";
      produtos.forEach((produto) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${produto.produto.id}</td>
                    <td>${produto.produto.descricao}</td>
                    <td>${produto.produto.valorVenda}</td>
                    <td>${produto.produto.valorCompra}</td>
                    <td>${produto.estoque}</td>
                `;
        tr.addEventListener("click", () => {
          document
            .querySelectorAll(".conteudo > div")
            .forEach((div) => div.classList.add("invisivel"));

          const atualizarProdutoDiv = document.querySelector(".atualizar-produto");
          atualizarProdutoDiv.classList.remove("invisivel");

          document.getElementById("id-prod-atualizar").value = produto.produto.id;
          document.getElementById("nome-prod-atualizar").value = produto.produto.descricao;
          document.getElementById("valor-venda-atualizar").value = produto.produto.valorVenda;
          document.getElementById("valor-compra-atualizar").value = produto.produto.valorCompra;
        });

        tabelaProdutos.appendChild(tr);
      });
    })
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  listarProdutos();
});

// ATUALIZAR PRODUTO
const formularioAtualizar = document.querySelector("#form-atualizar-prod");
const iIdAtualizarProd = document.querySelector("#id-prod-atualizar");
const iNomeAtualizarProd = document.querySelector("#nome-prod-atualizar");
const iValorVendaAtualizar = document.querySelector("#valor-venda-atualizar");
const iValorCompraAtualizar = document.querySelector("#valor-compra-atualizar");

function atualizarProduto() {
  const body = {};
  if (iNomeAtualizarProd.value) body.descricao = iNomeAtualizarProd.value;
  if (iValorVendaAtualizar.value) body.valorVenda = Number(iValorVendaAtualizar.value);
  if (iValorCompraAtualizar.value) body.valorCompra = Number(iValorCompraAtualizar.value);

  fetch(`http://localhost:8800/produtos/atualizar/${iIdAtualizarProd.value}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then(function (res) {
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.erro || `Erro ${res.status}: ${res.statusText}`);
        });
      }
      return res.json();
    })
    .then(function (data) {
      console.log("Atualização realizada com sucesso:", data);
      alert("Produto atualizado com sucesso!");
      listarProdutos();
    })
    .catch(function (error) {
      console.error("Erro ao atualizar o produto:", error);
      alert(`Falha ao atualizar o produto: ${error.message}`);
      console.log(body);
    });
}

function limparAtualizarProd() {
  iIdAtualizarProd.value = "";
  iNomeAtualizarProd.value = "";
  iValorVendaAtualizar.value = "";
  iValorCompraAtualizar.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  formularioAtualizar.addEventListener("submit", (e) => {
    e.preventDefault();
    atualizarProduto();
    limparAtualizarProd();
  });
});