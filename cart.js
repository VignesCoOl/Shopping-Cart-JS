let products = [
    {
        name: 'Samsung X',
        tag: 'mobile',
        price: 15700,
        inCart: 0
    },
    {
        name: 'OnePlus',
        tag: 'mobile',
        price: 39900,
        inCart: 0
    },
    {
        name: 'Vivo',
        tag: 'mobile',
        price: 18600,
        inCart: 0
    },
    {
        name: 'Samsung',
        tag: 'mobile',
        price: 25000,
        inCart: 0
    }, {
        name: 'OnePlus',
        tag: 'mobile',
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
let productcon = document.querySelector(".product-container");
if(cartItems && productcon){
productcon.innerHTML = "";
Object.values(cartItems).map(item =>{
productcon.innerHTML += <div class="product">
<img src="${item.tag}.jpg"></img>
<span>${item.name}</span>
</div>


})
}

}

onLoadCart();
displayCart();