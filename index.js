

document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
        loginFormHandler(e)
    })
    const signUpForm = document.querySelector('#sign-up-form');
    signUpForm.addEventListener('submit', (e) => {
        signUpFormHandler(e)
    })

    const createEntryForm = document.querySelector('#journal-entry-form-container');
    createEntryForm.addEventListener("submit", (event) => {
        createFormHandler(event);
    });

        getEntries();
    

    //function that gets the entries from the api and renders them
    function getEntries() {
        fetch('http://localhost:3000/api/v1/journal_entries')
            .then(response => response.json())
            .then(entries => {
                console.log(entries);
                entries.data.forEach(journalEntry => {
                    const journalEntryMarkup = `
                    <div class="journal-entries-container">
                    <h3>${journalEntry.attributes.name}</h3>
                    <p>${journalEntry.attributes.content}</p>
                    <br><br>;`

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
        fetch('http://localhost:3000/api/v1/journal_entries', {
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

function loginFormHandler(e) {
  e.preventDefault()
  const username = e.target.querySelector("#username").value
  const password = e.target.querySelector("#password").value
  loginFetch(username, password)
}

function loginFetch(username, password) {
  const formData = {user: { username, password} }

  fetch('http://localhost:3000/api/v1/login', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
      .then(json => {
          localStorage.setItem('jwt_token', json.jwt)
          renderUser()
      })
}


function renderUser() {
    console.log(localStorage.getItem('jwt_token'));
    
}

function signUpFormHandler(e) {
    e.preventDefault()
    const username = e.target.querySelector("#username").value
    const password = e.target.querySelector("#password").value
    signUpFetch(username, password)
}

function signUpFetch(username, password) {
    const formData = {user: { username, password} }

    fetch('http://localhost:3000/api/v1/users', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
        .then(json => {
            localStorage.setItem('jwt_token', json.jwt)
            renderUser()
        })
}


