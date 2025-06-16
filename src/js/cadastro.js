const formulario = document.querySelector("#form-cadastro");
const iNome = document.querySelector("#nome-cadastro");
const iCpf = document.querySelector("#cpf-cadastro");
const iGenero = document.querySelector("#genero-cadastro");
const iSetor = document.querySelector("#setor-cadastro");
const iSalario = document.querySelector("#salario-base-cadastro");

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
                salrio: iSalario.value
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
}

function limpar(){
    iNome.value = "";
    iCpf.value = "";
    iGenero.value = "";
    iSetor.value = "";
    iSalario.value = "";
}

formulario.addEventListener('submit', function(event){
    event.preventDefault();
    cadastrar();
    limpar();
});