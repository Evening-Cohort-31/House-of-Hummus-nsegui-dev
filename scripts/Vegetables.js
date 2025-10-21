import { setVegetable } from "./Transientstate.js";

const handleVegetableChoice = (changeEvent) => {
  if (changeEvent.target.id === "vegetable") {
    const chosenVegetableId = parseInt(changeEvent.target.value);
    setVegetable(chosenVegetableId);
  }
};

export const Vegetables = async () => {
  document.addEventListener("change", handleVegetableChoice);

  const response = await fetch("http://localhost:8088/vegetables");
  const vegetables = await response.json();

  let vegetablesHTML = "";

  const vegetableChoices = vegetables.map((vegetable) => {
    return `
    <div class="option-item">
    <input type="radio" id="vegetable" name="Vegetable" value="${
      vegetable.id
    }" />
    <label for="vegetable-${vegetable.id}">
                        ${vegetable.type} - $${vegetable.price.toFixed(2)}
                    </label>
    </div>
    `;
  });
  vegetablesHTML = vegetableChoices.join("");

  return vegetablesHTML;
};
