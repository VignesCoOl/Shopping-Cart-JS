let products = [
    {
        name: 'Samsung X',
        tag: 'samsung',
        price: 25000,
        inCart: 0
    },
    {
        name: 'OnePlus',
        tag: 'oneplus',
        price: 39900,
        inCart: 0
    },
    {
        name: 'Vivo',
        tag: 'vivo',
        price: 18600,
        inCart: 0
    },
    {
        name: 'Samsung',
        tag: 'samsung',
        price: 25000,
        inCart: 0
    }, {
        name: 'OnePlus',
        tag: 'oneplus',
        price: 39900,
        inCart: 0
    }
]
var carts = document.querySelectorAll(".add2cart");
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        alert("Product Added to cart");
        total(products[i]);
    })
}
function onLoadCart() {
    let productnums = localStorage.getItem("cartnumbers");
    if (productnums) {
        document.querySelector(".cart span").textContent = productnums;
    }
}
function cartNumbers(product) {
    let productnums = localStorage.getItem("cartnumbers");
    productnums = parseInt(productnums);
    if (productnums) {
        localStorage.setItem("cartnumbers", productnums + 1);
        document.querySelector(".cart span").textContent = productnums + 1;
    }
    else {
        localStorage.setItem("cartnumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }
    setItems(product);
}
function total(product) {
    let carttotal = localStorage.getItem("total");
    console.log("Cart Total is", carttotal);
    console.log(typeof carttotal);
    if (carttotal != null) {
        carttotal = parseInt(carttotal);
        localStorage.setItem("total", carttotal + product.price);
    }
    else {
        localStorage.setItem("total", product.price);
    }
}
function setItems(product) {
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems, [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItems = { [product.tag]: product }
    }
    localStorage.setItem("productsIncart", JSON.stringify(cartItems));
}
function displayCart() {
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    let productcon = document.querySelector(".products");
    let carttotal = localStorage.getItem("total");
    if (cartItems && productcon) {
        productcon.innerHTML = '';
        Object.values(cartItems).map(item => {
        /*    productcon.innerHTML += `<div class="product-container">
<img src="${item.tag}.jpg"></img>
<span>${item.name}</span>
</div>
<ion-icon name="close-circle-outline"></ion-icon>
<div class="price">${item.price}</div>
<ion-icon name="remove-circle-outline"></ion-icon><div class="quantity">${item.inCart}</div><ion-icon name="add-circle-outline"></ion-icon>
<div class="total">${item.inCart * item.price} RS</div>
 `;*/
 productcon.innerHTML += `<table class="tab1"><tr><th>Image</th><th>Brand</th><th>Price</th><th>Quantity</th><th>Total</th></tr>
 <tr><td><ion-icon name="close-circle-outline"></ion-icon><img src="${item.tag}.jpg"></img></td><td><span>${item.name}</span></td><td><div class="price">${item.price}</div></td><td><ion-icon name="remove-circle-outline"></ion-icon>${item.inCart}<ion-icon name="add-circle-outline"></ion-icon></td><td>${item.inCart * item.price} </td></tr>
 </table>
 `;
        });
 productcon.innerHTML += `<table class="tab2"><tr><th>Total Cost : </th><th>Payment</th><tr/><tr><th class="ct">${carttotal} </th><th><a href="https://www.bharatupi.com" type="button">Pay Online</a></th></tr></table>
 `;
    }
}
function comingSoon(){
    confirm("Coming soon");
}

onLoadCart();
displayCart();