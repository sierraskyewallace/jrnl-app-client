const endPoint = "http://localhost:3000/api/v1/users"

document.addEventListener('DOMContentLoaded', () => {
    fetch(endPoint)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            }
        )
});