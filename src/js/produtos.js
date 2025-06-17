// CADASTRO DE PRODUTOS
const formulario = document.querySelector("#form-cadastro-prod");
const iNome = document.querySelector("#nome-cadastro-prod");
const iValorVenda = document.querySelector("#valor-venda-cadastro");
const iValorCompra = document.querySelector("#valor-compra-cadastro");

function cadastrar() {
  fetch("http://localhost:8800/produtos/cadastrar", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      nome: iNome.value,
      valor_venda: iValorVenda.value,
      valor_compra: iValorCompra.value,
    }),
  })
    .then(function (res) {
      if (!res.ok) {
        throw new Error(`Erro ${res.status}: ${res.statusText}`);
      }
      return res.json();
    })
    .then(function (data) {
      console.log("Cadastro realizado com sucesso:", data);
      alert("Produto cadastrado com sucesso!");
    })
    .catch(function (error) {
      console.error("Erro ao cadastrar o produto:", error);
      alert(`Falha ao cadastrar o produto: ${error.message}`);
    });
}

function limpar() {
  iNome.value = "";
  iValorVenda.value = "";
  iValorCompra.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrar();
    limpar();
  });
});

// LISTAR PRODUTOS
const tabelaProdutos = document.querySelector("#tabela-produtos tbody");
function listarProdutos() {
  fetch("http://localhost:8800/produtos/listar")
    .then((res) => res.json())
    .then((produtos) => {
      tabelaProdutos.innerHTML = "";
      produtos.forEach((produto) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.valor_venda}</td>
                    <td>${produto.valor_compra}</td>
                `;
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
const iIdAtualizar = document.querySelector("#id-prod-atualizar");
const iNomeAtualizar = document.querySelector("#nome-prod-atualizar");
const iValorVendaAtualizar = document.querySelector("#valor-venda-atualizar");
const iValorCompraAtualizar = document.querySelector("#valor-compra-atualizar");

function atualizar() {
  const body = {};
  if (iNomeAtualizar.value) body.nome = iNomeAtualizar.value;
  if (iValorVendaAtualizar.value) body.valor_venda = iValorVendaAtualizar.value;
  if (iValorCompra.value) body.valor_compra = iValorCompraAtualizar.value;

  fetch(`http://localhost:8800/produtos/atualizar/${iIdAtualizar.value}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      nome: iNomeAtualizar.value,
      valor_venda: iValorVendaAtualizar.value,
      valor_compra: iValorCompraAtualizar.value,
    }),
  })
    .then(function (res) {
      if (!res.ok) {
        throw new Error(`Erro ${res.status}: ${res.statusText}`);
      }
      return res.json();
    })
    .then(function (data) {
      console.log("Atualização realizada com sucesso:", data);
      alert("Produto atualizado com sucesso!");
    })
    .catch(function (error) {
      console.error("Erro ao atualizar o produto:", error);
      alert(`Falha ao atualizar o produto: ${error.message}`);
    });
  //modelo para feedback da operação
}

function limparAtualizar() {
  iIdAtualizar.value = "";
  iNomeAtualizar.value = "";
  iValorVendaAtualizar.value = "";
  iValorCompraAtualizar.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  formularioAtualizar.addEventListener("submit", (e) => {
    e.preventDefault();
    atualizar();
    limparAtualizar();
  });
});
