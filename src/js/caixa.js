// CADASTRAR VENDA
document.addEventListener('DOMContentLoaded', () => {
    const produtosVenda = document.getElementById('produtos-venda');
    const btnAdicionar = document.getElementById('adicionar-produto');

    let contador = 1;

    btnAdicionar.addEventListener('click', () => {
        contador++;
        const div = document.createElement('div');
        div.className = 'produto-venda';
        div.innerHTML = `
            <label for="id-produto-venda-${contador}">ID do produto:</label>
            <input type="number" id="id-produto-venda-${contador}" name="id-produto-venda[]" required placeholder="Digite o ID do produto">
            <div class="container-venda">
                <label for="quantidade-venda-${contador}">Quantidade vendida:</label>
                <input type="number" id="quantidade-venda-${contador}" name="quantidade-venda[]" required min="1" placeholder="Digite a quantidade">
                <button type="button" class="remover-produto">-</button>
            </div>
        `;
        produtosVenda.appendChild(div);
    });

    produtosVenda.addEventListener('click', (e) => {
        if (e.target.classList.contains('remover-produto')) {
            if (produtosVenda.children.length > 1) {
                e.target.closest('.produto-venda').remove();
            }
        }
    });

    produtosVenda.addEventListener('DOMNodeInserted', () => {
        const grupos = produtosVenda.querySelectorAll('.produto-venda');
        grupos.forEach((grupo, idx) => {
            const btnRemover = grupo.querySelector('.remover-produto');
            if (btnRemover) {
                btnRemover.style.display = grupos.length > 1 ? 'inline-block' : 'none';
            }
        });
    });
});