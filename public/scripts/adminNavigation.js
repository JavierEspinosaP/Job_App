
// //botón Admin, buscar users por mail (EXTRA!)
// const searchUserByMail = document.getElementById('searchMail')
// searchUserByMail.addEventListener('click', () => {
//     if (condition) {
//         submit
//     } 
// })


async function deleteUserByEmail(userMail) {
  userMail=document.getElementById('userMail').innerText
  console.log(userMail);
    try {
      await fetch('api/user', {
        method: "DELETE",
      })
      console.log('estamos fuera del method delete')
        .then((response) => response.json())
        .then((data) => {

        });
    console.log('hemos borrado')
    } catch {}
  }


//botón para borrar usuario (admin):
const deleteUserBtn = document.getElementById('deleteUser')
deleteUserBtn.addEventListener('click', () => {
    deleteUserByEmail();
})