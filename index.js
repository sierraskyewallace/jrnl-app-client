// establishes current user if logged in
let currentUser




document.addEventListener('DOMContentLoaded', () => {

    const logInForm = document.querySelector('#login-form').style.display = 'none';
    const signUpForm = document.querySelector('#signup-form').style.display = 'none';
    
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

    // button that toggles sign up form
    const signUpButton = document.getElementById('signup-button');
    signUpButton.addEventListener('click', (e) => {
        e.preventDefault()
        signUpFormSubmit.style.display = 'block';
        logInFormSubmit.style.display = 'none';
    });

    // button that toggles log in form
    const logInButton = document.getElementById('login-button');
    logInButton.addEventListener('click', (e) => {
        e.preventDefault()
        logInFormSubmit.style.display = 'block';
        signUpFormSubmit.style.display = 'none';
    });

    // sign up form submit, -> post fetch
    const signUpFormSubmit = document.querySelector('#signup-form');
    signUpFormSubmit.addEventListener('submit', (e) => {
        e.preventDefault()
        const usernameInput = document.querySelector('#signup-username').value;
        const passwordInput = document.querySelector('#signup-password').value;
        postFetchSignUp(usernameInput, passwordInput)
    });

    // post fetch for sign up
    function postFetchSignUp(username, password) {
        const formData = { username, password }
        fetch('http://localhost:3000/api/v1/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            // if successful, sets current user to new user, reloads page
            .then(response => response.json())
            .then(user => {
                loggedInUser(user);
            })
    }

    // log in form submit, -> post fetch
    const logInFormSubmit = document.querySelector('#login-form');
    logInFormSubmit.addEventListener('submit', (e) => {
        e.preventDefault()
        const usernameInput = document.querySelector('#login-username').value;
        const passwordInput = document.querySelector('#login-password').value;
        postFetchLogIn(usernameInput, passwordInput)
    });

    // post fetch for log in
    function postFetchLogIn(username, password) {
        const formData = { username, password }
        fetch('http://localhost:3000/api/v1/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        // if successful, sets current user to new user, reloads page
            .then(response => response.json())
            .then(user => {
                loggedInUser(user);
            })
    }

        
            const userSystem = document.querySelector('#user-system');

        
        // after login, hides signup form, shows entyry form, welcomes user, shows logout button
        //renders current users entries
        function loggedInUser(user) {
            currentUser = user;
            createEntryForm.style.display = 'inline'
            welcome.innerHTML = `Welcome, ${currentUser.data.attributes.username}.`;
            logoutButton.style.display = 'inline';
            userSystem.style.display = 'none';
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
