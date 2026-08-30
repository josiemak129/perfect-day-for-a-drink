
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
            const selectedLabel =
                selected?.dataset.choice ||
                selected?.textContent.trim() ||
                "";

            status.textContent = selected
                ? `1/1 selected: ${selectedLabel}`
                : "0/1 selected";
        }

        if (clearButton) {
            clearButton.disabled = !selected;
        }
    };

    buttons.forEach((button) => {
        button.setAttribute("aria-pressed", "false");

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


/* Start all choice sections */
choiceGroups.forEach(initializeChoiceGroup);


/* Place Order */
const placeOrderButton = document.querySelector("#place-order");
const orderCount = document.querySelector("#order-count");

let orderTotal = 0;

if (placeOrderButton && orderCount) {

    placeOrderButton.addEventListener("click", () => {

        const selections = {};

        choiceGroups.forEach((group) => {
            const groupName = group.dataset.choiceGroup;
            const selectedButton = group.querySelector(".choice-option.selected");

            selections[groupName] = selectedButton
                ? selectedButton.dataset.choice
                : null;
        });


        /* Check if everything has been selected */
        const missingChoices = Object.entries(selections)
            .filter(([_, value]) => !value)
            .map(([group]) => group);


        if (missingChoices.length > 0) {
            alert("Please finish choosing your drink before placing your order!");
            return;
        }


        /* Add to order count */
        orderTotal += 1;

        orderCount.textContent =
            `${orderTotal} order${orderTotal === 1 ? "" : "s"}`;


        /* Create the order summary */
        const summary = `
Your drink is ready! 🥤

Base: ${selections["drink-base"]}
Add-in: ${selections["add-ins"]}
Ice: ${selections["ice"]}
Sweetness: ${selections["sweetness"]}
Dietary restriction: ${selections["diet"]}
        `;

        alert(summary);
    });
}

