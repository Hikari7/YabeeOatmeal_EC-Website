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

  Manipulating the local storage data and also rendering them to the screen by DOM at the same time was difficult.  I kept checking what node lists I had and converted between JSON data and JS object by `JSON.parse()` or `JSON.stringify()`. The experience of checking the console to debug efficiently developed my debugging skills!



- Accessing an element by DOM

  Getting a necessary element by DOM was tricky. For example, I tried to access a product name element which is inside of the `addEventListener` to check what item the user click on the delete button.  You can see how I used DOM such as `nextElementSibling` on the below codes.  A lot of elements were needed to get so it was good to deepen the DOM manipulation skills. Also, I learned the difference between Nodes and Elements so that helps me to use DOM appropriate way as well.



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
