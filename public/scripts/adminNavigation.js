//-----------------Borrar usuario(admin)-------------------//
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



//-----------------Crear usuario, dentro del form(admin)-------------------//

const btnFormCreateUser = document.getElementById("createNewUser");
const sectFormCreate = document.getElementById("formCreate");
sectFormCreate.style.display = "none";

btnFormCreateUser.addEventListener('click', function (e) {
  e.preventDefault();
  sectFormCreate.style.display = "flex";
})


const formCreateUser = document.getElementById("createUserForm");
const cName = document.getElementById('inputName');
const cSurname = document.getElementById('inputSurname');
const cEmail = document.getElementById('inputEmail');
const cPassword = document.getElementById('inputPassword');
const cRole= document.getElementById('inputRole');

const addUsers = document.getElementById('addUsers');


formCreateUser.addEventListener('submit', function (e) {
  e.preventDefault();
  let newUser = {
    name: cName.value,
    surname: cSurname.value,
    email: cEmail.value,
    password: cPassword.value,
    role: cRole.value
  }
console.log("este es el newUser", newUser)
//función para crearlo
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
        addNewUser();
        location.reload()
      })
    } catch (error) {
      console.log(error);
    }
  }
  createUser();
})



//-----------------Editar usuario(admin)-------------------//

const btnEditUser = document.querySelectorAll("editUser"); //despliega form edit
const formEditUser = document.getElementById("editUserForm");//formulario para EDIT user (se crea en cada tarjeta)
const sectFormEdit = document.getElementById("sectFormEdit");//div que se dezspliega ****tenemos que coger el section???
sectFormEdit.style.display = "none";

const eName = document.getElementById('editName');
const eSurname = document.getElementById('editSurname');
const eEmail = document.getElementById('paramEmail');


for (let j = 0; j < btnEditUser.length;j++){
  btnEditUser[j].addEventListener('click', function(e){
    e.preventDefault();
    sectFormEdit.style.display = "flex";
  })
}

//botón de todas las tarjetas para editar usuario (se manda ya la info)
const editUserbtn = document.querySelectorAll(".editUser");
for (let x = 0; x < editUserbtn.length; x++) {
  editUserbtn[x].addEventListener('click', function (event){
  let email = event.target.getAttribute("edit_email")
        updatedUser(email);
        location.reload();
    })
    
}





formEditUser.addEventListener('submit', function(e) {
  e.preventDefault();
  let updateUser = {
    name: eName.value,
    surname: eSurname.value,
    email: eEmail.value,
  }

  async function updatedUser() {
    try {
      await fetch('/api/users',{
        method:'PUT',
        body: JSON.stringify(updateUser),
        headers:{
            'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        addNewUser();
        location.reload()
      })
    } catch (error) {
      console.log(error);
    }
  }
  updatedUser();
})



async function addNewUser(){
    
  addUsers.innerHTML = "";
  await fetch('/api/users')
  .then(response=>response.json())
  .then(data=>{
     
      for(i=0;i<data.length;i++){
          let createElement = document.createElement('li');
          adsList.appendChild(createElement);
          createElement.innerHTML = `
          <h2>${data[i].name}</h2>
          <p>${data[i].surname}</p>
          <p>${data[i].email}</p>
          <p>${data[i].password}</p>
          <p>${data[i].role}</p>
          <button>Borrar</button>
          `
      }
  })
}

addNewUser();