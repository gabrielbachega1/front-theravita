document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os itens do submenu de funcionários
  const linksMenu = document.querySelectorAll(
    "[data-menu], .produtos.submenu ul li a, .funcionarios.submenu ul li a, .caixa.submenu ul li a, .transportadora.submenu ul li, .gestao.submenu ul li a"
  );

  // Mapeia o texto do menu para a classe da seção correspondente
  const mapaSecoes = {
    "Cadastrar funcionário": "cadastrar-funcionario",
    "Editar funcionário": "atualizar-funcionario",
    "Listar funcionários": "listar-funcionario",
    "Excluir funcionário": "excluir-funcionario",
    "Cadastrar produto": "cadastrar-produto",
    "Listar produtos": "listar-produtos",
    "Atualizar produto": "atualizar-produto",
    "Registrar venda": "registrar-venda",
    "Registrar compra": "registrar-compra",
    "Visualizar saldo atual": "visualizar-saldo-atual",
    "Verificar lucro mensal": "verificar-lucro-mensal",
    "Verificar lucro anual": "verificar-lucro-anual",
    "Gerar relatório" : "gerar-relatorio",
    "Cadastrar transportadora": "cadastrar-transportadora",
    "Listar transportadoras": "listar-transportadoras",
    "Atualizar transportadora": "atualizar-transportadora",
    "Consultar transações em andamento": "listar-transacoes-abertas",
    "Atualizar status": "atualizar-status-transacao",
  };

  linksMenu.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const texto = link.textContent.trim();

      if (mapaSecoes[texto]) {
        document
          .querySelectorAll(".conteudo > div")
          .forEach((div) => div.classList.add("invisivel"));
        document
          .querySelector(`.conteudo .${mapaSecoes[texto]}`)
          .classList.remove("invisivel");
      }
    });
  });
});