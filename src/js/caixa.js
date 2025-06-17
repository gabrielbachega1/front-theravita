document.addEventListener('DOMContentLoaded', () => {
    const produtosVenda = document.querySelector('#form-registrar-venda .produto-venda').parentNode;
    const form = document.getElementById('form-registrar-venda');

    produtosVenda.addEventListener('click', (e) => {
        // Adicionar novo grupo de produto
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

            // Insere acima do primeiro grupo de produto
            produtosVenda.insertBefore(div, grupos[0]);

            // Atualiza visibilidade dos botões "-"
            produtosVenda.querySelectorAll('.remover-produto').forEach(btn => {
                btn.style.display = produtosVenda.children.length > 1 ? 'inline-block' : 'none';
            });
        }

        // Remover grupo de produto
        if (e.target.classList.contains('remover-produto')) {
            if (produtosVenda.querySelectorAll('.produto-venda').length > 1) {
                e.target.closest('.produto-venda').remove();
            }
            // Atualiza visibilidade dos botões "-"
            produtosVenda.querySelectorAll('.remover-produto').forEach(btn => {
                btn.style.display = produtosVenda.querySelectorAll('.produto-venda').length > 1 ? 'inline-block' : 'none';
            });
        }
    });
});