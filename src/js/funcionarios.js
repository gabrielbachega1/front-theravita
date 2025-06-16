const formulario = document.querySelector("#form-cadastro");
const iNome = document.querySelector("#nome-cadastro");
const iCpf = document.querySelector("#cpf-cadastro");
const iGenero = document.querySelector("#genero-cadastro");
const iSetor = document.querySelector("#setor-cadastro");
const iSalario = document.querySelector("#salario-base-cadastro");

// CADASTRO DE FUNCIONÁRIOS
function cadastrar() {
    fetch("http://localhost:8800/funcionarios/cadastrar",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                nome: iNome.value,
                cpf: iCpf.value,
                genero: iGenero.value,
                setor: iSetor.value,
                salario: iSalario.value
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;
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

function limpar() {
    iNome.value = "";
    iCpf.value = "";
    iGenero.value = "";
    iSetor.value = "";
    iSalario.value = "";
}

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validarCPF(iCpf.value)) {
        alert("CPF inválido!");
        iCpf.focus();
        return;
    }
    cadastrar();
    limpar();
});

// ATUALIZAÇÃO DE FUNCIONÁRIOS
const formAtualizar = document.querySelector("#form-atualizar");
const iIdAtualizar = document.querySelector("#id-atualizar");
const iNomeAtualizar = document.querySelector("#nome-atualizar");
const iCpfAtualizar = document.querySelector("#cpf-atualizar");
const iGeneroAtualizar = document.querySelector("#genero-atualizar");
const iSetorAtualizar = document.querySelector("#setor-atualizar");
const iSalarioAtualizar = document.querySelector("#salario-base-atualizar");

function atualizarFuncionario() {
    const body = {};
    if (iNomeAtualizar.value) body.nome = iNomeAtualizar.value;
    if (iCpfAtualizar.value) body.cpf = iCpfAtualizar.value;
    if (iGeneroAtualizar.value) body.genero = iGeneroAtualizar.value;
    if (iSetorAtualizar.value) body.setor = iSetorAtualizar.value;
    if (iSalarioAtualizar.value) body.salario = iSalarioAtualizar.value;

    fetch(`http://localhost:8800/funcionarios/editar/${iIdAtualizar.value}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(body)
    })
    .then(function (res) { console.log(res); })
    .catch(function (res) { console.log(res); });
}

function limparAtualizar() {
    iIdAtualizar.value = "";
    iNomeAtualizar.value = "";
    iCpfAtualizar.value = "";
    iGeneroAtualizar.value = "";
    iSetorAtualizar.value = "";
    iSalarioAtualizar.value = "";
}

formAtualizar.addEventListener('submit', function (event) {
    event.preventDefault();
    if (iCpfAtualizar.value != null) {
        if (!validarCPF(iCpfAtualizar.value)) {
            alert("CPF inválido!");
            iCpfAtualizar.focus();
            return;
        }
    }
    atualizarFuncionario();
    limparAtualizar();
});

// LISTAR FUNCIONÁRIOS
const tabelaFuncionarios = document.querySelector("#tabela-funcionarios tbody");

function listarFuncionarios() {
    fetch("http://localhost:8800/funcionarios/listar")
        .then(response => response.json())
        .then(data => {
            tabelaFuncionarios.innerHTML = ""; // Limpa a tabela antes de preencher
            data.forEach(funcionario => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${funcionario.id}</td>
                    <td>${funcionario.nome}</td>
                    <td>${funcionario.cpf}</td>
                    <td>${funcionario.genero}</td>
                    <td>${funcionario.setor}</td>
                    <td>${funcionario.salario}</td>
                `;
                tabelaFuncionarios.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao listar funcionários:', error));
}