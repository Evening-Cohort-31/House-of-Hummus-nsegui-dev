import { Sales } from "./Sales.js";
import { Entrees } from "./Entrees.js";
import { Vegetables } from "./Vegetables.js";
import { Sides } from "./SideDishes.js";
import { purchaseCombo } from "./Transientstate.js";

let purchaseListenerAdded = false;

const handlePurchaseClick = async (clickEvent) => {
  if (clickEvent.target.id === "purchase") {
    await purchaseCombo();
  }
};

export const FoodTruck = async () => {
  const salesHTML = await Sales();
  const entreeHTML = await Entrees();
  const vegetablesHTML = await Vegetables();
  const sidesHTML = await Sides();

  if (!purchaseListenerAdded) {
    document.addEventListener("click", handlePurchaseClick);
    purchaseListenerAdded = true;
  }

  return `
        <header class="header">
            <img src="./images/hummus.png" class="logo" />
            <h1 class="title">Laura Kathryn's House of Hummus</h1>
        </header>

        <article class="selector-section">
            <section class="column">
                <h2>Select an Entree</h2>
                ${entreeHTML}
            </section>
            
            <section class="column">
                <h2>Select a Vegetable</h2>
                ${vegetablesHTML}
            </section>
            
            <section class="column">
                <h2>Select a Side Dish</h2>
                ${sidesHTML}
            </section>
        </article>

        <article>
            <button id="purchase">Purchase Combo</button>
        </article>

        <article class="customerOrders">
            <h2>Monthly Sales</h2>
            ${salesHTML}
        </article>

    `;
};
