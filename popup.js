document.getElementById("addNoteButton").addEventListener("click", () => {
  const noteText = document.getElementById("noteText").value;
  if (noteText) {
    chrome.storage.local.get({ notes: [] }, (result) => {
      const notes = result.notes;
      notes.push(noteText);
      chrome.storage.local.set({ notes }, () => {
        document.getElementById("noteText").value = "";
        displayNotes();
      });
    });
  }
});

function displayNotes() {
  chrome.storage.local.get({ notes: [] }, (result) => {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";
    result.notes.forEach((note, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = note;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteNote(index);
      });

      listItem.appendChild(deleteButton);
      notesList.appendChild(listItem);
    });
  });
}

function deleteNote(index) {
  chrome.storage.local.get({ notes: [] }, (result) => {
    const notes = result.notes;
    notes.splice(index, 1);
    chrome.storage.local.set({ notes }, () => {
      displayNotes();
    });
  });
}

document.addEventListener("DOMContentLoaded", displayNotes);

document.getElementById("randomEmojiButton").addEventListener("click", () => {
  getRandomEmoji();
});

function getRandomEmoji() {
  const apiUrl =
    "https://emoji-api.com/emojis?access_key=9084ea93f660d9257bffdb453f747d63e5de1d56"; // 使用你的 API 密钥

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const emoji = data[randomIndex].character;
        const noteText = document.getElementById("noteText");
        noteText.value += emoji;
      }
    })
    .catch((error) => {
      console.error("Error fetching emoji:", error);
      alert("Error fetching emoji: " + error.message); // 显示错误消息
    });
}
