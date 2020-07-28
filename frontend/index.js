document.addEventListener("DOMContentLoaded", () =>{
    createUserform()
    grabUsers()
    


})

const BASE_URL = "http://localhost:3000/"
    // read users so I will create FETCH request!!!

    function grabUsers() {
            fetch(`${BASE_URL}/users`)
            .then(res => res.json())
            .then(users =>{
                for (let user of users){

                    let u = new User(user.id, user.username, user.total)
                    u.renderUser();
                }
            })
        }

    
    // create users and stop the default submit behavior with event listener
function createUserform() {
    let usersForm = document.getElementById("users-form")

    usersForm.innerHTML +=
        `
        <form>
        Enter You Name: <input type="text" id="username">
        <input type="submit" value="Add Name">
        </form>

        `
        usersForm.addEventListener("submit", userSubmittion)
}

function userSubmittion() {
// grab values from user form
        let username = document.getElementById("username").value
        let usertotal = 0
        console.log(username)

        let user = {
            username: username,
            total: 0
        }

        fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(user => {
            let u = new User(user.id, user.username, user.total)
            u.renderUser();
        })
        

    }


    // delete users
    
    function deleteUser() {
        let userID = parseInt(event.target.dataset.id)
        fetch(`${BASE_URL}/users/${userID}`, {
            method: 'DELETE'
        })
        // reload the window
        this.location.reload()
    }