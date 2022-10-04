//menu
const open = document.getElementById("open");
const overlay = document.querySelector(".overlay");
const close = document.getElementById("close");

//shopping
const addBtns = document.querySelectorAll(".add_cart");

const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal_container");

open.addEventListener("click", () => {
  console.log("aaa");
  overlay.classList.add("show");
});

close.addEventListener("click", () => {
  overlay.classList.remove("show");
});

//modal

// addBtns.forEach((addBtn) => {
//   addBtn.addEventListener("click", () => {
//     modal.classList.add("show_modal");
//     modalBody.classList.add("show_modal_container");
//   });
// });

//content of the modal
const closes = document.querySelectorAll(".closes");
// const goCart = document.querySelector(".go_cart");

closes.forEach((close) => {
  close.addEventListener("click", () => {
    console.log("close");
    modal.classList.remove("show_modal");
    modalBody.classList.remove("show_modal_container");
  });
});

//Add cart------------------------------------------------------------

let products = [
  {
    name: "Sugee Oat Meal",
    price: 9.99,
    inCart: 0,
  },
  {
    name: "Yabee Oat Meal",
    price: 9.99,
    inCart: 0,
  },
  {
    name: "Umee Oat Meal",
    price: 9.99,
    inCart: 0,
  },
];

for (let i = 0; i < addBtns.length; i++) {
  addBtns[i].addEventListener("click", () => {
    // modal.classList.add("show_modal");
    // modalBody.classList.add("show_modal_container");
    // console.log("dasd");

    //itemをクリックした数ぶんcartNumbersが呼ばれる
    cartNumbers();
  });
}

function cartNumbers() {
  //データを取得
  let productNumbers = localStorage.getItem("cartNumbers");
  // console.log(productNumbers);
  // console.log(typeof productNumbers); -> returned by string

  //文字列からintに変換する
  productNumbers = parseInt(productNumbers);

  //データを保存
  //if: productNumbersが存在していたら,localStrogeの数とカートの数を増やす
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cartIcon_amount").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cartIcon_amount").textContent = 1;
  }
}

//----------------------------------------------------

//Cart
// const modal = document.querySelector(".modal");
// const seeCarts = document.querySelectorAll(".shopping_cart");
// const cartModal = document.querySelector(".cart_modal");
// const cartBody = document.querySelector(".cart_container");

// goCart.addEventListener("click", () => {
//   cartPage();
// });

// seeCarts.forEach((seeCart) => {
//   seeCart.addEventListener("click", () => {
//     cartPage();
//   });
// });

// function cartPage() {
//   console.log("bruh"); //Function機能はしているね
//   modal.classList.remove("show_modal");
//   cartModal.classList.add("show_cart_modal");
//   modalBody.classList.remove("show_modal_container");
//   cartBody.classList.add("show_cart_container");
//   console.log(cartModal);
// }
