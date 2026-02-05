function fnMontarCardUnidade(unidade) {
    let cartao = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <img src="${unidade.foto}"
                        class="card-img-top" style="width:100%; height:300px; object-fit:cover; " alt="${unidade.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${unidade.titulo}</h5>
                        <p class="card-text">${unidade.descricao}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0">R$ ${unidade.preco}</span>
                            <div>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                                <small class="text-muted">(${unidade.avaliacao})</small>
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
    document.querySelector(".lista-unidades").innerHTML += cartao
}

function fnCarregarDados() {
    fetch('http://localhost:3000/unidades/', { method: 'GET' })
        .then(response => response.json())
        .then((unidades) => {
            unidades.forEach(unidade => {
                fnMontarCardunidade(unidade)
            });
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()