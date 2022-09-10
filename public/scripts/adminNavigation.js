
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
        console.log('aaaaaaaaaaa')
        let email = event.target.getAttribute("user_email")
        console.log(email);
        deleteUserByEmail(email);
        location.reload();
    })
    
}
