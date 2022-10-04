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
    price: 15,
    inCart: 0,
  },
  {
    name: "Yabee Oat Meal",
    price: 10,
    inCart: 0,
  },
  {
    name: "Umee Oat Meal",
    price: 20,
    inCart: 0,
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

//ページをリフレッシュしてもカートの数字を保存する
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cartIcon_amount").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  //products[i]のクリックされた[i]に対する関数
  // console.log("the product clicked", product);

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

  //setItemという関数にそのままproductを渡す
  setItems(product);
}

//どのアイテムをクリックしたか判断していく
function setItems(product) {
  // console.log("My product is", product);

  //Cartに入ったproductを取得する(これがないと他のボタンを押しても更新がされない),JSON形式で表示されるので、JavaScirptに変える
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  //inCartの数字を足していくよ
  if (cartItems != null) {
    //各々のproductを検知していく(↓がなければ、1度目にクリックされた商品以外はされないので)
    if (cartItems[product.name] == undefined) {
      //undefinedだったらcartItemsを分割していく
      cartItems = {
        ...cartItems,
        [product.name]: product,
      };
    }

    cartItems[product.name].inCart += 1;
  } else {
    //nullだった時なので、一番最初にクリックした時
    product.inCart = 1;
    //カートの中に入ったアイテムをオブジェクトで作る-> localStarageに渡すには、JavaScriptではなくJSONデータに変換する必要がある
    cartItems = {
      [product.name]: product,
    };
  }

  //cartの中に入ったproductをlocalStrageに保存する
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  // console.log("MY CARTCOST IS", cartCost);
  // console.log(typeof cartCost);

  if (cartCost != null) {
    //typeが文字列だったので数字になおす
    cartCost = parseInt(cartCost);
    //setItemすると、localStrageのApplicationに保存されるよ、お決まり文句みたいな形
    localStorage.setItem("totalCost", product.price + cartCost);
  } else {
    //setItemすると、localStrageのApplicationに保存されるよ、お決まり文句みたいな形
    localStorage.setItem("totalCost", product.price);
  }
}

//Local Stargeに保存された情報をカートの表示にも保存させる(1回呼び出されないとinvokeされないので、下の方に関数呼び出す)
onLoadCartNumbers();



//Cart--------------------------------------------------

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
