

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
      
        <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        ${this.name}
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p>${this.content}</p>
      </div>
  </div>
</div>
</div>
    `;
    }
}

JournalEntry.all = [];
