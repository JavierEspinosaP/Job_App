const mainContainer = document.getElementById('mainContainer')
const searchForm = document.getElementById('searchForm')
const inputValue = document.getElementById('inputValue').value
const searchButton = document.getElementById('searchButton')
const cardsContainer = document.getElementById('cardsContainer')
const spinner = document.getElementById('spinner')
const logout = document.getElementById('logout')


Swal.fire({
    title: 'User Logged!',
    icon: 'success',
    confirmButtonText: 'Cool'
})


searchButton.addEventListener('click', () => {

    const searchData = async () => {
        spinner.style.display = "block"
        let responseOffers = await fetch(`/api/search?search=${inputValue}`)
        let offersData = await responseOffers.json()
        spinner.style.display = "none"
        for (let i = 0; i < offersData.length; i++) {
            if (offersData[i].url == undefined) {
                let offer = `
            <section class="bot-left" id="offerCard">
            <h3>${offersData[i].proyect_name}</h3>
            <p>Publicado:${offersData[i].published}</p>
            <p>Presupuesto:${offersData[i].budget}</p>
            <p>Descripcion:${offersData[i].description}</p>
            <div class="divContainerFav">
            <button class="backBtn" id="addFav">Añadir Favorito</button>
<button class="backBtn" id="delFav">Eliminar Favorito</button></div>

<script type="text/javascript">
    let add = document.getElementById("addFav");
    add.id = "addFav" + offersData[i].project_name;
    add.onclick = function () {
        saveFavorite();
    }

    let del = document.getElementById("delFav");
    del.id = "delFav" + offersData[i].project_name;
    del.onclick = function () {
    deleteFavorite();
    }
</script>
            </section>`
                cardsContainer.innerHTML += offer

            } else {
                let offer = `
            <section class="bot-left" id="offerCard">
            <h3>${offersData[i].proyect_name}</h3>
            <p>Publicado:${offersData[i].published}</p>
            <p>Presupuesto:${offersData[i].budget}</p>
            <p>Descripcion:${offersData[i].description}</p>
            <a class="logContainer" id="urlLink" target="_blank" href="${offersData[i].url}">Link a la oferta</a>
            <div class="divContainerFav">
            <button class="backBtn" id="addFav">Añadir Favorito</button>
<button class="backBtn" id="delFav">Eliminar Favorito</button></div>

<script type="text/javascript">
    let add = document.getElementById("addFav");
    add.id = "addFav" + offersData[i].project_name;
    add.onclick = function () {
        saveFavorite();
    }

    let del = document.getElementById("delFav");
    del.id = "delFav" + offersData[i].project_name;
    del.onclick = function () {
    deleteFavorite();
    }
</script>
            </section>`
                cardsContainer.innerHTML += offer
            }
        }


    }
    searchData()
}

)


logout.addEventListener('click', ()=>{
    Swal.fire({
        title: `'You're logout'`,
        icon: 'success',
        confirmButtonText: 'Cool!'
    })
})