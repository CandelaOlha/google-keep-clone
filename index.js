let notes = [];
const form = document.querySelector("#form");
const noteTitle = document.querySelector("#noteTitle");
const noteText = document.querySelector("#noteText");
const formButtons = document.querySelector("#formButtons");

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
};

document.body.addEventListener("click", (e) => {
  handleFormClick(e);
});

const addNote = (note) => {
  const newNote = {
    title: note.title,
    text: note.text,
    color: "white",
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
  };

  notes.push(newNote);
};

form.onsubmit = (e) => {
  e.preventDefault();
  const title = noteTitle.value;
  const text = noteText.value;
  const hasNote = title || text;
  hasNote && addNote({ title, text });
};
