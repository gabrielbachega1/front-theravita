// REGISTRAR VENDA
document.addEventListener('DOMContentLoaded', () => {
    const produtosVenda = document.querySelector('#form-registrar-venda .produto-venda').parentNode;

    produtosVenda.addEventListener('click', (e) => {
        if (e.target.id === 'adicionar-produto') {
            e.preventDefault();
            const grupos = produtosVenda.querySelectorAll('.produto-venda');
            const contador = grupos.length + 1;

            const div = document.createElement('div');
            div.className = 'produto-venda';
            div.innerHTML = `
                <div class="container1">
                    <label for="id-produto-venda-${contador}">ID do produto:</label>
                    <input type="number" id="id-produto-venda-${contador}" name="id-produto-venda[]" required placeholder="Digite o ID do produto">
                </div>
                <div class="container2">
                    <label for="quantidade-venda-${contador}">Quantidade vendida:</label>
                    <input type="number" id="quantidade-venda-${contador}" name="quantidade-venda[]" required min="1" placeholder="Digite a quantidade">
                    <button type="button" class="remover-produto">-</button>
                </div>
            `;

            produtosVenda.insertBefore(div, grupos[0]);

            produtosVenda.querySelectorAll('.remover-produto').forEach(btn => {
                btn.style.display = produtosVenda.children.length > 1 ? 'inline-block' : 'none';
            });
        }

        if (e.target.classList.contains('remover-produto')) {
            if (produtosVenda.querySelectorAll('.produto-venda').length > 1) {
                e.target.closest('.produto-venda').remove();
            }

            produtosVenda.querySelectorAll('.remover-produto').forEach(btn => {
                btn.style.display = produtosVenda.querySelectorAll('.produto-venda').length > 1 ? 'inline-block' : 'none';
            });
        }

        formularioVenda.addEventListener("submit", (e) => {
            e.preventDefault();
            cadastrarVenda();
        });
    });
});

const formularioVenda = document.querySelector("#form-registrar-venda");
const iIdFuncionarioVenda = document.querySelector("#funcionario-venda");
const iIdTransportadoraVenda = document.querySelector("#transportadora-venda");
const iRegiaoVenda = document.querySelector("#regiao-venda");
const iDataVenda = document.querySelector("#data-venda");
const iProdutosVenda = document.querySelectorAll("[id^='id-produto-venda-']");
const iQuantidadesVenda = document.querySelectorAll("[id^='quantidade-venda-']");

function cadastrarVenda() {
    fetch("http://localhost:8800/vendas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            funcionario: iIdFuncionarioVenda.value,
            transportadora: iIdTransportadoraVenda.value,
            regiao: iRegiaoVenda.value,
            data: iDataVenda.value,
            produtos: Array.from(iProdutosVenda).map((input, index) => ({
                produto: input.value,
                quantidade: iQuantidadesVenda[index].value
            }))
        })
    })
        .then(function (res) {
            if (!res.ok) {
                throw new Error(`Erro ${res.status}: ${res.statusText}`);
            }
            return res.json();
        })
        .then(function (data) {
            console.log("Venda registrada com sucesso:", data);
            alert("Venda registrada com sucesso!");
        })
        .catch(function (error) {
            console.error("Erro ao registrar venda:", error);
            alert(`Falha ao registrar venda: ${error.message}`);
        });
}

function limparVenda() {
    iIdFuncionarioVenda.value = "";
    iIdTransportadoraVenda.value = "";
    iRegiaoVenda.value = "";
    iDataVenda.value = "";
    iProdutosVenda.forEach(input => input.value = "");
    iQuantidadesVenda.forEach(input => input.value = "");
}

// REGISTRAR COMPRA
const produtosCompra = document.querySelector('#form-registrar-compra .produto-compra').parentNode;
const formularioCompra = document.querySelector("#form-registrar-compra");

produtosCompra.addEventListener('click', (e) => {
    if (e.target.id === 'adicionar-produto') {
        e.preventDefault();
        const grupos = produtosCompra.querySelectorAll('.produto-compra');
        const contador = grupos.length + 1;

        const div = document.createElement('div');
        div.className = 'produto-compra';
        div.innerHTML = `
                <div class="container1">
                    <label for="id-produto-compra-${contador}">ID do produto:</label>
                    <input type="number" id="id-produto-compra-${contador}" name="id-produto-compra[]" required placeholder="Digite o ID do produto">
                </div>
                <div class="container2">
                    <label for="quantidade-compra-${contador}">Quantidade compra:</label>
                    <input type="number" id="quantidade-compra-${contador}" name="quantidade-compra[]" required min="1" placeholder="Digite a quantidade">
                    <button type="button" class="remover-produto">-</button>
                </div>
            `;
        produtosCompra.insertBefore(div, grupos[0]);
        produtosCompra.querySelectorAll('.remover-produto').forEach(btn => {
            btn.style.display = produtosCompra.children.length > 1 ? 'inline-block' : 'none';
        });
    }

    if (e.target.classList.contains('remover-produto')) {
        if (produtosCompra.querySelectorAll('.produto-compra').length > 1) {
            e.target.closest('.produto-compra').remove();
        }
        produtosCompra.querySelectorAll('.remover-produto').forEach(btn => {
            btn.style.display = produtosCompra.querySelectorAll('.produto-compra').length > 1 ? 'inline-block' : 'none';
        });
    }
});

formularioCompra.addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrarCompra();
    limparCompra();
});

function cadastrarCompra() {
    const iIdFuncionarioCompra = document.querySelector("#funcionario-compra");
    const iDataCompra = document.querySelector("#data-compra");
    const iProdutosCompra = document.querySelectorAll("[id^='id-produto-compra-']");
    const iQuantidadesCompra = document.querySelectorAll("[id^='quantidade-compra-']");

    const produtos = [];

    for (let i = 0; i < iProdutosCompra.length; i++) {
        produtos.push({
            produto: iProdutosCompra[i].value,
            quantidade: iQuantidadesCompra[i].value
        });
    }

    fetch("http://localhost:8800/caixa/registrar-compra/1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            funcionario: iIdFuncionarioCompra.value,
            data: iDataCompra.value,
            produtos: produtos
        })
    })
    .then(function (res) {
        if (!res.ok) {
            throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }
        return res.json();
    })
    .then(function (data) {
        console.log("Compra registrada com sucesso:", data);
        alert("Compra registrada com sucesso!");
    })
    .catch(function (error) {
        console.error("Erro ao registrar compra:", error);
        alert(`Falha ao registrar compra: ${error.message}`);
    });
}

// Função para limpar o formulário de compra
function limparCompra() {
    document.querySelector("#funcionario-compra").value = "";
    document.querySelector("#data-compra").value = "";
    document.querySelectorAll("[id^='id-produto-compra-']").forEach(input => input.value = "");
    document.querySelectorAll("[id^='quantidade-compra-']").forEach(input => input.value = "");
}