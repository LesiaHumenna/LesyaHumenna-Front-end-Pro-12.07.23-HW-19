const categ = [
  {
    id: "Outerwear",
    name: "Clothers",
    desk: "",
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
    desk: "",
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
    desk: "",
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

const categoryEl = document.querySelector(".categ");
const categoryListEl = document.querySelector(".categ .category-list");
const productCategoryListEl = document.querySelector(
  ".products .category-products"
);
const btnBuy = document.querySelector(".btn");
const infoSection = document.querySelector(".info");
const orders = document.querySelector(".orders");

let currentCat = {};

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
});
//
productCategoryListEl.addEventListener("click", (e) => {
  const productName = e.target.getAttribute("data-name");
  console.log(productName);
  //
  const filterProd = categ.reduce((acc, curr) => {
    const filteredProducts = curr.products.filter((product) => {
      return product.name === productName;
    });
    return [...acc, ...filteredProducts];
  }, []);
  console.log(filterProd);

  productCategoryListEl.innerHTML = "";
  //
  filterProd.forEach((product) => {
    const li = document.createElement("li");
    li.innerText = `${product.name} - ${product.prise}`;
    const productName = e.target.innerText;
    li.setAttribute("data-name", product.name);
    console.log(productName);
    productCategoryListEl.appendChild(li);
  });
});

btnBuy.addEventListener("click", (e) => {
  const selectedProduct = productCategoryListEl.querySelector("li");
  if (selectedProduct) {
    const productName = selectedProduct.getAttribute("data-name");
    alert(`Вибраний товар: "${productName}".`);
    productCategoryListEl.innerHTML = "";
    categoryListEl.style.display = "block";
    infoSection.style.display = "none";
  } else {
    alert("Оберіть товар!");
  }
});
//forms

const NAME_ERROR = "Please enter a name";
let form = document.getElementById("form");
let table = document.getElementById("myTable");

let nameElement = form.elements["fullName"];

function myTable() {
  let fullName = nameElement.value;
  let city = form.elements["city"].value;
  let post = form.elements["post"].value;
  let pay = form.elements["pay"].value;
  let coment = form.elements["coment"].value;

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

  form.reset();
  table.style.display = "table";
}
//
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
    myTable();
  }
});
//
nameElement.addEventListener("input", (event) => {
  console.log(event.target.value);
  validateName(event.target, NAME_ERROR);
});
//
