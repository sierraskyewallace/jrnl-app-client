class JournalEntry
{
    constructor(journalEntry, journalEntryAttributes)
    {
        this.id = journalEntryAttributes.id;
        this.name = journalEntryAttributes.name;
        this.content = journalEntryAttributes.content;
        this.userId = journalEntryAttributes.user_id;
        JournalEntry.all.push(this)
        console.log(this);
    }
}

renderEntry(); {
return `
      <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.content}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
          </div>
        </div>
      </div>
`
}