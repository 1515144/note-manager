function displayNotesOnPage() {
  chrome.storage.local.get({ notes: [] }, (result) => {
    const notesContainer = document.createElement("div");
    notesContainer.style.position = "fixed";
    notesContainer.style.bottom = "10px";
    notesContainer.style.right = "10px";
    notesContainer.style.backgroundColor = "white";
    notesContainer.style.border = "1px solid black";
    notesContainer.style.padding = "10px";
    notesContainer.style.zIndex = "10000";

    const notesTitle = document.createElement("h3");
    notesTitle.textContent = "Notes";
    notesContainer.appendChild(notesTitle);

    const notesList = document.createElement("ul");
    notesContainer.appendChild(notesList);

    result.notes.forEach((note) => {
      const listItem = document.createElement("li");
      listItem.textContent = note;
      notesList.appendChild(listItem);
    });

    document.body.appendChild(notesContainer);
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showNotes") {
    displayNotesOnPage();
  }
});
