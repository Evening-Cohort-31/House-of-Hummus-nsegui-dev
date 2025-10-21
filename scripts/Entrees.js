import { setEntree } from "./Transientstate.js";

const handleEntreeChoice = (changeEvent) => {
  if (changeEvent.target.id === "entree") {
    const chosenEntreeId = parseInt(changeEvent.target.value);
    setEntree(chosenEntreeId);
  }
};

export const Entrees = async () => {
  document.addEventListener("change", handleEntreeChoice);

  const response = await fetch("http://localhost:8088/entrees");
  const entrees = await response.json();

  let entreeHTML = "";

  const entreeChoices = entrees.map((entree) => {
    return `
    <div class="option-item">
    <input type="radio" id="entree" name="entree" value="${entree.id}" />
    <label for="entree-${entree.id}">
                        ${entree.name} - $${entree.price.toFixed(2)}
                    </label>
    </div>
    `;
  });
  entreeHTML = entreeChoices.join("");

  return entreeHTML;
};
