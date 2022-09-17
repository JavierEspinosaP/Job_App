//Selectores
const signUpAccess = document.getElementById('signUpAccess')
const mainContainer = document.getElementById('mainContainer')
const signUpContainer = document.getElementById('signUpContainer')
const comeBackButton = document.getElementById('comeBackButton')
const loginAccess = document.getElementById('loginAccess')
const loginContainer = document.getElementById('loginContainer')
const comeBackButton2 = document.getElementById('comeBackButton2')
const searchForm = document.getElementById('searchForm')
const inputValue = document.getElementById('inputValue').value
const userEmail = document.getElementById('userEmail').value
const searchButton = document.getElementById('searchButton')

const cardsContainer = document.getElementById('cardsContainer')
const spinner = document.getElementById('spinner')

//Navegacion
signUpAccess.addEventListener('click', () => {
    mainContainer.style.display = 'none'
    signUpContainer.style.display = 'block'
})

comeBackButton.addEventListener('click', () => {
    mainContainer.style.display = 'block'
    signUpContainer.style.display = 'none'
})

loginAccess.addEventListener('click', () => {
    mainContainer.style.display = 'none'
    loginContainer.style.display = 'flex'
})

comeBackButton2.addEventListener('click', () => {
    mainContainer.style.display = 'block'
    loginContainer.style.display = 'none'
})

searchButton.addEventListener('click', () => {

    const searchData = async () => {
        console.log("Estas en homeNavigation seatchData ");
        spinner.style.display = "block"
        let responseOffers = await fetch(`/api/search?search=${inputValue}`)
        console.log("variable userEmail ", userEmail);
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

})