let notes = [];
const form = document.querySelector("#form");
const noteTitle = document.querySelector("#noteTitle");
const noteText = document.querySelector("#noteText");
const formButtons = document.querySelector("#formButtons");
const placeholder = document.querySelector("#placeholder");
const notesContainer = document.querySelector("#notes");
const formCloseButton = document.querySelector("#formCloseButton");

const handleFormClick = (e) => {
  const isFormClicked = form.contains(e.target);
  isFormClicked ? openForm() : closeForm();
};

const openForm = () => {
  form.classList.add("form-open");
  noteTitle.classList.remove("hidden");
  formButtons.classList.remove("hidden");
};

const closeForm = () => {
  form.classList.remove("form-open");
  noteTitle.classList.add("hidden");
  formButtons.classList.add("hidden");

  noteTitle.value = "";
  noteText.value = "";
};

document.body.addEventListener("click", (e) => {
  handleFormClick(e);
});

formCloseButton.addEventListener("click", (e) => {
  e.stopPropagation(); // stopPropagation() prevents all click events on the parent from being triggered
  closeForm();
});

const displayNotes = () => {
  const hasNotes = notes.length > 0;
  placeholder.style.display = hasNotes ? "none" : "flex";

  const displayedNotes = notes.reduce((acc, curr) => {
    return (
      acc +
      `
    <div style="background: ${curr.color};" class="note">
    <h2 class="${curr.title && "note-title"}">${curr.title}</h2>
    <p class="note-text">${curr.text}</p>
    <div class="toolbar-container">
      <div class="toolbar">
        <img class="toolbar-color" src="https://icon.now.sh/palette">
        <img class="toolbar-delete" src="https://icon.now.sh/delete">
      </div>
    </div>
  </div>
    `
    );
  }, "");

  notesContainer.innerHTML = displayedNotes;

  closeForm();
};

const addNote = (note) => {
  const newNote = {
    title: note.title,
    text: note.text,
    color: "white",
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
  };

  notes.push(newNote);

  displayNotes();
};

form.onsubmit = (e) => {
  e.preventDefault();
  const title = noteTitle.value;
  const text = noteText.value;
  const hasNote = title || text;
  hasNote && addNote({ title, text });
};
