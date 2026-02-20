function fnMontarTabelaProduto(produto) {

    let tabela = `
        <tr>
            <td class="py-2">
                <img src="${produto.foto}"
                    class="card-img-top rounded-3"
                    style="width:100px; height:100px; object-fit:cover;"
                    alt="${produto.titulo}">
            </td>
            <td class="py-2 text-center align-middle">${produto.id}</td>

            <td class="py-2 text-center align-middle">${produto.titulo.substring(0, 20)}</td>

            <td class="py-2 text-center align-middle">${produto.descricao.substring(0, 50)}...</td>

            <td class="py-2 text-center align-middle">${produto.categoria}</td>

            <td class="py-2 text-center align-middle">${formatador.format(produto.preco)}</td>

            <td class="py-2 text-center align-middle">${'⭐'.repeat(produto.avaliacao)}</td>

            <td class="py-2 align-middle">
                <div class="d-flex justify-content-center align-items-center gap-2">
                    <a href="um-produto.html?id=${produto.id}" class="btn">
                        <i class="bi bi-search text-primary"></i>
                    </a>       

                    <a href="editar-produto.html?id=${produto.id}" class="btn">
                        <i class="bi bi-pencil-square text-success"></i>
                    </a>        

                    <button type="button" class="btn">
                        <i class="bi bi-trash text-danger"></i>
                    </button>        
                </div>
            </td>
        </tr>
    `

    document.getElementById("lista-produtos").innerHTML += tabela
}

const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

function fnCarregarDados() {

    document.getElementById("lista-produtos").innerHTML = ""

    fetch('http://localhost:3000/produtos', { method: 'GET' })
        .then(response => response.json())
        .then(produtos => {
            produtos.forEach(produto => {
                fnMontarTabelaProduto(produto)
            })
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()