const mainContainer = document.getElementById('mainContainer')
const searchForm = document.getElementById('searchForm')
const inputValue = document.getElementById('inputValue').value
const searchButton = document.getElementById('searchButton')
const cardsContainer = document.getElementById('cardsContainer')
const spinner = document.getElementById('spinner')
const logout = document.getElementById('logout')
const userEmail = document.getElementById('userEmail').value



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
            let offer = `
            <section class="bot-left" id="offerCard">
            <h3>${offersData[i].proyect_name}</h3>
            <p>Publicado:${offersData[i].published}</p>
            <p>Presupuesto:${offersData[i].budget}</p>
            <p>Descripcion:${offersData[i].description}</p>
            <a class="logContainer" id="urlLink" href="${offersData[i].url}">Link a la oferta</a>
            <div class="divContainerFav">

            <form action="/api/favorites" method="POST">
            <input type="hidden" id="email" name="email" value="${userEmail}">
            <input type="hidden" id="url" name="url" value="${offersData[i].url}">
            <input class="backBtn" type="submit" value="Añadir Favorito">
            </form> 

            <form action="/api/favorites/delete" method="POST">
            <input type="hidden" id="url" name="url" value="${offersData[i].url}">
            <input class="backBtn" type="submit" value="Borrar Favorito">
            </form> 
            </section>`
            cardsContainer.innerHTML += offer

        }


    }
    searchData()
}

)


logout.addEventListener('click', () => {
    Swal.fire({
        title: `'You're logout'`,
        icon: 'success',
        confirmButtonText: 'Cool!'
    })
})