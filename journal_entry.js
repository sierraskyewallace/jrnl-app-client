
//establishes entry as class and defines attributes
class JournalEntry {
  constructor(entry, entryAttributes) {
    this.id = entryAttributes.id;
    this.name = entryAttributes.name;
    this.content = entryAttributes.content;
    this.user_id = entryAttributes.user_id;
    JournalEntry.all.push(this)
    console.log(this);
  }

// renders entry as a card
  renderEntry() {
    return `
  <div data-id="${this.id}" class="entry">
  <div class="card">
  <h5> ${this.name} </h5>
  <p> ${this.content} </p>
  </div>
  </div>
  <br><br>


  `
  }
}

//holds entries as an array of cards
JournalEntry.all = [];
