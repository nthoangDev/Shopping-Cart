let container = document.querySelector('.container');

let cartContainer = document.querySelector('.cart-container');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

let cartSummary = document.querySelector('.cart-summary');

window.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById("accountname").innerText = loggedInUser.username;
        document.querySelector(".header__account i").className = "fa fa-sign-out-alt"; // Đổi icon thành đăng xuất
    }
});

const renderCartItem = async () => {
    const respone = await fetch('../../data.json');

    const data = await respone.json();

    if (cart.length !== 0) {
        return (cartContainer.innerHTML = cart.map(itemCart => {
            let search = data.find(itemData => itemData.id === itemCart.id) || [];

            return `
            <div class="cart-part">
                <div class="cart-img">
                    <img src="../../${search.img}" alt="${search.title}">
                </div>
                <div class="cart-desc">
                    <h3>${search.title}</h3>
                </div>
                <div class="cart-quantity">
                    <input onchange="update(${search.id})" id="${search.id}" type="number" min="0" id="quantity" value="${itemCart.count}">
                </div>
                <div class="cart-price">
                    <h4>$${search.price}</h4>
                </div>
                <div class="cart-total">
                    <h4>$${itemCart.count * search.price}</h4>
                </div>
                <div class="cart-remove">
                    <button onclick="removeItem(${search.id})">Remove</button>
                </div>
            </div>
            `;
        }).join(""))
    } else {
        return container.innerHTML = `
        <div class='cart-empty'>
            <h2>Cart is Empty</h2>
            <a href="../../index.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        </div>
        `
    }
}

let update = (id) => {
    if (cart.length !== 0) {
        let searchIndex = cart.findIndex(itemCart => itemCart.id === id);
        if (searchIndex !== -1) {
            let quantityElement = document.getElementById(id);
            if (quantityElement) {
                cart[searchIndex].count = parseInt(quantityElement.value, 10) || 0;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItem();
                totalProducts();
            }
        }
    }

}

let totalProducts = async() => {
    let respone = await fetch('../../data.json');
    let data = await respone.json();

    if (cart.length !== 0) {
        let total = cart.map(item => {
            let search = data.find(itemData => itemData.id === item.id) || [];
            return item.count * search.price;
        }).reduce((x, y) => x + y, 0);
        cartSummary.innerHTML=`
         <div class="product-total">
            <h2>Total Product: <span id="total">$${total}</span> </h2>
        </div>
    
        <div class="product-checkout">
            <a href="../checkout/checkout.html" class="checkout">Checkout</a>
        </div>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
    } else return;
    
};

let removeItem = (id) =>{
    let removeId = id;
    cart = cart.filter(item => item.id !== removeId);
    renderCartItem();
    totalProducts();
    localStorage.setItem('cart', JSON.stringify(cart));
}

let clearCart = () =>{
    cart=[];
    renderCartItem();
    localStorage.setItem('cart', JSON.stringify(cart));
}

renderCartItem();

totalProducts();

