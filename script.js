let products = [
    {
        name: "T-Shirt",
        price: 1500,
        category: "Clothes"
    },

    {
        name: "Jeans",
        price: 2500,
        category: "Clothes"
    },

    {
        name: "Sneakers",
        price: 3000,
        category: "Shoes"
    },

    {
        name: "Watch",
        price: 2000,
        category: "Accessories"
    },

    {
        name: "Cap",
        price: 800,
        category: "Accessories"
    },

    {
        name: "Running Shoes",
        price: 3500,
        category: "Shoes"
    }
];

let searchInput = document.getElementById("searchInput");
let categoryFilter = document.getElementById("categoryFilter");
let productList = document.getElementById("productList");
let cartList = document.getElementById("cartList");
let cartTotal = document.getElementById("cartTotal");
let clearCartBtn = document.getElementById("clearCartBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showProducts() {

    productList.innerHTML = "";

    let searchText = searchInput.value.toLowerCase();
    let selectedCategory = categoryFilter.value;
    products.forEach(function(product, index) {

    if (
    !product.name.toLowerCase().includes(searchText) ||
    (selectedCategory != "All" && product.category != selectedCategory)
) {
    return;
  }

        let card = document.createElement("div");
        card.classList.add("product");

        card.innerHTML =
            "<h3>" + product.name + "</h3>" +
            "<p>Rs. " + product.price + "</p>" +
            "<p>" + product.category + "</p>"; 

         let addBtn = document.createElement("button");
        addBtn.innerHTML = "Add to Cart";

        addBtn.addEventListener("click", function() {
         cart.push({
            product: product,
            quantity: 1
        });

        localStorage.setItem("cart", JSON.stringify(cart));
     showCart(); 
});
  
        card.appendChild(addBtn);
        productList.appendChild(card);
    });

}

function showCart() {
    cartList.innerHTML = "";

    let sum = 0;

    cart.forEach(function(item, index) {
        let cartItem = document.createElement("div");
        let itemName = document.createElement("span");
        itemName.innerHTML = item.product.name + " - Rs. " + item.product.price + " ";

        let minusBtn = document.createElement("button");
        minusBtn.innerHTML = "-";

        let quantity = document.createElement("span");
        quantity.innerHTML = " " + item.quantity + " ";

        let plusBtn = document.createElement("button");
        plusBtn.innerHTML = "+";

        minusBtn.addEventListener("click", function() {
            if (item.quantity > 1) {
                item.quantity--;
                localStorage.setItem("cart", JSON.stringify(cart));
                showCart();
            }
        });

        plusBtn.addEventListener("click", function() {
            item.quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            showCart();
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";

        deleteBtn.addEventListener("click", function() {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        
        showCart();

});

        cartItem.appendChild(itemName);
        cartItem.appendChild(minusBtn);
        cartItem.appendChild(quantity);
        cartItem.appendChild(plusBtn);
        cartList.appendChild(cartItem);
        cartItem.appendChild(deleteBtn);
        
        sum += item.product.price * item.quantity;

    });

     cartTotal.innerHTML = "Total: Rs. " + sum;

}
 
showProducts();
showCart();

clearCartBtn.addEventListener("click", function() {
    cart = [];
    localStorage.removeItem("cart");
    
    showCart();
});

searchInput.addEventListener("input", function() {
    showProducts();
});