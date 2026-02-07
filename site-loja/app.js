function fnMontarCardProduto(produto) {
    let cartao = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <img src="${produto.foto}"
                        class="card-img-top" style="width:100%; height:300px; object-fit:cover; " alt="${produto.titulo}">
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

    const nomeFiltrado = document.getElementById("nomeFiltrado")
    if (parametros.has('ordem')) {

        const ordem = parametros.get('ordem')

        if (ordem === "preco") {
            nomeFiltrado.innerHTML = "Ordenar por preço"
        }
        else if (ordem === "titulo") {
            nomeFiltrado.innerHTML = "Ordenar por título"
        }

        } else {
            nomeFiltrado.innerHTML = "Filtro"
        }

        const existe_categoria = parametros.has('categoria')

    let rota_categoria = ''

    const filtro = document.querySelector(".filtro")
    const categoria = parametros.get('categoria')
    const btnFiltro = document.querySelector('.btn-filtro')


    filtro.innerHTML =
        `<li><a href="produtos.html?categoria=${categoria}&ordem=preco" class="dropdown-item">Ordenar por preço</a></li>
        <li><a href="produtos.html?categoria=${categoria}&ordem=titulo" class="dropdown-item">Ordenar por titulo</a></li>`

    if (existe_categoria) {
        rota_categoria = parametros.get('categoria') + "/"
    }else {
        btnFiltro.style.display = "none"
    }


    const existe_ordem = parametros.has('ordem')

    let rota_ordem = ''
    if (existe_ordem) {
        rota_ordem = parametros.get('ordem') + "/"
    }

    document.querySelector(".lista-produtos").innerHTML = ""


    fetch('http://localhost:3000/produtos/' + rota_categoria + rota_ordem, { method: 'GET' })
        .then(response => response.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarCardProduto(produto)
            });
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()