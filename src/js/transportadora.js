// CADASTRO DE TRANSPORTADORAS
const formularioTran = document.querySelector("#form-cadastro-transportadora");
const iNomeTran = document.querySelector("#nome-transportadora-cadastro");
const iCnpj = document.querySelector("#cnpj-transportadora-cadastro");
const iTaxa = document.querySelector("#taxa-transportadora-cadastro");
const iRegiao = document.querySelector("#regiao-transportadora-cadastro");

function cadastrarTransportadora() {
  fetch("http://localhost:8800/transportadoras/cadastrar", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      nome: iNomeTran.value,
      cnpj: iCnpj.value,
      taxa: iTaxa.value,
      regiao: iRegiao.value,
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
        alert("Transportadora cadastrada com sucesso!");
    })
    .catch(function (error) {
        console.error("Erro ao cadastrar o produto:", error);
        alert(`Falha ao cadastrar transportadora: ${error.message}`);
    });
}

function limparTransportadora() {
  iNomeTran.value = "";
  iCnpj.value = "";
  iTaxa.value = "";
  iRegiao.value = "";
}

const tabelaTransportadoras = document.querySelector("#tabela-transportadoras tbody");
function listarTransportadoras() {
    fetch("http://localhost:8800/transportadoras/listar")
        .then((res) => {
            if (!res.ok) throw new Error("Erro na resposta do servidor");
            return res.text();
        })
        .then((text) => {
            if (!text) return [];
            return JSON.parse(text);
        })
        .then((transportadoras) => {
            tabelaTransportadoras.innerHTML = "";
            transportadoras.forEach((tran) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${tran.id}</td>
                <td>${tran.nome}</td>
                <td>${tran.cnpj}</td>
                <td>${tran.taxa}</td>
                <td>${tran.regiao}</td>
            `;
            tabelaTransportadoras.appendChild(tr);
        });
    })
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
    const menuListar = document.querySelector('.transportadora.submenu span:contains("Listar transportadoras")');
    if (menuListar) menuListar.parentElement.addEventListener("click", listarTransportadoras);
});

document.addEventListener("DOMContentLoaded", () => {
    formularioTran.addEventListener("submit", (e) => {
        e.preventDefault();
        cadastrarTransportadora();
        limparTransportadora();
    });
});

const formAtualizarTran = document.querySelector("#form-atualizar-transportadora");
const iIdTranAtualizar = document.querySelector("#id-transportadora-atualizar");
const iNomeTranAtualizar = document.querySelector("#nome-transportadora-atualizar");
const iCnpjTranAtualizar = document.querySelector("#cnpj-transportadora-atualizar");
const iTaxaTranAtualizar = document.querySelector("#taxa-transportadora-atualizar");
const iRegiaoTranAtualizar = document.querySelector("#regiao-transportadora-atualizar");

function atualizarTransportadora() {
    const body = {};
    if (iNomeTranAtualizar.value) body.nome = iNomeTranAtualizar.value;
    if (iCnpjTranAtualizar.value) body.cnpj = iCnpjTranAtualizar.value;
    if (iTaxaTranAtualizar.value) body.taxa = iTaxaTranAtualizar.value;
    if (iRegiaoTranAtualizar.value) body.regiao = iRegiaoTranAtualizar.value;

    fetch(`http://localhost:8800/transportadoras/atualizar/${iIdTranAtualizar.value}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(body),
    })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao atualizar transportadora");
            return res.json();
        })
        .then(data => {
            alert("Transportadora atualizada com sucesso!");
            formAtualizarTran.reset();
        })
        .catch(err => {
            alert("Erro ao atualizar transportadora!");
            console.error(err);
        });
}

if (formAtualizarTran) {
    formAtualizarTran.addEventListener("submit", function (e) {
        e.preventDefault();
        atualizarTransportadora();
    });
}
