function init() {
  loadSection("pizza-section", myPizzas);
  loadSection("salad-section", mySalads);
  loadSection("snack-section", mySnacks);
  loadSection("drink-section", myDrinks);
}

function loadSection(sectionId, items) {
  const section = document.getElementById(sectionId);
  section.innerHTML = "";
  items.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "menu-item";
    itemDiv.innerHTML = createMenuItemHTML(item);
    section.appendChild(itemDiv);
  });
}

function createMenuItemHTML(item) {
  return `
    <div class="left-side">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p id="price-tag">Preis: ${item.price.toFixed(2)} €</p>
    </div>
    <div class="right-side">
      <button onclick='addToBasket(${JSON.stringify(item)})'>
        Zum Warenkorb hinzufügen
      </button>
    </div>
  `;
}

function setupOutsideClickClose(btn, basket) {
  basket.addEventListener("click", e => {
    e.stopPropagation();
  });
  document.addEventListener("click", e => {
    if (basket.classList.contains("open") && e.target !== btn) {
      basket.classList.remove("open");
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  init();

  const btn = document.getElementById("basket-toggle");
  const basket = document.querySelector(".basket");

  btn.addEventListener("click", e => {
    e.stopPropagation();
    basket.classList.toggle("open");
  });

  setupOutsideClickClose(btn, basket);
});

