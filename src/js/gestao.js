// TRANSAÇÕES EM ABERTO
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
                const nomesProdutos = (tran.produtos || [])
                    .map(item => item.produto?.descricao || item.produto?.nome || item.produto || "")
                    .join(", ");

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${tran.id}</td>
                    <td>${nomesProdutos}</td>
                    <td>${tran.data}</td>
                    <td>${tran.valor}</td>
                    <td>${tran.status}</td>
                `;
                tabelaTransacoes.appendChild(tr);
            });
        })
        .catch(err => {
            alert("Erro ao buscar transações em aberto!");
            console.error(err);
        });
}

document.addEventListener("DOMContentLoaded", listarTransacoesAbertas);

// ATUALIZAR STATUS
if (formAtualizarStatus) {
    formAtualizarStatus.addEventListener("submit", function (e) {
        e.preventDefault();
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
                listarTransacoesAbertas();
            })
            .catch(err => {
                alert("Erro ao atualizar status!");
                console.error(err);
            });
    });
}