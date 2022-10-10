//menu
const open = document.getElementById("open");
const overlay = document.querySelector(".overlay");
const close = document.getElementById("close");

//shopping
const addBtns = document.querySelectorAll(".add_cart");

const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal_container");

open.addEventListener("click", () => {
  overlay.classList.add("show");
});

close.addEventListener("click", () => {
  overlay.classList.remove("show");
});

//content of the modal
const closes = document.querySelectorAll(".closes");

closes.forEach((close) => {
  close.addEventListener("click", () => {
    modal.classList.remove("show_modal");
    modalBody.classList.remove("show_modal_container");
  });
});

//Add cart------------------------------------------------------------

let products = [
  {
    name: "sugeeoatmeal",
    price: 15,
    inCart: 0,
    tag: "sugee.png",
  },
  {
    name: "yabeeoatmeal",
    price: 10,
    inCart: 0,
    tag: "yabee.jpg",
  },
  {
    name: "umeeoatmeal",
    price: 20,
    inCart: 0,
    tag: "umee.png",
  },
];

for (let i = 0; i < addBtns.length; i++) {
  addBtns[i].addEventListener("click", () => {
    modal.classList.add("show_modal");
    modalBody.classList.add("show_modal_container");

    //itemをクリックした数ぶんcartNumbersが呼ばれる, 引数にproductsの配列を渡すことでクリックされた商品がわかる
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cartIcon_amount").textContent = productNumbers;
  }
}

function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (action == "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cartIcon_amount").textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cartIcon_amount").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cartIcon_amount").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.name] == undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product,
      };
    }
    cartItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.name]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
  console.log(product.price);
  let cartCost = localStorage.getItem("totalCost");

  if (action == "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - product.price);
  } else if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", product.price + cartCost);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  let cartCost = localStorage.getItem("totalCost");

  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";

    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="products">
        <span class="material-symbols-outlined cancel">
         cancel
        </span>
        <img src="./imgs/${item.tag}">
        <span class="product_name">${item.name}</span>
      <div class="product_price">$${item.price}</div>
      <div class="product_quantity">
        <span class="minus">-</span>
        <span class="
        ">${item.inCart}</span>
        <span class="plus">+</span>
      </div>
      <div class="total">
      $${item.inCart * item.price},00</div>
      </div>
      </div>
      `;
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">
        Basket Total
      </h4>
      <h4 class="basketTotal">
        $${cartCost},00
      </h4>
    </div>`;
  }
  deleteBtns();
  manageQuantity();
}

//Cancel
function deleteBtns() {
  const cancelBtns = document.querySelectorAll(".cancel");
  let productName;
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartItems = localStorage.getItem("productsInCart");

  cartItems = JSON.parse(cartItems);

  let cartCost = localStorage.getItem("totalCost");

  for (let i = 0; i < cancelBtns.length; i++) {
    cancelBtns[i].addEventListener("click", () => {
      productName = cancelBtns[
        i
      ].nextElementSibling.nextElementSibling.textContent
        .trim()
        .toLowerCase()
        .split(" ")
        .join("");

      localStorage.setItem(
        "cartNumbers",
        productNumbers - cartItems[productName].inCart
      );

      localStorage.setItem(
        "totalCost",
        cartCost - cartItems[productName].price * cartItems[productName].inCart
      );

      delete cartItems[productName];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
      onLoadCartNumbers();
    });
  }
}

//plus and minus items
function manageQuantity() {
  let minusBtns = document.querySelectorAll(".minus");
  let plusBtns = document.querySelectorAll(".plus");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let currentQuantity = 0;
  let currentProduct = 0;

  for (let i = 0; i < minusBtns.length; i++) {
    minusBtns[i].addEventListener("click", () => {
      currentQuantity = minusBtns[i].nextElementSibling.textContent;
      currentProduct = minusBtns[
        i
      ].parentElement.previousElementSibling.previousElementSibling.textContent
        .toLowerCase()
        .split(" ")
        .join("")
        .trim();

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;

        cartNumbers(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });
  }

  for (let i = 0; i < plusBtns.length; i++) {
    plusBtns[i].addEventListener("click", () => {
      currentProduct = plusBtns[
        i
      ].parentElement.previousElementSibling.previousElementSibling.textContent
        .toLowerCase()
        .split(" ")
        .join("")
        .trim();

      cartItems[currentProduct].inCart += 1;

      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}

onLoadCartNumbers();
displayCart();
