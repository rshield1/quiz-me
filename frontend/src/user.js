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
        <h3 id="user-username">${this.username}</h3>
        <p id="total-points">${this.total}</p>
        </div>
        <button class="delete-user" data-id=${this.id} onclick="deleteUser()">Delete User</button>
        `
        hudUser.innerHTML = this.username
    }
}


