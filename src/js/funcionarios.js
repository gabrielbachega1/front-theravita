// CADASTRO DE FUNCIONÁRIOS
const formulario = document.querySelector("#form-cadastro");
const iNome = document.querySelector("#nome-cadastro");
const iCpf = document.querySelector("#cpf-cadastro");
const iSetor = document.querySelector("#setor-cadastro");
const iSalario = document.querySelector("#salario-base-cadastro");

function cadastrarFuncionario() {
  fetch("http://localhost:8800/funcionarios/cadastrar", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      nome: iNome.value,
      cpf: iCpf.value,
      setor: iSetor.value,
      salario: iSalario.value,
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
      alert("Funcionário cadastrado com sucesso!");
    })
    .catch(function (error) {
      console.error("Erro ao cadastrar o funcionário:", error);
      alert(`Falha ao cadastrar o funcionário: ${error.message}`);
    });
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0,
    resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;

  return true;
}

function limparFuncionario() {
  iNome.value = "";
  iCpf.value = "";
  iSetor.value = "";
  iSalario.value = "";
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!validarCPF(iCpf.value)) {
    alert("CPF inválido!");
    iCpf.focus();
    return;
  }
  cadastrarFuncionario();
  limparFuncionario();
});

// ATUALIZAÇÃO DE FUNCIONÁRIOS
const formAtualizar = document.querySelector("#form-atualizar");
const iIdAtualizar = document.querySelector("#id-atualizar");
const iNomeAtualizar = document.querySelector("#nome-atualizar");
const iCpfAtualizar = document.querySelector("#cpf-atualizar");
const iSetorAtualizar = document.querySelector("#setor-atualizar");
const iSalarioAtualizar = document.querySelector("#salario-base-atualizar");

function atualizarFuncionario() {
  const body = {};
  if (iNomeAtualizar.value) body.nome = iNomeAtualizar.value;
  if (iCpfAtualizar.value) body.cpf = iCpfAtualizar.value;
  if (iSetorAtualizar.value) body.setor = iSetorAtualizar.value;
  if (iSalarioAtualizar.value) body.salario = iSalarioAtualizar.value;

  fetch(`http://localhost:8800/funcionarios/editar/${iIdAtualizar.value}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
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
      console.log("Atualização realizada com sucesso:", data);
      alert("Funcionário atualizado com sucesso!");
    })
    .catch(function (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert(`Falha ao atualizar funcionário: ${error.message}`);
    });
}

function limparAtualizarFuncionario() {
  iIdAtualizar.value = "";
  iNomeAtualizar.value = "";
  iCpfAtualizar.value = "";
  iSetorAtualizar.value = "";
  iSalarioAtualizar.value = "";
}

formAtualizar.addEventListener("submit", function (event) {
  event.preventDefault();
  if (iCpfAtualizar.value != "") {
    if (!validarCPF(iCpfAtualizar.value)) {
      alert("CPF inválido!");
      iCpfAtualizar.focus();
      return;
    }
  }
  atualizarFuncionario();
  limparAtualizarFuncionario();
});

// LISTAR FUNCIONÁRIOS
document.addEventListener("DOMContentLoaded", () => {
  const formListar = document.querySelector("#form-listar");
  const tabelaFuncionarios = document.querySelector("#tabela-funcionarios");
  const setorEscolhido = document.querySelector("#setor-listar");

  formListar.addEventListener("submit", function (e) {
    e.preventDefault();
    listarFuncionarios();
  });

  function listarFuncionarios() {
    let setorLink =
      setorEscolhido.value === "TODOS"
        ? `http://localhost:8800/funcionarios/listar`
        : `http://localhost:8800/funcionarios/listar/${setorEscolhido.value}`;
    fetch(setorLink)
      .then((response) => response.json())
      .then((data) => {
        if (!tabelaFuncionarios.querySelector("table")) {
          tabelaFuncionarios.innerHTML = `
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Setor</th>
                                    <th>Salário</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    `;
        }
        const tbody = tabelaFuncionarios.querySelector("tbody");
        tbody.innerHTML = "";
        data.forEach((funcionario) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${funcionario.id}</td>
                        <td>${funcionario.nome}</td>
                        <td>${funcionario.cpf}</td>
                        <td>${funcionario.setor}</td>
                    `;
          fetch(`http://localhost:8800/salarios/${funcionario.id}`)
            .then((response) => response.json())
            .then((salario) => {
              row.innerHTML += `<td>${salario.salario}</td>`;
            })
            .catch((error) => console.error("Erro ao obter salário:", error));

          row.addEventListener("click", () => {
            document
              .querySelectorAll(".conteudo > div")
              .forEach((div) => div.classList.add("invisivel"));

            const atualizarProdutoDiv = document.querySelector(".atualizar-funcionario");
            atualizarProdutoDiv.classList.remove("invisivel");

            document.getElementById("id-atualizar").value = funcionario.id;
            document.getElementById("nome-atualizar").value = funcionario.nome;
            document.getElementById("cpf-atualizar").value = funcionario.cpf;
            document.getElementById("setor-atualizar").value = funcionario.setor;
            document.getElementById("salario-base-atualizar").value = salario.salario;
          });

          tbody.appendChild(row);
        });
      })
      .catch((error) => console.error("Erro ao listar funcionários:", error));
  }
});

// EXCLUIR FUNCIONÁRIO
const formExcluir = document.querySelector("#form-excluir");
const iIdExcluir = document.querySelector("#id-excluir");
function excluirFuncionario() {
  fetch(`http://localhost:8800/funcionarios/excluir/${iIdExcluir.value}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          let data;
          try {
            data = JSON.parse(text);
          } catch {
            data = {};
          }
          throw new Error(data.erro || `Erro ${res.status}: ${res.statusText}`);
        });
      }
      if (res.status === 204) {
        return {};
      }
      return res.json();
    })
    .then(function (data) {
      console.log("Funcionário excluído com sucesso:", data);
      alert("Funcionário excluído com sucesso!");
    })
    .catch(function (error) {
      console.error("Erro ao excluir funcionário:", error);
      alert(`Falha ao excluir funcionário: ${error.message}`);
    });
}

function limparExcluir() {
  iIdExcluir.value = "";
}

formExcluir.addEventListener("submit", function (event) {
  event.preventDefault();
  excluirFuncionario();
  limparExcluir();
});
