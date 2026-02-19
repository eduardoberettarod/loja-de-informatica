function fnLimparCampos() {
    document.getElementById("form-registro").reset()
}

function fnRegistrarUsuario() {
    let formDados = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        usuario: document.getElementById("usuario").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        senha: document.getElementById("senha").value,
        permissao: document.getElementById("permissao").value
    }

        fetch('http://localhost:3000/registro/', {
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


let btn_registro = document.getElementById("btn-registro")

btn_registro.addEventListener("click", function () {
    fnRegistrarUsuario()
    console.log("clicou")
})

const toastLiveExample = document.getElementById('liveToast2')

function fnMostrarToast() {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}