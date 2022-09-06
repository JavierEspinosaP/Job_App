//Selectores

const signUpAccess = document.getElementById('signUpAccess')
const mainContainer = document.getElementById('mainContainer')
const signUpContainer = document.getElementById('signUpContainer')
const comeBackButton = document.getElementById('comeBackButton')
const loginAccess = document.getElementById('loginAccess')
const loginContainer = document.getElementById('loginContainer')
const comeBackButton2 = document.getElementById('comeBackButton2')
const searchFormContainer = document.getElementById('searchFormContainer')


//Navegacion

signUpAccess.addEventListener('click', ()=>{
    mainContainer.style.display = 'none'
    signUpContainer.style.display = 'block'
})

comeBackButton.addEventListener('click', ()=>{
    mainContainer.style.display = 'block'
    signUpContainer.style.display = 'none'
})

loginAccess.addEventListener('click', ()=>{
    mainContainer.style.display = 'none'
    loginContainer.style.display = 'flex'
})

comeBackButton2.addEventListener('click', ()=>{
    mainContainer.style.display = 'block'
    loginContainer.style.display = 'none'
})

searchFormContainer.addEventListener('submit', ()=>{

    async function search () {
        let responseOffers = await fetch('http://localhost:3005/search')
        let offersData = await responseOffers.json()
        console.log(offersData);
    }
    search ()
})
