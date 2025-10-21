const transientState = {
  entreeId: 0,
  vegetableId: 0,
  sideId: 0,
};

export const setEntree = (entreeId) => {
  transientState.entreeId = entreeId;
  console.log("Transient state updated:", transientState);
};

export const setVegetable = (vegetableId) => {
  transientState.vegetableId = vegetableId;
  console.log("Transient state updated:", transientState);
};

export const setSide = (sideId) => {
  transientState.sideId = sideId;
  console.log("Transient state updated", transientState);
};

export const getTransientState = () => {
  return structuredClone(transientState);
};

export const clearTransientState = () => {
  transientState.entreeId = 0;
  transientState.vegetableId = 0;
  transientState.sideId = 0;
};

export const purchaseCombo = async () => {
  const state = getTransientState();

  if (state.entreeId === 0 || state.vegetableId === 0 || state.sideId === 0) {
    window.alert("Please select a dish, vegetable, and side dish.");
    return;
  }

  try {
    const [entreeRes, vegRes, sideRes] = await Promise.all([
      fetch(`http://localhost:8088/entrees/${state.entreeId}`),
      fetch(`http://localhost:8088/vegetables/${state.vegetableId}`),
      fetch(`http://localhost:8088/sides/${state.sideId}`),
    ]);

    const entree = await entreeRes.json();
    const vegetable = await vegRes.json();
    const side = await sideRes.json();

    const totalCost = entree.price + vegetable.price + side.price;

    const saleData = {
      entreeId: state.entreeId,
      vegetableId: state.vegetableId,
      sideId: state.sideId,
      totalCost: totalCost,
      timestamp: Date.now(),
    };

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saleData),
    };

    const response = await fetch("http://localhost:8088/sales", postOptions);
    const newSale = await response.json();

    console.log("Purchase successful:", newSale);

    clearTransientState();

    document.dispatchEvent(new CustomEvent("purchaseComplete"));
    window.alert("Purchase successful!");
  } catch (error) {
    console.error("Purchase failed:", error);
    window.alert("Purchase failed. Please try again.");
  }
};
