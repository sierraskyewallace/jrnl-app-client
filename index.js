let currentUser;
document.addEventListener('DOMContentLoaded', () => {
    

    const signupForm = document.querySelector('#signup-form')
    signupForm.addEventListener('submit', function(e){
        signupFormHandler(e);
    });
   

    const createEntryForm = document.querySelector('#journal-entry-form');
    createEntryForm.addEventListener("submit", (event) => {
        createFormHandler(event);
    });

    

    
    const logoutButton = document.querySelector('#logout-button');
    logoutButton.addEventListener('click', (e) => {
        logoutUser(e);
    });

    function logoutUser(e) {
        e.preventDefault();
        fetch('http://localhost:3000/api/v1/logout', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Successfully logged out") {
                window.location.href = "http://localhost:3000/";
            }
        })
    }
    if (currentUser) {
        logoutButton.style.display = 'block'
    } else {
        logoutButton.style.display = 'none'
    }



    function logoutUser(e) {
        e.preventDefault()
        localStorage.clear();
        window.location.href = "index.html";
    }
    

    function createFormHandler(e) {
        e.preventDefault()
        const nameInput = document.querySelector('#input-name').value;
        const contentInput = document.querySelector('#input-content').value;

         
        postFetch(nameInput, contentInput)
    }

    function postFetch(name, content) {
        // build my body object outside of my fetch
        const formData = { name, content }

        fetch('http://localhost:3000/api/v1/journal_entries', {
            // POST request
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(entry => {
                console.log(entry);
                let newEntry = new JournalEntry(entry, entry.attributes);
                document.querySelector('#journal-entry-form').innerHTML += newEntry.renderEntry()
            })
    }
    

    ;
}
)
function signupFormHandler(e) {
    e.preventDefault()
    const signupForm = document.querySelector('#signup-form');
    fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            user: {
                username: document.querySelector('#signup-username').value,
                password: document.querySelector('#signup-password').value
            }
        })
    })
        .then(res => res.json())
        .then(function (obj) {
            if (obj.message) {
                alert(obj.message)
            }
            else {
                loggedInUser(obj)
            }

            function loggedInUser(obj) {
                currentUser = obj
                signupForm.style.display = 'none'
                welcome.innerHTML = `<h3>Welcome, <i>${currentUser.data.attributes.username}</i> !</h3>`
            }
             getEntries();
        })
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
}
