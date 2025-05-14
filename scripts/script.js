function init() {
  loadPizzaSection();
  loadSaladSection();
  loadSnackSection();
  loadDrinkSection();
}

function loadPizzaSection() {
  let pizzaSection = document.getElementById("pizza-section");
  pizzaSection.innerHTML = "";

  for (let i = 0; i < myPizzas.length; i++) {
    let pizza = myPizzas[i];
    let pizzaDiv = document.createElement("div");
    pizzaDiv.className = "menu-item";
    pizzaDiv.innerHTML = `<div class="left-side"><h3>${pizza.name}</h3><p>${
      pizza.description
    }</p><p id="price-tag">Preis: ${pizza.price.toFixed(
      2
    )} €</p></div><div class="right-side"><button onclick='addToBasket(${JSON.stringify(
      pizza
    )})'>Zum Warenkorb hinzufügen</button>
</div>`;
    pizzaSection.appendChild(pizzaDiv);
  }
}

function loadSaladSection() {
  let saladSection = document.getElementById("salad-section");
  saladSection.innerHTML = "";

  for (let i = 0; i < mySalads.length; i++) {
    let salad = mySalads[i];
    let saladDiv = document.createElement("div");
    saladDiv.className = "menu-item";
    saladDiv.innerHTML = `<div class="left-side"><h3>${salad.name}</h3>
    <p>${salad.description}</p>
    <p id="price-tag">Preis: ${salad.price.toFixed(2)} €</p></div>
    <div class="right-side"><button onclick='addToBasket(${JSON.stringify(salad)})'>Zum Warenkorb hinzufügen</button></div>`;
    saladSection.appendChild(saladDiv);
  }
}

function loadSnackSection() {
  let snackSection = document.getElementById("snack-section");
  snackSection.innerHTML = "";

  for (let i = 0; i < mySnacks.length; i++) {
    let snack = mySnacks[i];
    let snackDiv = document.createElement("div");
    snackDiv.className = "menu-item";
    snackDiv.innerHTML = `<div class="left-side"><h3>${snack.name}</h3>
    <p>${snack.description}</p>
    <p id="price-tag">Preis: ${snack.price.toFixed(2)} €</p></div>
    <div class="right-side"><button onclick='addToBasket(${JSON.stringify(snack)})'>Zum Warenkorb hinzufügen</button></div>`;
    snackSection.appendChild(snackDiv);
  }
}

function loadDrinkSection() {
  let drinkSection = document.getElementById("drink-section");
  drinkSection.innerHTML = "";

  for (let i = 0; i < myDrinks.length; i++) {
    let drink = myDrinks[i];
    let drinkDiv = document.createElement("div");
    drinkDiv.className = "menu-item";
    drinkDiv.innerHTML = `<div class="left-side"><h3>${drink.name}</h3>
    <p>${drink.description}</p>
    <p id="price-tag">Preis: ${drink.price.toFixed(2)} €</p></div>
    <div class="right-side"><button onclick='addToBasket(${JSON.stringify(drink)})'>Zum Warenkorb hinzufügen</button></div>`;
    drinkSection.appendChild(drinkDiv);
  }
}
