// Função para validar o formulário de cadastro de produtos
function validarProduto() {
    var nomeProduto = document.getElementById('txtNomeProduto').value;
    var codProduto = document.getElementById('txtCodProduto').value;
    var quantidadeDesejada = document.getElementById('quantidadeDesejada').value;

    if (nomeProduto.trim() === "") {
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
        return;
    }

    if (codProduto.trim() === "") {
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
        return;
    }

    if (quantidadeDesejada.trim() === "") {
        alert("Quantidade desejada não pode estar em branco. Favor preenchê-la!");
        return;
    }

    if (isNaN(parseInt(quantidadeDesejada)) || parseInt(quantidadeDesejada) <= 0) {
        alert("Quantidade desejada deve ser um número maior que zero.");
        return;
    }

    cadastrarProduto(nomeProduto, codProduto, parseInt(quantidadeDesejada));
}

// Função para cadastrar um novo produto no estoque
function cadastrarProduto(nomeProduto, codProduto, quantidadeDesejada) {
    let novoProduto = { nome: nomeProduto, codigo: codProduto, quantidade: quantidadeDesejada };

    if (typeof (Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("produtos", JSON.stringify(produtos));
        alert("Foram cadastradas com sucesso " + quantidadeDesejada + " unidades do produto " + nomeProduto + "!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
}


// Função para atualizar a quantidade de itens no carrinho (estoque)
function atualizarTotalEstoque(idCampo) {
    var totalEstoqueElement = document.getElementById(idCampo);
    if (totalEstoqueElement) {
        var totalEstoque = parseInt(totalEstoqueElement.innerHTML);
        if (!isNaN(totalEstoque)) {
            localStorage.setItem("totalEstoque", totalEstoque + 1);
            totalEstoqueElement.innerHTML = totalEstoque + 1;
        }
    }
}

// Função para carregar a quantidade total de itens no estoque ao carregar a página
function carregarTotalEstoque(idCampo) {
    if (typeof Storage !== "undefined") {
        var totalEstoqueElement = document.getElementById(idCampo);
        if (totalEstoqueElement) {
            var totalEstoque = localStorage.getItem("totalEstoque");
            if (totalEstoque == null) totalEstoque = 0;
            totalEstoqueElement.innerHTML = totalEstoque;
        }
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
}

// Função para listar os itens do estoque em uma tabela
function listarEstoque() {
    if (typeof Storage !== "undefined") {
        var produtos = localStorage.getItem("produtos");
        var container = document.createElement("div");
        container.className = "container";
        var h1 = document.createElement("h1");
        h1.textContent = "Estoque:";
        container.appendChild(h1);

        if (produtos == null) {
            var h3 = document.createElement("h3");
            h3.textContent = "Ainda não há nenhum item no estoque";
            container.appendChild(h3);
        } else {
            produtos = JSON.parse(produtos);
            var table = document.createElement("table");
            var thead = document.createElement("thead");
            var tbody = document.createElement("tbody");
            var tr = document.createElement("tr");
            var th1 = document.createElement("th");
            th1.textContent = "Nome do Produto";
            var th2 = document.createElement("th");
            th2.textContent = "Código do Produto";
            var th3 = document.createElement("th");
            th3.textContent = "Quantidade no Estoque";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            thead.appendChild(tr);

            produtos.forEach(produto => {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.textContent = produto.nome;
                var td2 = document.createElement("td");
                td2.textContent = produto.codigo;
                var td3 = document.createElement("td");
                td3.textContent = produto.quantidade;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tbody.appendChild(tr);
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            container.appendChild(table);
        }

        document.body.appendChild(container);
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");
    }
}

// Carregar a quantidade total de itens no estoque ao carregar a página
carregarTotalEstoque("totalEstoque");

// Função para limpar o estoque
function limparEstoque() {
    if (typeof Storage !== "undefined") {
        localStorage.removeItem("produtos");
        localStorage.setItem("totalEstoque", 0);
        alert("O estoque foi limpo com sucesso.");
        location.reload(); // Recarrega a página para refletir a remoção do estoque
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa ação.");
    }
}
