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
const productCategoryListEl = document.querySelector(".products .category-products");
const btnBuy = document.querySelector(".btn");
const infoSection = document.querySelector(".info");
const orders = document.querySelector(".orders");

let currentCat = {};


//до .category-list + li .category-products
function addToList(el, listEl, dataAtr) {
    const li = document.createElement("li");
    li.innerText = el.name;
    li.setAttribute(`data-${dataAtr}`, el[dataAtr]);
    listEl.appendChild(li);

}


//пройшлися по categ.Вивели name + до addToList:el, .category-list, id
categ.forEach((el) => {
    console.log(el.name);
    addToList(el, categoryListEl, "id");
});
//"click" на .category-list => "data-id" з [product]
categoryListEl.addEventListener("click", (e) => {
    const categId = e.target.getAttribute("data-id");
    console.log(categId);
  //пройшлися по categ - filter, по obj. і повернули obj = data-id
    const filterCateg = categ.filter((obj) => {
        return obj.id === categId;
    });
    currentCat = filterCateg[0];
    console.log(currentCat);

  //список product в HTML
    productCategoryListEl.innerHTML = "";
  //пройшлися по .products. + до addToList:product, .category-products, name- product
    filterCateg[0].products.forEach((product) => {
        addToList(product, productCategoryListEl, 'name');
    });
});
//"click" -> productCategoryListEl = product data-name
productCategoryListEl.addEventListener("click", (e) => {
    const productName = e.target.getAttribute("data-name");
    console.log(productName);
  //поєднуємо key->value = string
    const filterProd = categ.reduce((acc, curr) => {
    const filteredProducts = curr.products.filter((product) => {
        return product.name === productName;
    });
    return [...acc, ...filteredProducts];
    }, []);
    console.log(filterProd);

    productCategoryListEl.innerHTML = "";
  // creat new product category list name+price
    filterProd.forEach((product) => {
        const li = document.createElement("li");
        li.innerText = `${product.name} - ${product.prise}`;
        const productName = e.target.innerText;
        productCategoryListEl.appendChild(li);
    });
    
});

infoSection.addEventListener("click", (e)=>{
    if (e.target === btnBuy) {
        infoSection.innerHTML = "";
        infoSection.appendChild(btnBuy);
    }
        // categoryListEl.innerHTML = "";
        // categoryListEl.style.display = "block";
        
})

btnBuy.addEventListener("click", (e) => {
    const selectedProduct = productCategoryListEl.querySelector("li");
        if (selectedProduct) {
            const productsName = selectedProduct.getAttribute("data-name");
            alert(`Товар "${productsName}" куплено!`);
        }
        categoryListEl.style.display = "block";
        productCategoryListEl.innerHTML = "";
        infoSection.innerHTML = "";
        infoSection.style.display = 'none';
        
});
