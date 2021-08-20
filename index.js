const endPoint = "http://localhost:3000/api/v1/users"

document.addEventListener('DOMContentLoaded', () => {
    getEntries();
});

function getEntries() {
    fetch(endPoint)
        .then(response => response.json())
        .then(journalEntries => {
            journalEntries.data.forEach(entry => {
                const journalEntriesMarkup =
                    `<div class="journal-entry">
                    <div data-id=${entry.attributes.id}>
                        <h3>${entry.attributes.name}</h3>
                        <h4>${entry.attributes.created_at}</h4>
                        <p>${entry.attributes.content}</p>
                    </div>
                <br><br>`;
                document.querySelector('#journal-entries-container').innerhtml += journalEntriesMarkup;
            });
        });
}
