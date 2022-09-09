
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
      await fetch('/user?email='+userMail, {
        method: "DELETE"
      })
    //     .then((response) => response.json())
    //     .then((data) => {

    //     });
    } catch {}
    console.log('hemos borrado')
  }


//botón para borrar usuario (admin):
const deleteUserBtn = document.getElementById('deleteUser')
deleteUserBtn.addEventListener('click', () => {
    deleteUserByEmail();
})