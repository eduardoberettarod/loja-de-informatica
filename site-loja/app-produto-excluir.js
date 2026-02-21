function fnExcluirProduto(id) {
    fetch('http://localhost:3000/produto/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resposta => resposta.json())
        .then((dados) => {

            const linha = document.getElementById(`linha-${id}`)
            if (linha) {
                linha.remove()
            }

            document.activeElement.blur()

            const modalElement = document.getElementById('deleteModal')
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement)
            modalInstance.hide()
        })
        .catch(erro => console.log(erro.message))
}