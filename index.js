

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#user-login-form-container');
    loginForm.addEventListener('submit', (e) => {
        loginFormHandler(e)
    })
    const createEntryForm = document.querySelector('#journal-entry-form-container');
    createEntryForm.addEventListener("submit", (event) => {
        createFormHandler(event);
    });
    getEntries();

    //function that gets the entries from the api and renders them
    function getEntries() {
        fetch("http://localhost:3000/api/v1/journal_entries")
            .then(response => response.json())
            .then(entries => {
                console.log(entries);
                entries.data.forEach(journalEntry => {
                    const journalEntryMarkup = `
                <div data-id="${journalEntry.id}">
                <h3>${journalEntry.attributes.name}</h3>
                // add the date here
                <p>${journalEntry.attributes.content}</p>
                </div>
                <br><br>`;
                    document.querySelector('#journal-entries-container').innerHTML += journalEntryMarkup;
                });
            });
    }

    function createFormHandler(event) {
        event.preventDefault();
        const name = document.querySelector('#input-name').value;
        const content = document.querySelector('#input-content').value;
        const newEntry = {
            name: name,
            content: content,
        };
        fetch("http://localhost:3000/api/v1/journal_entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEntry)
        })
            .then(response => response.json())
            .then(newEntry => {
                console.log(newEntry);
                const newEntryMarkup = `
            <div data-id="${newEntry.id}">
            <h3>${newEntry.name}</h3>
            // add the date here
            <p>${newEntry.content}</p>
            </div>
            <br><br>`;
                document.querySelector('#journal-entries-container').innerHTML += newEntryMarkup;
            });
            


    }
});

function loginFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#input-username').value;
    const password = document.querySelector('#input-password').value;
    loginFetch(username, password);
}

function loginFetch(username, password) {
    const formData = {
        user: {
            username: username,
            password: password
        }
    }
    fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            localStorage.setItem('jwt_toke', user.jwt);
            renderUser();
        }
        )
}

function renderUser() {
    console.log(localStorage.getItem('jwt_token'));
    fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            document.querySelector('#user-profile-container').innerHTML = `
            <h2>Welcome ${user.data.attributes.username}</h2>
            <button id="logout-button">Logout</button>
            `;
            document.querySelector('#logout-button').addEventListener('click', () => {
                logout();
            })
        }
    )
}

function logoutUser() {
    localStorage.removeItem('jwt_token');
    renderUser();
}
