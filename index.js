

document.addEventListener('DOMContentLoaded', () => {
    getEntries();
});
;

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

    //function that adds a new entry to the api
   

    // function that signs a user in by username then renders their entries
    