

document.addEventListener('DOMContentLoaded', () => {
    
    getEntries();

    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
        loginFormHandler(e)
    })


    const createEntryForm = document.querySelector('#journal-entry-form');
    createEntryForm.addEventListener("submit", (event) => {
        createFormHandler(event);
    });

    
    



   

    //function that gets the entries from the api and renders them
    function getEntries() {
        fetch("http://localhost:3000/api/v1/journal_entries")
            .then(response => response.json())
            .then(entries => {
                console.log(entries);
                entries.data.forEach(journalEntry => {

                    let newEntry = new JournalEntry(journalEntry, journalEntry.attributes);

                    document.querySelector('#journal-entries-container').innerHTML += newEntry.renderEntry();

                });
            });
    }

     function createFormHandler(e) {
         e.preventDefault()
         const nameInput = document.querySelector('#input-name').value;
         const contentInput = document.querySelector('#input-content').value;

         
  postFetch(nameInput, contentInput)
}

function postFetch(name, content) {
  // build my body object outside of my fetch
  const formData = {name, content}

  fetch('http://localhost:3000/spi/v1/journal_entries', {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(entry => {
    console.log(entry);
    const entryData = entry.data
    // render JSON response
    let newEntry = new JournalEntry(entryData, entryData.attributes)
    document.querySelector('#journal-entry-form').innerHTML += newEntry.renderEntry()
  })

}

    function loginFormHandler(e) {
        e.preventDefault()
        const username = e.target.querySelector("#username").value
        const password = e.target.querySelector("#password").value
        loginFetch(username, password)
    }

    function loginFetch(username, password) {
        const formData = { user: { username, password } }

        fetch('http://localhost:3000/api/v1/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
});