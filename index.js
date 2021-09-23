// establishes current user if logged in
let currentUser

// loads dom
document.addEventListener('DOMContentLoaded', () => {

    // form to create entry, hidden if not logged in, when submit, -> form handler
    const createEntryForm = document.querySelector('#journal-entry-form');
    createEntryForm.style.display = 'none';
    createEntryForm.addEventListener("submit", (event) => {
        createFormHandler(event);
    });


    // logout button, hidden if not logged in, -> logout user
    const logoutButton = document.getElementById('logout-button');
    logoutButton.style.display = 'none';
    logoutButton.addEventListener('click', (e) => {
        logoutUser(e);
    });

    // logs out current user and reloads page
    function logoutUser(e) {
        e.preventDefault()
        currentUser = null;
        window.location.reload();
    }

    // takes in entry innput, -> postfetch
    function createFormHandler(e) {
        e.preventDefault()
        const nameInput = document.querySelector('#input-name').value;
        const contentInput = document.querySelector('#input-content').value;
        postFetch(nameInput, contentInput)
    };

    // makes a fetch request to entries, stringifies form data
    function postFetch(name, content) {
        const formData = { name, content }
        fetch('http://localhost:3000/api/v1/journal_entries', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            // establishes new entry object from entry class, renders new entry  from class in entry container
            .then(response => response.json())
            .then(entry => {
                let newEntry = new JournalEntry(entry, entryAttributes);
                document.querySelector('#journal-entries-container').innerHTML += newEntry.renderEntry()
            })
    }

    // defines signup/in form, fetch req to register(users), post req
    const signupForm = document.querySelector('#signup-form');
    const loginForm = document.querySelector('#signup-form');
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault()
        fetch("http://localhost:3000/api/v1/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: document.querySelector("#signup-username").value,
                    password: document.querySelector("#signup-password").value
                }
            })
        })
            //stringifies input, -> logged in user
            .then(res => res.json())
            .then(function (object) {
                if (object.message) {
                    alert(object.message)
                }
                else {
                    loggedInUser(object)

                }
            })
    })

            

        
        // after login, hides signup form, shows entyry form, welcomes user, shows logout button
        //renders current users entries
        function loggedInUser(object) {
            currentUser = object
            signupForm.style.display = 'none'
            createEntryForm.style.display = 'inline'
            welcome.innerHTML = `Welcome, ${currentUser.data.attributes.username}.`;
            logoutButton.style.display = 'inline';
            getEntries();
        };
      
        // fetch to entries, get request, renders entries for current user in container as objects of class
        function getEntries() {
            fetch('http://localhost:3000/api/v1/journal_entries')
                .then(response => response.json())
                .then(entries => {
                    entries.data.forEach(entry => {
                        let newEntry = new JournalEntry(entry, entry.attributes);
                        document.querySelector('#journal-entries-container').innerHTML += newEntry.renderEntry()
                    })
                }
                );
        }
    })
