let map;

let markers = [];

function fnMontarCardUnidade(unidade) {
    let cartao = `
        <div class="col-md-6 col-lg-4 mb-4">
    <div class="card h-100 border-0 shadow-sm card-unidades">
        <img 
            src="${unidade.foto}" 
            class="card-img-top"
            alt="${unidade.nome}"
        >

        <div class="card-body">
            <h5 class="card-title fw-bold">${unidade.nome_da_loja}</h5>

            <p class="card-text small mb-1">
                <i class="bi bi-telephone"></i> ${unidade.telefone}
            </p>

            <p class="card-text small mb-1">
                <i class="bi bi-envelope"></i> ${unidade.email}
            </p>

            <p class="card-text small">
                <i class="bi bi-geo-alt"></i> ${unidade.endereco}
            </p>
        </div>

        <div class="card-footer bg-light border-0 d-flex gap-2">
           <a 
                class="btn btn-primary btn-sm w-100 p-2"
                onclick="irParaUnidade(${unidade.latitude}, ${unidade.longitude})"
            >
                Conhecer Unidade <i class="bi bi-arrow-up-right"></i>
            </a>

            <button class="btn btn-outline-secondary btn-sm">
                <i class="bi bi-heart"></i>
            </button>
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
                fnMontarCardUnidade(unidade)
            });
        })
        .catch(erro => console.log(erro.message))
}


async function initMap() {

    map = L.map('map').setView([-14.2350, -51.9253], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const response = await fetch('http://localhost:3000/unidades');
    const unidades = await response.json();

    unidades.forEach(unidade => {

        const lat = parseFloat(unidade.latitude);
        const lng = parseFloat(unidade.longitude);

        if (!lat || !lng) return; // evita quebrar mapa

        const marker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>${unidade.nome_da_loja}</b><br>${unidade.endereco}`);

        markers.push({
            id: unidade.id, // precisa ter id no banco
            marker: marker
        });
    });
}

function irParaUnidade(latitude, longitude) {

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    document.getElementById("map").scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {

        map.flyTo([lat, lng], 16, {
            duration: 1.5
        });

        // abre popup automaticamente
        markers.forEach(item => {

            const pos = item.marker.getLatLng();

            if (pos.lat === lat && pos.lng === lng) {
                item.marker.openPopup();
            }
        });

    }, 400);


}

window.onload = initMap;



fnCarregarDados()