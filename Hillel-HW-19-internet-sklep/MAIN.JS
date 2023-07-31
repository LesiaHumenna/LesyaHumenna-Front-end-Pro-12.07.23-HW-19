const categ = [
  {
    id: "Outerwear",
    name: "Clothers",
    products: [
      {
        name: "Jackets",
        prise: "$1,232",
      },
      {
        name: "Coats",
        prise: "$4,574",
      },
      {
        name: "Cape",
        prise: "$3,455",
      },
    ],
  },
  {
    id: "Shoes",
    name: "Boots",
    products: [
      {
        name: "Sneakers",
        prise: "$545",
      },
      {
        name: "Slippers",
        prise: "$334",
      },
      {
        name: "Sandals",
        prise: "$556",
      },
    ],
  },
  {
    id: "Bag",
    name: "Bags",
    products: [
      {
        name: "Valise",
        prise: "$4,000",
      },
      {
        name: "Case",
        prise: "$3,000",
      },
      {
        name: "Wallet",
        prise: "$1,000",
      },
    ],
  },
];
const container = document.querySelector(".container");
const categoryEl = document.querySelector(".categ");
const categoryListEl = document.querySelector(".categ .category-list");
const productCategoryListEl = document.querySelector(
  ".products .category-products"
);
const btnBuy = document.querySelector(".btn");
const infoSection = document.querySelector(".orders-info");
const btnOrders = document.querySelector(".btn-buy");
const ordersListEl = document.querySelector(".orders-info .orders-list");
const ordersEl = document.querySelector(".orders");
const subtitle = document.querySelector('.subtitle');
let currentCat = {};
let currentProd = {};
let orders = [];

function displayOrders() {
  ordersListEl.innerHTML = "";
  if (localStorage.getItem("orders")) {
    orders = JSON.parse(localStorage.getItem("orders"));

    orders.forEach((order, index) => {
      const li = document.createElement("li");
      li.innerText = `Дата: ${order.date}, Ціна: ${order.prise}`;
      li.classList.add("order");
      li.addEventListener("click", () => {
        showOrderDetails(order, index);
      });
      ordersListEl.appendChild(li);
    });
  } else {
    orders = []; 
  }
}
function showOrderDetails(order, index) {
  infoSection.innerHTML = "";

  const detailsEl = document.createElement("div");
  detailsEl.innerHTML = `
    <p>Товар: ${order.name}</p>
    <p>Ціна: ${order.prise}</p>
    <button class="btn-delete" data-index="${index}">Видалити</button>
    <button class= "btn-return" data-index="${index}">Повернутися</button>
  `;
  infoSection.appendChild(detailsEl);
  const btnReturn = document.querySelector('.btn-return');
  btnReturn.addEventListener('click',()=>{
    infoSection.innerHTML = "";
    categoryEl.style.display = "block";
  })
}
////
function handleDeleteClick(event) {
  if (event.target.classList.contains("btn-delete")) {
    const indexToDelete = event.target.getAttribute("data-index");
    deleteOrder(indexToDelete);
  }
}

function deleteOrder(index) {
  let lsOrders = localStorage.getItem("orders");
  if (lsOrders) {
    orders = JSON.parse(lsOrders);
  }

  if (index >= 0 && index < orders.length) {
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    displayOrders(); 
  }
}
infoSection.addEventListener("click", handleDeleteClick);

////
btnOrders.addEventListener("click", () => {
  categoryEl.style.display = "none";
  productCategoryListEl.style.display = "none";
  infoSection.style.display = "block";
  btnBuy.style.display = "none";
  subtitle.style.display = "block";

  displayOrders();
});


infoSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if(confirm("Are you sure you want to delete?")){
      orders = orders.filter((order)=>order.id !== index);
    }
    if (Number.isInteger(index)) {
      orders.splice(index, 1);
      localStorage.setItem("orders", JSON.stringify(orders));
    }
    displayOrders();
  }
});
//
//category-list + li .category-products
function addToList(el, listEl, dataAtr) {
  const li = document.createElement("li");
  li.innerText = el.name;
  li.setAttribute(`data-${dataAtr}`, el[dataAtr]);
  listEl.appendChild(li);
}
//
categ.forEach((el) => {
  console.log(el.name);
  addToList(el, categoryListEl, "id");
});
//
categoryListEl.addEventListener("click", (e) => {
  const categId = e.target.getAttribute("data-id");
  console.log(categId);

  const filterCateg = categ.filter((obj) => {
    return obj.id === categId;
  });
  currentCat = filterCateg[0];
  console.log(currentCat);

  productCategoryListEl.innerHTML = "";
  //
  filterCateg[0].products.forEach((product) => {
    addToList(product, productCategoryListEl, "name");
  });
  btnBuy.style.display = "block";
});
//
productCategoryListEl.addEventListener("click", (e) => {
  const productName = e.target.getAttribute("data-name");
  const productPrise = e.target.getAttribute("data-prise");
  console.log(productName, productPrise);
  if (productName && productPrise) {
    const li = document.createElement("li");
        li.innerText = `${productName} - ${productPrise}`;
        ordersListEl.appendChild(li);
        const orderProduct = {
          name: productName,   
          prise: productPrise,
          date: new Date().toLocaleDateString(),
        };
        let lsOrder = localStorage.getItem("orders");
        let orders = []; 
        if (lsOrder) {
              orders = JSON.parse(lsOrder);
            }
            orders.push(orderProduct); 
        localStorage.setItem("orders", JSON.stringify(orders));
          } 
  const filterProd = categ.reduce((acc, curr) => {
    const filteredProducts = curr.products.filter((product) => {
      return product.name === productName;
    });
    return [...acc, ...filteredProducts];
  }, []);
  console.log(filterProd);

  productCategoryListEl.innerHTML = "";
  if (filterProd.length > 0) {
    currentProd = filterProd[0]; 
    const li = document.createElement("li");
    li.innerText = `${currentProd.name} - ${currentProd.prise}`;
    li.setAttribute("data-name", currentProd.name);
    li.setAttribute("data-prise", currentProd.prise);
    console.log(currentProd.name);
    productCategoryListEl.appendChild(li);
  }
});
//

btnBuy.addEventListener("click", (e) => {
  const selectedProduct = productCategoryListEl.querySelector("li");
  if (selectedProduct) {
    const productName = selectedProduct.getAttribute("data-name");
    const productPrise = selectedProduct.getAttribute("data-prise");
    alert(`Вибраний товар: "${productName}"-"${productPrise}".`);

    productCategoryListEl.innerHTML = "";
    categoryListEl.style.display = "block";
    form.style.display = "block";
    btnOrders.style.display = "block";
    // Створіть об'єкт для товару та його ціни
    const orderProduct = {
      name: productName,
      prise: productPrise,
      date: new Date().toLocaleDateString(),
    };

    let lsOrder = localStorage.getItem("orders");
    let orders = [];
    if (lsOrder) {
      orders = JSON.parse(lsOrder);
    }
    orders.push(orderProduct);
    localStorage.setItem("orders", JSON.stringify(orders));
  } else {
    alert("Оберіть товар!");
  }
});
//forms

const NAME_ERROR = "Please enter a name";
const form = document.getElementById("form");
const table = document.getElementById("myTable");
const ordersBody = document.getElementById("orderBody");
const nameElement = form.elements["fullName"];

function myTable() {
  let fullName = nameElement.value;
  let city = form.elements["city"].value;
  let post = form.elements["post"].value;
  let pay = form.elements["pay"].value;
  let coment = form.elements["coment"].value;

  const order = {
    date: new Date().toLocaleString(),
    product: currentProd,
  };
orders.push(order);
localStorage.setItem("orders", JSON.stringify(orders));

  let newRow = table.insertRow(-1);
  let cells = [
    newRow.insertCell(0),
    newRow.insertCell(1),
    newRow.insertCell(2),
    newRow.insertCell(3),
    newRow.insertCell(4),
  ];
  cells[0].innerHTML = fullName;
  cells[1].innerHTML = city;
  cells[2].innerHTML = post;
  cells[3].innerHTML = pay;
  cells[4].innerHTML = coment;

  let orderRow = ordersBody.insertRow(-1);
  let orderCells = [
    orderRow.insertCell(0),
    orderRow.insertCell(1),
    orderRow.insertCell(2),
    orderRow.insertCell(3),
    orderRow.insertCell(4),
  ];
  orderCells[0].innerHTML = fullName;
  orderCells[1].innerHTML = city;
  orderCells[2].innerHTML = post;
  orderCells[3].innerHTML = pay;
  orderCells[4].innerHTML = coment;

  form.reset();
  table.style.display = "table";
  document.getElementById("orderInfo").style.display = "block";
  document.getElementById("form").style.display = "block";
}
//validation function
function showError(el, message) {
  const errorPlaceholder = el.parentNode.querySelector("small");
  errorPlaceholder.textContent = message;
  el.classList.add("error");
  el.classList.remove("success");
}

function showSuccess(el) {
  const errorPlaceholder = el.parentNode.querySelector("small");
  errorPlaceholder.textContent = "";
  el.classList.add("success");
  el.classList.remove("error");
}
//
function validateName(el, message) {
  const fullName = el.value.trim();
  if (!isNaN(fullName) || typeof fullName !== "string") {
    showError(el, message);
    return false;
  } else {
    showSuccess(el);
    return true;
  }
}
//
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isNameValid = validateName(nameElement, NAME_ERROR);

  if (isNameValid) {
    console.log("Submit");
  }
  myTable();
});
//
nameElement.addEventListener("input", (event) => {
  console.log(event.target.value);
  validateName(event.target, NAME_ERROR);
});
//
