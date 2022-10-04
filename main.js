//menu
const open = document.getElementById("open");
const overlay = document.querySelector(".overlay");
const close = document.getElementById("close");

//shopping
const addBtns = document.querySelectorAll(".cart");

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

addBtns.forEach((addBtn) => {
  addBtn.addEventListener("click", () => {
    modal.classList.add("show_mordal");
    modalBody.classList.add("show_modal_container");
  });
});

//content of the modal
const closes = document.querySelectorAll(".closes");
const goCart = document.querySelector(".go_cart");

closes.forEach((close) => {
  close.addEventListener("click", () => {
    console.log("close");
    modal.classList.remove("show_mordal");
    modalBody.classList.remove("show_modal_container");
  });
});

//Cart
// const modal = document.querySelector(".modal");
const seeCarts = document.querySelectorAll(".shopping_cart");
const cartModal = document.querySelector(".cart_modal");
const cartBody = document.querySelector(".cart_container");

seeCarts.forEach((seeCart) => {
  seeCart.addEventListener("click", () => {
    cartModal.classList.add("show_cart_mordal");
    cartBody.classList.add("show_cart_container");
  });
});
