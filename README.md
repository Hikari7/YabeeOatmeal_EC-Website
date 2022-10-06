# Oatmeal EC Website

An Ecommerce website using JavaScript and the Local Storage.

## Demo Link

- [Oatmeal EC Website](http://oatmeal-ec-site.netlify.app)

![The top image](./imgs/Screen%20Shot%202022-10-06%20at%2012.57.56%20PM.png)
![The shop image](./imgs/Screen%20Shot%202022-10-06%20at%2011.56.14%20AM.png)
![The cart image](./imgs/Screen%20Shot%202022-10-06%20at%2011.56.40%20AM.png)

## Built With

- HTML
- CSS (SASS)
- JavaScript


## Features


The EC website was made with vanilla JavaScript and used the browser's local strage. Even if you change the quantity of the product in the cart, you can go to other pages and refresh the browser with holding the quantities.


## Challenging Part


- Manipulating the local strage

  Manipulating the local storage data and also needing to render them to the screen by DOM at the same time was quite difficult.  I kept checking what node lists I have and adjusted between JSON data and JS object by `JSON.parse()` or `JSON.stringify()`. The experience of checking the console to debug efficiently all the time developed my debugging skills!



- Accessing an element by DOM

  I tried to access a product name element inside of the `addEventListener` to check what item the user click on.  You can see how I used DOM such as `nextElementSibling` on the below codes.  A lot of elements needed to get so it was a good to deepen the DOM manipulation. Also, I learned the difference between Nodes and Elements so which also helps me to use DOM appropriate way.



```javascript

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

```
