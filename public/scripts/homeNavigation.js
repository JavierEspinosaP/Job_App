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
const searchButton = document.getElementById('searchButton')
const searchButton2 = document.getElementById('searchButton2')
const signUpForm = document.getElementById('signUpForm')
const signUpEmail = document.getElementById('signUpEmail')
const signUpPassword = document.getElementById('signUpPassword')
const repeatPassword = document.getElementById('repeatPassword')
const cardsContainer = document.getElementById('cardsContainer')
const loginForm = document.getElementById('loginForm')
const loginEmail = document.getElementById('loginEmail')
const loginPassword = document.getElementById('loginPassword')
const spinner = document.getElementById('spinner')
const urlLink = document.getElementById('urlLink')



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

signUpForm.addEventListener('submit', () => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signUpEmail.value) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(signUpPassword.value)){}
    else if(signUpPassword.value!=repeatPassword.value){
        Swal.fire({
            title: `Passwords don't match!!`,
            icon: 'error',
            confirmButtonText: 'Ok...'
          })
    }
    else{
        Swal.fire({
            title: 'Invalid email or password format, please enter a valid email and a password with an uppercase, a number and minimum of 8 characters long',
            icon: 'error',
            confirmButtonText: 'Ok...'
          })
    }
})


loginForm.addEventListener('submit', () => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginEmail.value) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(loginPassword.value)){}
    else if(signUpPassword.value!=repeatPassword.value){
        Swal.fire({
            title: `Passwords don't match!!`,
            icon: 'error',
            confirmButtonText: 'Ok...'
          })
    }
    else{
        Swal.fire({
            title: 'Invalid email or password format, please enter a valid email and a password with an uppercase, a number and minimum of 8 characters long',
            icon: 'error',
            confirmButtonText: 'Ok...'
          })
    }

})


searchButton.addEventListener('click', () => {

    const searchData = async () => {
        spinner.style.display = "block"
        let responseOffers = await fetch(`/api/search?search=${inputValue}`)
        let offersData = await responseOffers.json()
        spinner.style.display = "none"
        for (let i = 0; i < offersData.length; i++) {
            if ((offersData[i].url).length<3) {
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

        }else{
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

