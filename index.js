


document.addEventListener('DOMContentLoaded', () => {
    
    const signInButton = document.getElementById('sign-in-button');
    
    signInButton.addEventListener('click', (event) => {
        signInFormHandler(event);
    });

    const signUpButton = document.getElementById('sign-up-button');
    signUpButton.addEventListener('click', (event) => {
        signUpFormHandler(event);
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
        e.preventDefault()
        localStorage.clear();
        window.location.href = "index.html";
    }
    //function that gets the entries from the api and renders them
    function getEntries() {
        fetch(`http://localhost:3000/api/v1/users/${this.id}/journal_entries`)
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
        const formData = { name, content }

        fetch('http://localhost:3000/spi/v1/journal_entries', {
            // POST request
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
    

    ;
}
)