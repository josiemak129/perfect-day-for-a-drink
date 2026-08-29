const choiceGroups = document.querySelectorAll("[data-choice-group]");

choiceGroups.forEach((group) => {
  const buttons = group.querySelectorAll(".choice-option");
  const status = group.querySelector(".selection-status");
  const clearButton = group.querySelector(".clear-selection");

  let selected = null;

  const updateSelection = () => {
    buttons.forEach((button) => {
      const isSelected = button === selected;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });

    if (status) {
      status.textContent = selected
        ? `1/1 selected: ${selected.dataset.choice}`
        : "0/1 selected";
    }

    if (clearButton) {
      clearButton.disabled = !selected;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      selected = selected === button ? null : button;
      updateSelection();
    });
  });

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      selected = null;
      updateSelection();
    });
  }

  updateSelection();
});
