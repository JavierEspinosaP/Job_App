//Para eliminar usuario (admin)
async function deleteUserByEmail(userMail) {
    try {
      let response = await fetch('/api/users?email='+userMail,{
        method: "DELETE",
        headers:{
            'Content-Type': 'application/json'
        }
      })
      let answer = await response.json();
      return answer;
    } catch(error) {
        console.log(error)
    }
  }


//botón para borrar usuario (admin):
const deleteUserBtn = document.querySelectorAll(".deleteUser");
for (let i = 0; i < deleteUserBtn.length; i++) {
    deleteUserBtn[i].addEventListener('click', function (event){
        let email = event.target.getAttribute("user_email")
        deleteUserByEmail(email);
        location.reload();
    })
    
}


//botón despliegue form para crear usuario (admin)
const btnFormCreateUser = document.getElementById("createNewUser");
const sectFormCreate = document.getElementById("formCreate");
sectFormCreate.style.display = "none";

btnFormCreateUser.addEventListener('click', function (e) {
  e.preventDefault();
  sectFormCreate.style.display = "flex";
})


//función para PUT y POST user
// async function addAtUsers(){
    
//   // usersList.innerHTML = "";
//   await fetch('/users')
//   .then(response=>response.json())
//   .then(data=>{
     
//       for(i=0;i<data.length;i++){
//           let createElement = document.createElement('li');
//           adsList.appendChild(createElement);
//           createElement.innerHTML = `
//           <h2>${data[i].id}</h2>
//           <p>${data[i].email}</p>
//           <p>${data[i].password}</p>
//           <p>${data[i].full_name}</p>
//           <p>${data[i].role}</p>
//           <p>${data[i].logged}</p>
//           <button>Borrar</button>
//           `
//       }
//   })
// }



//Crear usuario, dentro del form(admin)
const btnCreateUser = document.getElementById("createUser");
const cName = document.getElementById('inputname');
const cSurname = document.getElementById('inputSurname');
const cEmail = document.getElementById('inputEmail');
const cPassword = document.getElementById('inputPassword');


btnCreateUser.addEventListener('submit', function (e) {
  e.preventDefault();
  let newUser = {
    name: cName.value ,
    surname: cSurname.value,
    email: cEmail.value,
    password: cPassword.value,
  }


  async function createUser(){
    try {
      await fetch('/api/users', {
        method:'POST',
        body: JSON.stringify(newUser),
        headers:{
            'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        // addNewUser(); //función para añadir newUser
        location.reload()
      })
    } catch (error) {
      console.log(error);
    }
  }
  createUser();
})
