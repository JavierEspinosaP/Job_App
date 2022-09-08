require('../controllers/adminControllers')

//Selectores
const signUpAccess = document.getElementById('signUpAccess')
const mainContainer = document.getElementById('mainContainer')
const signUpContainer = document.getElementById('signUpContainer')
const comeBackButton = document.getElementById('comeBackButton')
const loginAccess = document.getElementById('loginAccess')
const loginContainer = document.getElementById('loginContainer')
const comeBackButton2 = document.getElementById('comeBackButton2')
const searchForm = document.getElementById('searchForm')


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


searchForm.addEventListener('submit', ()=>{
   const searchData = async ()=>{
        let responseOffers = await fetch('http://localhost:3005/search')
        let offersData = await  responseOffers.json()
        console.log(offersData);  
    }
    searchData()

})


// //botón Admin, buscar users por mail (EXTRA!)
// const searchUserByMail = document.getElementById('searchMail')
// searchUserByMail.addEventListener('click', () => {
//     if (condition) {
//         submit
//     } 
// })

async function deleteUser(emailUser) {
    try {
      await fetch('/users', {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          insertUsersList();
        });
    } catch {}
  }


//botón para borrar usuario (admin):
const deleteUserBtn = document.getElementById('deleteUser')
deleteUserBtn.addEventListener('click', () => {
    deleteUser();
    //cuando se hace click en el botón se pasa la func del controlador
})