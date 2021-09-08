let currentUser;
document.addEventListener('DOMContentLoaded', () => {
    

    const signupForm = document.querySelector('#signup-form')
    signupForm.addEventListener('submit', function (e) {
        signupFormHandler(e);
    });
   

    const createEntryForm = document.querySelector('#journal-entry-form');
    createEntryForm.addEventListener("submit", (event) => {
        createFormHandler(event);
    });


    
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', (e) => {
        logoutUser(e);
    });


    function createFormHandler(e) {
        e.preventDefault()
        const nameInput = document.querySelector('#input-name').value;
        const contentInput = document.querySelector('#input-content').value;
        postFetch(nameInput, contentInput)
    };

    function postFetch(name, content) {
        const formData = { name, content }
        fetch('http://localhost:3000/api/v1/journal_entries', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(entry => {
                console.log(entry);
                let newEntry = new JournalEntry(entry, entry.data.attributes);
                document.querySelector('#journal-entry-form').innerHTML += newEntry.renderEntry()
            })
    };
})


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
            .then(res => res.json())
            .then(function (obj) {
                if (obj.message) {
                    alert(obj.message)
                }
                else {
                    loggedInUser(obj)
                }
                
    
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
            )
    })
}