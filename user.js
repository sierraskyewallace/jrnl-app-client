class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    sayHi() {
        console.log(`Hi, I'm ${this.username}`);
    }
}