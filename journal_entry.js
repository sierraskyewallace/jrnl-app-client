

class JournalEntry {
    constructor(entry, entryAttributes) {
        this.id = entryAttributes.id;
        this.name = entryAttributes.name;
        this.content = entryAttributes.content;
        this.user_id = entryAttributes.user_id;
        JournalEntry.all.push(this)
        console.log(this);
    }


renderEntry() {
        return `
      
  <div class="card w-75">
  <div class="card-body pull-left">
    <h5 class="card-title"style="pull-left">${this.name}</h5>
    <p> ${this.content} </p>
   <button class="btn btn-danger" id="delete-entry-button"data-id="${this.id}">Delete</button>
  </div>
</div>
    `;
    }
}

JournalEntry.all = [];
