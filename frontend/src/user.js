class User {
    constructor(id, username, total){
    this.id = id
    this.username = username;
    this.total = total;
    }

// render and build users
    renderUser(){
        
        usersDiv.innerHTML +=
        `
        <div id="hud-item-users" "data-id"=${this.id}>
        <h3> ${this.id} - Username: ${this.username}</h3>
        <p> Total Points: - ${this.total} </p>
        </div>
        <button class="delete-user" "data-id"=${this.id} onclick="deleteUser()">Delete User</button>
        `
    }
}


