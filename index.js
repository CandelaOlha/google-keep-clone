const form = document.querySelector("#form");
const noteTitle = document.querySelector("#noteTitle");
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
