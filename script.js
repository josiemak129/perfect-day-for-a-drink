const choiceGroups = document.querySelectorAll("[data-choice-group]");

const initializeChoiceGroup = (group) => {
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
      const selectedLabel = selected?.dataset.choice || selected?.textContent.trim() || "";
      status.textContent = selected ? `1/1 selected: ${selectedLabel}` : "0/1 selected";
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
};

choiceGroups.forEach(initializeChoiceGroup);

const placeOrderButton = document.querySelector("#place-order");
const orderCount = document.querySelector("#order-count");

if (placeOrderButton && orderCount) {
  let orderTotal = 0;

  placeOrderButton.addEventListener("click", () => {
    orderTotal += 1;
    orderCount.textContent = `${orderTotal} order${orderTotal === 1 ? "" : "s"}`;
  });
}
