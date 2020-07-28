document.addEventListener("DOMContentLoaded", () =>{
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

    
    // create users


    // delete users