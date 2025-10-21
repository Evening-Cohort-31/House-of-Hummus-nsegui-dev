import { FoodTruck } from "./FoodTruck.js";

const mainContainer = document.querySelector("#container");

const renderAllHTML = async () => {
  const foodTruckHTML = await FoodTruck();
  mainContainer.innerHTML = foodTruckHTML;
};

renderAllHTML();

document.addEventListener("purchaseComplete", () => {
  renderAllHTML();
});
