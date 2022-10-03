//menu
const open = document.getElementById("open");
const overlay = document.querySelector(".overlay");
const close = document.getElementById("close");

//shopping
const addBtns = document.querySelectorAll(".cart");

const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal_container");

open.addEventListener("click", () => {
  overlay.classList.add("show");
});

close.addEventListener("click", () => {
  overlay.classList.remove("show");
});

addBtns.forEach((addBtn) => {
  addBtn.addEventListener("click", () => {
    modal.classList.add("show_mordal");
    modalBody.classList.add("show_modal_container");
  });
});

//content of the modal
const goCart = document.querySelector(".go_cart");
const closes = document.querySelectorAll(".closes");

closes.forEach((close) => {
  close.addEventListener("click", () => {
    console.log("clicked");
    modal.classList.remove("show_mordal");
    modalBody.classList.remove("show_modal_container");
  });
});
