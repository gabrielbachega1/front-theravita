document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os itens do submenu de funcionários
    const submenuFuncionarios = document.querySelectorAll('.funcionarios.submenu ul li a');

    // Mapeia o texto do menu para a classe da seção correspondente
    const mapaSecoes = {
        'Cadastrar funcionário': 'cadastrar-funcionario',
        'Editar funcionário': 'atualizar-funcionario',
        'Listar Funcionários': 'listar-funcionario'
        // Adicione outros mapeamentos conforme criar novas seções
    };

    submenuFuncionarios.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Pega o texto do menu clicado
            const texto = link.textContent.trim();

            // Verifica se existe uma seção correspondente
            if (mapaSecoes[texto]) {
                // Esconde todas as seções
                document.querySelectorAll('.conteudo > div').forEach(div => div.classList.add('invisivel'));
                // Mostra a seção correspondente
                document.querySelector(`.conteudo .${mapaSecoes[texto]}`).classList.remove('invisivel');
            }
        });
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const linksMenu = document.querySelectorAll('[data-menu], .produtos.submenu ul li a, .funcionarios.submenu ul li a');
//     const mapaSecoes = {
//         'Cadastrar funcionário': 'cadastrar-funcionario',
//         'Editar funcionário': 'atualizar-funcionario',
//         'Cadastrar produto': 'cadastrar-produto',
//         'Listar produtos': 'listar-produto',
//         'Atualizar produto': 'atualizar-produto',
//         'Excluir produto': 'excluir-produto'
//         // Adicione outros conforme necessário
//     };

//     linksMenu.forEach(link => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();
//             const texto = link.textContent.trim();
//             if (mapaSecoes[texto]) {
//                 document.querySelectorAll('.conteudo > div').forEach(div => div.classList.add('invisivel'));
//                 document.querySelector(`.conteudo .${mapaSecoes[texto]}`).classList.remove('invisivel');
//             }
//         });
//     });
// });