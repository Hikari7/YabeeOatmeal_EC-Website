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

//ページをリフレッシュしてもカートの数字を保存する
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cartIcon_amount").textContent = productNumbers;
  }
}

//カートのアイコン
function cartNumbers(product, action) {
  //products[i]のクリックされた[i]に対する関数
  // console.log("the product clicked", product);

  //データを取得
  let productNumbers = localStorage.getItem("cartNumbers");
  // console.log(productNumbers);
  // console.log(typeof productNumbers); -> returned by string

  //文字列からintに変換する
  productNumbers = parseInt(productNumbers);

  //minusボタン押した時をアップデート
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  //localStrageとアイコンを-1減らす。actionは下に書いた関数に渡す用の引数
  if (action == "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cartIcon_amount").textContent = productNumbers - 1;
    //productがカートに追加された時 (つまりincrease)
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cartIcon_amount").textContent = productNumbers + 1;
    //ページが最初にローディングされた時
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cartIcon_amount").textContent = 1;
  }

  //setItemという関数にそのままproductを渡す。その引数を使えばそのままproducts[i]の情報が使える
  setItems(product);
}

//どのアイテムをクリックしたか判断していく
function setItems(product) {
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

function totalCost(product, action) {
  console.log(product.price);
  let cartCost = localStorage.getItem("totalCost");

  if (action == "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - product.price);
  }

  // console.log("MY CARTCOST IS", cartCost);
  // console.log(typeof cartCost);
  //increaseの時もこれにあたる
  else if (cartCost != null) {
    //typeが文字列だったので数字になおす
    cartCost = parseInt(cartCost);
    //setItemすると、localStrageのApplicationに保存されるよ、お決まり文句みたいな形
    localStorage.setItem("totalCost", product.price + cartCost);
  } else {
    //setItemすると、localStrageのApplicationに保存されるよ、お決まり文句みたいな形
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  //localStrageからの情報を持ってくる。その時にはJSON形式からJS形式に変換する

  let cartCost = localStorage.getItem("totalCost");

  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products");
  //もしcartItemsかつこのページがexsistしていたら

  if (cartItems && productContainer) {
    //initially empty
    productContainer.innerHTML = "";

    //取得したオブジェクト達(カートに入っている内容)
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
  //localStrageからデータを取り出す(getItemにKeyの名前)
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartItems = localStorage.getItem("productsInCart");
  //cartItemsはJasonデータをそのまま引っ張ってきているのでJSの形に直す
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

      //productNumbersを更新する, cartNumbersがproductNumbersと等しくなるように
      //localStarageからの値を取ってきて、それを更新している
      //合計数の計算(cartNumbersの引数から操作)
      localStorage.setItem(
        "cartNumbers",
        productNumbers - cartItems[productName].inCart
      );

      //合計値段の計算,
      localStorage.setItem(
        "totalCost",
        cartCost - cartItems[productName].price * cartItems[productName].inCart
      );

      //localStrageからcartを消す
      delete cartItems[productName];
      //productInCartを更新
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
  // console.log(cartItems);
  for (let i = 0; i < minusBtns.length; i++) {
    minusBtns[i].addEventListener("click", () => {
      // console.log(minusBtns[i].nextSibling);
      //quantityの文字をそのまま取得したい
      currentQuantity = minusBtns[i].nextElementSibling.textContent;
      currentProduct = minusBtns[
        i
      ].parentElement.previousElementSibling.previousElementSibling.textContent
        .toLowerCase()
        .split(" ")
        .join("")
        .trim();

      //curtItemsの数を１減らす
      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;

        //カートのアイコンの数字
        cartNumbers(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        //JSON化してアップデートする
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

//Local Stargeに保存された情報をカートの表示にも保存させる(1回呼び出されないとinvokeされないので、下の方に関数呼び出す)
onLoadCartNumbers();
//ページをリロードした時、wheneverこのfunctionを呼びたい
displayCart();

