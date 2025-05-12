let basketContent = [];
let totalPrice = 0.0;
const deliveryCost = 5.99;
let totalPriceWithDelivery = 0.0;

function initBasket() {
  getFromLocalStorage();
  calculateTotalPrice();
  displayBasket();
  displayTotalPrice();
  initDeliveryCheckbox();
}

function calculateTotalPrice() {
  const deliverySelected = localStorage.getItem("deliverySelected") === "true";

  totalPrice = 0.0;
  for (let item of basketContent) {
    totalPrice += item.price * item.quantity;
  }
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
    item.quantity = 1;
    basketContent.push(item);
  }
  saveToLocalStorage();
  calculateTotalPrice();
  displayBasket();
  displayTotalPrice();
}

function removeFromBasket(index) {
  basketContent.splice(index, 1);
  saveToLocalStorage();
  calculateTotalPrice();
  displayBasket();
  displayTotalPrice();
}

function displayBasket() {
  let basketSection = document.getElementById("basket-content");
  basketSection.innerHTML = "";

  if (basketContent.length === 0) {
    basketSection.innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
    return;
  }

  for (let i = 0; i < basketContent.length; i++) {
    let item = basketContent[i];
    let itemDiv = document.createElement("div");
    itemDiv.className = "basket-item";

    itemDiv.innerHTML = `<div><h3>${
      item.name
    }</h3><p id="price-tag">Einzelreis: ${item.price.toFixed(
      2
    )} €</p><p id="price-tag">Gesamt: ${(item.price * item.quantity).toFixed(
      2
    )} €</p>
    <div class="quantity-controls">
          <button onclick='decreaseQuantity(${i})'>−</button>
          <span>${item.quantity}</span>
          <button onclick='increaseQuantity(${i})'>+</button>
        </div></div><div><button class="remove-button" onclick='removeFromBasket(${i})'>Entfernen</button></div>`;
    basketSection.appendChild(itemDiv);
  }
}

function displayTotalPrice() {
  let totalPriceDiv = document.getElementById("basket-total");
  const deliverySelected = localStorage.getItem("deliverySelected") === "true";

  const deliveryText = deliverySelected
    ? `<s>Lieferkosten: ${deliveryCost.toFixed(2)} €</s>`
    : `Lieferkosten: ${deliveryCost.toFixed(2)} €`;

  totalPriceDiv.innerHTML = `
  <h3>Preis: ${totalPrice.toFixed(2)} €</h3>
  <h3>${deliveryText}</h3>
  <h3>Gesamtpreis: ${totalPriceWithDelivery.toFixed(2)} €</h3>`;
}

function increaseQuantity(index) {
  basketContent[index].quantity += 1;
  saveToLocalStorage();
  calculateTotalPrice();
  displayBasket();
  displayTotalPrice();
}

function decreaseQuantity(index) {
  basketContent[index].quantity -= 1;
  if (basketContent[index].quantity === 0) {
    basketContent.splice(index, 1);
  }
  saveToLocalStorage();
  calculateTotalPrice();
  displayBasket();
  displayTotalPrice();
}

function initDeliveryCheckbox() {
  const deliveryCheckbox = document.getElementById("delivery");
  const savedDelivery = localStorage.getItem("deliverySelected") === "true";
  deliveryCheckbox.checked = savedDelivery;

  deliveryCheckbox.addEventListener("change", () => {
    localStorage.setItem("deliverySelected", deliveryCheckbox.checked);
    calculateTotalPrice();
    displayTotalPrice();
  });
}
