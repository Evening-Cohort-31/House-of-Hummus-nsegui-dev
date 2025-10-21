import { setSide } from "./Transientstate.js";

const handleSideChoice = (changeEvent) => {
  if (changeEvent.target.id === "side") {
    const chosenSideId = parseInt(changeEvent.target.value);
    setSide(chosenSideId);
  }
};

export const Sides = async () => {
  document.addEventListener("change", handleSideChoice);

  const response = await fetch("http://localhost:8088/sides");
  const sides = await response.json();

  let sidesHTML = "";

  const sidesChoices = sides.map((side) => {
    return `
    <div class="option-item">
    <input type="radio" id="side" name="Side" value="${side.id}" />
    <label for="side-${side.id}">
                        ${side.title} - $${side.price.toFixed(2)}
                    </label>
    </div>
    `;
  });
  sidesHTML = sidesChoices.join("");

  return sidesHTML;
};
