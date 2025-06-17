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

document.addEventListener("DOMContentLoaded", () => {
    formularioTran.addEventListener("submit", (e) => {
        e.preventDefault();
        cadastrarTransportadora();
        limparTransportadora();
    });
});
