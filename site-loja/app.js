function fnMontarCardProduto(produto) {
    let cartao = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <img src="${produto.foto}"
                        class="card-img-top" style="width:100%; height:300px; object-fit:cover; " alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.titulo}</h5>
                        <p class="card-text">${produto.descricao}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0">R$ ${produto.preco}</span>
                            <div>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                                <small class="text-muted">(${produto.avaliacao})</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light">
                        <button class="btn btn-primary btn-sm">Comprar</button>
                        <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-heart"></i></button>
                    </div>
                </div>
            </div>
    `
    document.querySelector(".lista-produtos").innerHTML += cartao
}

function fnCarregarDados() {

    const parametros = new URLSearchParams(window.location.search)
    const existe_categoria = parametros.has('categoria')

    let rota_categoria = ''
    if (existe_categoria) {
        rota_categoria = parametros.get('categoria') + "/"
    }
        fetch('http://localhost:3000/produtos/' + rota_categoria, { method: 'GET'})

        
    fetch('http://localhost:3000/produtos/', { method: 'GET' })
        .then(response => response.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarCardProduto(produto)
            });
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()