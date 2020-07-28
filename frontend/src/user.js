class User {
    constructor(id, username, total){
    this.id = id
    this.username = username;
    this.total = total;
    }



    renderUser(){
        let usersDiv = document.getElementById("users-info")
        
        usersDiv.innerHTML +=
        `
        <ul>
        <h3>Username: ${this.username}</h3>
        <li> Total Points: - ${this.total} </li>
        </ul>
        `
    }
}