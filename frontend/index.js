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
        Enter You Name: <input type="text id="username">
        <input type="submit" value="Add Name">
        </form>

        `
        stopSubmit()
}

function stopSubmit() {
    let usersForm = document.getElementById("users-form")
    usersForm.addEventListener("submit", () =>{
        debugger
    })
}

    // delete users