const saveNotesInLocalStorage = () =>
  localStorage.setItem("notes", JSON.stringify(notes));

const getNotesFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("notes"));

let notes = getNotesFromLocalStorage() || [];
let title = "";
let text = "";
let id = "";

const form = document.querySelector("#form");
const noteTitle = document.querySelector("#noteTitle");
const noteText = document.querySelector("#noteText");
const formButtons = document.querySelector("#formButtons");
const placeholder = document.querySelector("#placeholder");
const notesContainer = document.querySelector("#notes");
const formCloseButton = document.querySelector("#formCloseButton");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalText = document.querySelector(".modal-text");
const modalCloseButton = document.querySelector(".modal-close-button");
const colorTooltip = document.querySelector("#colorTooltip");

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

const selectNote = (e) => {
  const selectedNote = e.target.closest(".note"); // Getting a specific note
  if (!selectedNote) return;
  const [noteTitle, noteText] = selectedNote.children;
  title = noteTitle.innerText;
  text = noteText.innerText;
  id = selectedNote.dataset.id; // Getting the ID of that specific note
};

const openModal = (e) => {
  if (e.target.matches(".toolbar-delete")) return;

  if (e.target.closest(".note")) {
    modal.classList.add("open-modal");
    modalTitle.value = title;
    modalText.value = text;
  }
};

const closeModal = () => {
  editNote();
  modal.classList.remove("open-modal");
};

document.body.addEventListener("click", (e) => {
  handleFormClick(e);
  selectNote(e);
  openModal(e);
  deleteNote(e);
});

formCloseButton.addEventListener("click", (e) => {
  e.stopPropagation(); // stopPropagation() prevents all click events on the parent from being triggered
  closeForm();
});

modalCloseButton.addEventListener("click", (e) => {
  closeModal();
});

const openTooltip = (e) => {
  if (!e.target.matches(".toolbar-color")) return;
  id = e.target.dataset.id;
  const noteCoords = e.target.getBoundingClientRect();
  const horizontal = noteCoords.left;
  const vertical = window.scrollY - 20;
  colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
  colorTooltip.style.display = "flex";
};

const closeTooltip = (e) => {
  if (!e.target.matches(".toolbar-color")) return;
  colorTooltip.style.display = "none";
};

document.body.addEventListener("mouseover", (e) => {
  openTooltip(e);
});

document.body.addEventListener("mouseout", (e) => {
  closeTooltip(e);
});

colorTooltip.addEventListener("mouseover", () => {
  colorTooltip.style.display = "flex";
});

colorTooltip.addEventListener("mouseout", () => {
  colorTooltip.style.display = "none";
});

colorTooltip.addEventListener("click", (e) => {
  const color = e.target.dataset.color;
  if (color) {
    editNoteColor(color);
  }
});

const displayNotes = () => {
  const hasNotes = notes.length > 0;
  placeholder.style.display = hasNotes ? "none" : "flex";

  const displayedNotes = notes.reduce((acc, curr) => {
    return (
      acc +
      `
    <div style="background: ${curr.color};" class="note" data-id="${curr.id}">
    <h2 class="${curr.title && "note-title"}">${curr.title}</h2>
    <p class="note-text">${curr.text}</p>
    <div class="toolbar-container">
      <div class="toolbar">
        <img class="toolbar-color" data-id=${
          curr.id
        } src="https://icon.now.sh/palette">
        <img class="toolbar-delete" data-id="${
          curr.id
        }" src="https://icon.now.sh/delete">
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

  saveNotesInLocalStorage();
  displayNotes();
};

const editNote = () => {
  const title = modalTitle.value;
  const text = modalText.value;

  notes = notes.map((note) => {
    if (note.id === Number(id)) {
      return { ...note, title, text };
    } else {
      return note;
    }
  });

  saveNotesInLocalStorage();
  displayNotes();
};

const editNoteColor = (color) => {
  notes = notes.map((note) => {
    if (note.id === Number(id)) {
      return { ...note, color };
    } else {
      return note;
    }
  });

  saveNotesInLocalStorage();
  displayNotes();
};

const deleteNote = (e) => {
  e.stopPropagation();
  if (!e.target.matches(".toolbar-delete")) return;

  const id = e.target.dataset.id;
  notes = notes.filter((note) => note.id !== Number(id));
  saveNotesInLocalStorage();
  displayNotes();
};

form.onsubmit = (e) => {
  e.preventDefault();
  const title = noteTitle.value;
  const text = noteText.value;
  const hasNote = title || text;
  hasNote && addNote({ title, text });
};

displayNotes();
