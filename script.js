const buttons = document.querySelectorAll(".base-option");
const count = document.querySelector("#count");

let selected = null;

const updateSelection = () => {
  buttons.forEach((button) => {
    const isSelected = button === selected;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  count.textContent = selected
    ? `1/1 selected: ${selected.dataset.base}`
    : "0/1 selected";
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    selected = button;
    updateSelection();
  });
});

updateSelection();