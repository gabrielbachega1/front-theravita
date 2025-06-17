const tabelaTransacoes = document.querySelector("#tabela-transacoes-abertas tbody");
const formPesquisarVenda = document.querySelector("#form-pesquisar-venda");
const infoVendaStatus = document.getElementById("info-venda-status");
const formAtualizarStatus = document.getElementById("form-atualizar-status");
const iIdVendaAtualizar = document.querySelector("#id-venda-atualizar");
const iNovoStatus = document.querySelector("#novo-status");

let vendaAtual = null;

function listarTransacoesAbertas() {
    fetch("http://localhost:8800/gestao/em-aberto")
        .then(res => res.json())
        .then(transacoes => {
            tabelaTransacoes.innerHTML = "";
            transacoes.forEach(tran => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${tran.id}</td>
                    <td>${tran.produto}</td>
                    <td>${tran.estoque}</td>
                    <td>${tran.regiao}</td>
                    <td>${tran.transportadora}</td>
                    <td>${tran.data}</td>
                    <td>${tran.valor}</td>
                    <td>${tran.status}</td>
                    <!-- Adicione outros campos se necessário -->
                `;
                tabelaTransacoes.appendChild(tr);
            });
        })
        .catch(err => {
            alert("Erro ao buscar transações em aberto!");
            console.error(err);
        });
}




// ATENÇÃO: O endpoint 'http://localhost:8800/gestao/venda/${id}' NÃO existe no backend atualmente.
// Para buscar uma venda pelo ID, será necessário criar esse endpoint na gestão
// OU adaptar para usar um endpoint já existente, como '/caixa/filtrar-vendas' se suportar busca por ID.
formPesquisarVenda.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("id-venda-pesquisar").value;
    fetch(`http://localhost:8800/gestao/venda/${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Venda não encontrada");
            return res.json();
        })
        .then(venda => {
            vendaAtual = venda;
            document.getElementById("info-produto").textContent = venda.produto;
            document.getElementById("info-estoque").textContent = venda.estoque;
            document.getElementById("info-regiao").textContent = venda.regiao;
            document.getElementById("info-transportadora").textContent = venda.transportadora;
            document.getElementById("info-data").textContent = venda.data;
            document.getElementById("info-valor").textContent = venda.valor;
            document.getElementById("info-status").textContent = venda.status;
            document.getElementById("novo-status").value = "";
            infoVendaStatus.style.display = "block";
        })
        .catch(err => {
            alert("Venda não encontrada!");
            infoVendaStatus.style.display = "none";
            vendaAtual = null;
        });
});

function atualizarStatusVenda() {
    const id = iIdVendaAtualizar.value;
    const status = iNovoStatus.value;

    fetch(`http://localhost:8800/gestao/atualizar-status/${id}/${status}`, {
        method: "PUT",
    })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao atualizar status");
            return res.json();
        })
        .then(() => {
            alert("Status atualizado com sucesso!");
            formAtualizarStatus.reset();
            listarTransacoesAbertas(); // Atualiza a lista de transações após a atualização do status
        })
        .catch(err => {
            alert("Erro ao atualizar status!");
            console.error(err);
        });
}

if (formAtualizarStatus) {
    formAtualizarStatus.addEventListener("submit", function (e) {
        e.preventDefault();
        atualizarStatusVenda();
    });
}