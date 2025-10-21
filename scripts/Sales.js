export const Sales = async () => {
  try {
    const response = await fetch(
      "http://localhost:8088/sales?_expand=entree&_expand=vegetable&_expand=side"
    );
    const sales = await response.json();

    console.log("Sales fetched:", sales);

    if (sales.length === 0) {
      return `<p class="no-sales">No sales yet. Create your first combo!</p>`;
    }

    const receipts = sales.map((sale) => {
      const cost = sale.totalCost ?? 0;

      const formattedCost = cost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      return `<div class="receipt">Receipt #${sale.id} = ${formattedCost}</div>`;
    });

    return `<div class="sales-list">${receipts.join("")}</div>`;
  } catch (error) {
    console.error("Error fetching sales:", error);
    return `<p class="error">Error loading sales.</p>`;
  }
};
