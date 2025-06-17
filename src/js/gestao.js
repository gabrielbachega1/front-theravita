const tabelaTransacoes = document.querySelector("#tabela-transacoes-abertas tbody");
const formAtualizarStatus = document.querySelector("#form-atualizar-status");
const iIdVendaAtualizar = document.querySelector("#id-venda-atualizar");
const iNovoStatus = document.querySelector("#novo-status");

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

// Exemplo de como ligar ao menu:
document.querySelectorAll('.gestao.submenu ul li a').forEach(link => {
    if (link.textContent.trim() === "Consultar transações em andamento") {
        link.addEventListener("click", listarTransacoesAbertas);
    }
});

if (formAtualizarStatus) {
    formAtualizarStatus.addEventListener("submit", function (e) {
        e.preventDefault();
        atualizarStatusVenda();
    });
}