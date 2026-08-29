const button = document.querySelector("#cheer");
const count = document.querySelector("#count");
 
let selected = 0;
 
button.addEventListener("click", () => {
  selected = selected + 1;
  count.textContent = selected + " cheers";
});