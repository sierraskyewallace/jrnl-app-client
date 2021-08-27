

document.addEventListener('DOMContentLoaded', () => {
    getEntries()
    const loginForm = document.querySelector('#username-form-container')
    loginForm.addEventListener('submit', (e) => {
        loginFormHandler(e)
    })
    const createEntryForm = document.querySelector('#journal-entry-form-container');
    createEntryForm.addEventListener("submit", (event) => {
        createFormHandler(event)
    });

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
            


    

        // function that signs a user in by username then renders their entries
}});

