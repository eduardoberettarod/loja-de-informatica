function fnAlterarFoto() {
    if (foto.value != '') {
        document.getElementById("fundo-imagemUnidade").style.backgroundImage = `url('${foto.value}')`
    } else {
        document.getElementById("fundo-imagemUnidade").style.backgroundImage = `url('https://portaldeamericana.com/wp-content/uploads/2018/06/Info3.jpg')`
    }
    console.log(foto.value)
}

function fnLimparCampos() {
    document.getElementById("form-unidades").reset()
}

function fnCadastrarUnidades() {

    let formDados = {
        nome_da_loja: document.getElementById("nome_da_loja").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        foto: document.getElementById("foto").value,
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value,
    }
    console.dir(formDados)

    fetch('http://localhost:3000/unidades/', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formDados)
    })
        .then(resposta => resposta.json())
        .then((dados) => {
            fnLimparCampos()
            fnMostrarToast()
            console.log(dados)
        })
        .catch(erro => console.log(erro.message))
}

let foto = document.getElementById("foto")
let btn_salvar = document.getElementById("btn-salvar-unidade")


foto.addEventListener("blur", function () {
    fnAlterarFoto()
})

btn_salvar.addEventListener("click", function () {
    console.log("clicou")
    fnCadastrarUnidades()
})

const toastLiveExample = document.getElementById('liveToast2')

function fnMostrarToast() {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}
