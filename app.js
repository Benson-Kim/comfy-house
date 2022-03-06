// variables
const cartBtn = document.querySelector(".cart-btn");
const closecartBtn = document.querySelector(".close-cart");
const clearcartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// cart
let cart = [];
// buttons
let buttonsDOM = [];

/* CLASSES  */

// get the products
class Products {
    async getProducts() {
        try {
            let result = await fetch("products.json");
            let data = await result.json();
            let products = data.items;

            products = products.map((item) => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image };
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// display products
class UI {
    displayProducts(products) {
        let result = "";
        products.forEach((product) => {
            result += `
             <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart">add to bag</i>
            </button>
          </div>
          <h3>${product.title} </h3>
          <h4>$ ${product.price} </h4>
        </article>
        <!-- single product ends -->
            `;
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const btns = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = btns;
        btns.forEach(btn => {
            let id = btn.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                btn.innerText = "In Cart";
                btn.disabled = true;
            }
            btn.addEventListener('click', (event) => {
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                // get product from products
                // add pproduct to the cart
                // save the cart to the local storage
                // set cart values
                // display cart item
                // show the cart
            })

        });
    }
}

// local storage
class Storage {
    // a static method, we dont want to instantiate the class
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
}

/* Event Listener */

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // gets all products
    products.getProducts().then((products) => {
        ui.displayProducts(products);
        // save products to local storage
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
    });
});
