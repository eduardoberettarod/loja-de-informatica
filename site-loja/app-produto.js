function fnMontarProduto(produto) {
    document.getElementById("foto").src = produto.foto
    document.getElementById("titulo").innerHTML = produto.titulo
    document.getElementById("categoria").innerHTML = produto.categoria
    document.getElementById("preco").innerHTML = produto.preco.toLocaleString('pt-BR', {
        style: 'currency', currency: 'BRL'
    })
    document.getElementById("avaliacao").innerHTML = '⭐'.repeat(produto.avaliacao) + `(${produto.avaliacao})`
    document.getElementById("descricao").innerHTML = produto.descricao
}

function fnCarregarDados() {

    const parametros = new URLSearchParams(window.location.search)
    const id = parametros.get('id') + "/"
    fetch('http://localhost:3000/produtos/' + id, { method: 'GET' })
        .then(resposta => resposta.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarCardProduto(produto)
            });
        })

        .catch(erro => console.log(erro.message))
}

fnCarregarDados()