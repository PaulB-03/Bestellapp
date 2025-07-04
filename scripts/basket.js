let basketContent = [];
let totalPrice = 0.0;
const deliveryCost = 5.99;
let totalPriceWithDelivery = 0.0;

function initBasket() {
  getFromLocalStorage();
  loadFunctions();
  initDeliveryCheckbox();
  displayMobileTotal();
}

function calculateTotalPrice() {
  const deliverySelected = localStorage.getItem("deliverySelected") === "true";

  totalPrice = basketContent.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalPriceWithDelivery = deliverySelected
    ? totalPrice
    : totalPrice + deliveryCost;
}

function getFromLocalStorage() {
  const basket = localStorage.getItem("basketContent");
  if (basket) {
    basketContent = JSON.parse(basket).map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
  } else {
    basketContent = [];
  }
}

function saveToLocalStorage() {
  localStorage.setItem("basketContent", JSON.stringify(basketContent));
}

function addToBasket(item) {
  const existingItem = basketContent.find((b) => b.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    basketContent.push({ ...item, quantity: 1 });
  }
  saveToLocalStorage();
  loadFunctions();
}

function removeFromBasket(index) {
  basketContent.splice(index, 1);
  saveToLocalStorage();
  loadFunctions();
}

function displayBasket() {
  const basketSection = document.getElementById("basket-content");
  basketSection.innerHTML =
    basketContent.length === 0
      ? createEmptyBasketHTML()
      : basketContent.map((item, i) => createBasketItemHTML(item, i)).join("");
}

function createEmptyBasketHTML() {
  return `<p class='self-center'>Ihr Warenkorb ist leer.</p>`;
}

function createBasketItemHTML(item, index) {
  return `
    <div class="basket-item">
      <div>
        <h3>${item.name}</h3>
        <p id="price-tag">Einzelpreis: ${item.price.toFixed(2)} €</p>
        <p id="price-tag">Gesamt: ${(item.price * item.quantity).toFixed(
          2
        )} €</p>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${index})">−</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>
      </div>
      <div>
        <button class="remove-button" onclick="removeFromBasket(${index})">Entfernen</button>
      </div>
    </div>
  `;
}

function displayTotalPrice() {
  const totalDiv = document.getElementById("basket-total");
  totalDiv.innerHTML = createTotalPriceHTML();
}

function displayMobileTotal() {
  const el = document.getElementById("basket-mobile-total");
  if (!el) return;

  if (basketContent.length === 0) {
    el.style.display = "none";
  } else {
    el.textContent = totalPriceWithDelivery.toFixed(2) + " €";
    el.style.display = "block";
  }
}

function createTotalPriceHTML() {
  const deliverySelected = localStorage.getItem("deliverySelected") === "true";
  const deliveryText = deliverySelected
    ? `<s>Lieferkosten: ${deliveryCost.toFixed(2)} €</s>`
    : `Lieferkosten: ${deliveryCost.toFixed(2)} €`;

  return `
    <h3>Preis: ${totalPrice.toFixed(2)} €</h3>
    <h3>${deliveryText}</h3>
    <h3>Gesamtpreis: ${totalPriceWithDelivery.toFixed(2)} €</h3>
  `;
}

function increaseQuantity(index) {
  basketContent[index].quantity += 1;
  saveToLocalStorage();
  loadFunctions();
}

function decreaseQuantity(index) {
  basketContent[index].quantity -= 1;
  if (basketContent[index].quantity === 0) {
    basketContent.splice(index, 1);
  }
  saveToLocalStorage();
  loadFunctions();
}

function initDeliveryCheckbox() {
  const deliveryCheckbox = document.getElementById("delivery");
  const saved = localStorage.getItem("deliverySelected") === "true";
  deliveryCheckbox.checked = saved;
  deliveryCheckbox.addEventListener("change", () => {
    localStorage.setItem("deliverySelected", deliveryCheckbox.checked);
    loadFunctions();
  });
}

function loadFunctions() {
  calculateTotalPrice();
  displayBasket();
  displayTotalPrice();
  displayMobileTotal();
}

function handleEmptyOrder(orderSection) {
  orderSection.innerHTML = createEmptyBasketHTML();
  orderSection.classList.add("error-message");
  setTimeout(() => {
    orderSection.classList.remove("error-message");
    orderSection.innerHTML = createEmptyBasketHTML();
  }, 3000);
}

function order() {
  const orderSection = document.getElementById("order-confirmation");

  if (basketContent.length === 0) {
    handleEmptyOrder(orderSection);
    return;
  }

  const orderDetails = {
    items: basketContent,
    totalPrice: totalPriceWithDelivery,
    deliverySelected: localStorage.getItem("deliverySelected") === "true",
  };

  orderSection.style.display = "block";
  orderSection.innerHTML = createOrderConfirmationHTML(orderDetails);
  orderSection.classList.add("order-confirmation");
  setTimeout(() => {
    orderSection.classList.remove("order-confirmation");
    orderSection.innerHTML = "";
  }, 5000);

  clearBasket();
}

function createOrderConfirmationHTML({ items, totalPrice, deliverySelected }) {
  const mode = deliverySelected ? "Lieferung" : "Abholung";
  const listItems = items
    .map(
      (i) =>
        `<li>${i.name} - ${i.quantity} Stück - ${(i.price * i.quantity).toFixed(
          2
        )} €</li>`
    )
    .join("");

  return `
    <h2>Bestellbestätigung</h2>
    <p>Vielen Dank für Ihre Bestellung!</p>
    <p>Gesamtpreis: ${totalPrice.toFixed(2)} €</p>
    <p>Lieferoption: ${mode}</p>
    <h3>Bestellte Artikel:</h3>
    <ul>${listItems}</ul>
  `;
}

function clearBasket() {
  basketContent = [];
  localStorage.removeItem("basketContent");
  localStorage.removeItem("deliverySelected");
  loadFunctions();
  initDeliveryCheckbox();
}

document.addEventListener("DOMContentLoaded", initBasket);
