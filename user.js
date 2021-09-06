class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        
    }


    renderUser() {
        

        let userDiv = document.getElementById("user-div");
        userDiv.innerHTML += `<h3>Welcome ${this.username}</h3>`
    }
}