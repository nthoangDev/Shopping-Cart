const detailContainer = document.querySelector(".detail-container");
const btnAddCart = document.getElementById('addCart');
const cartIcon = document.querySelector('.cart');
const header__account = document.querySelector(".header__account");

window.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById("accountname").innerText = loggedInUser.username;
        document.querySelector(".header__account i").className = "fa fa-sign-out-alt"; // Đổi icon thành đăng xuất
    } else {
        // Nếu không có người dùng đăng nhập, thiết lập nút hiển thị "Đăng nhập"
        document.querySelector(".header__account").innerHTML = `
        <i class="fa fa-user-alt"></i>
        <p id="accountname">Đăng nhập</p>
      `;
    }
});

const getDetailProduct = async () => {
    const path = new URLSearchParams(window.location.search);

    const productId = path.get('id');

    const respone = await fetch('../../data.json');

    const data = await respone.json();

    const findProductId = data.find(item => item.id.toString() === productId.toString());

    detailContainer.innerHTML = `
         <div class="detail">
            <div class="detail-image">
                <img src="../../${findProductId.img}" alt="${findProductId.title}">
            </div>
            <div class="detail-info">
                <h2>${findProductId.title}</h2>
                <p>${findProductId.description}</p>
                <div class="detail-price">
                    Price: 
                    <span class="price">$${findProductId.price}</span>    
                </div>
            </div> 
        </div>
    `

    btnAddCart.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const users = JSON.parse(localStorage.getItem('users'));

        console.log('aaaa')
        if (!users) {
            alert("Bạn cần đăng nhập để thực hiện tính năng này!!!");
            window.location.href = '../authenticate/login_signup.html';
        }
        if (cart) {
            const item = cart.findIndex(item => item.id === findProductId.id);

            if (item !== -1) {
                cart[item].count += 1;
            } else {
                cart.push({ id: findProductId.id, count: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            const cart = [
                {
                    id: findProductId.id,
                    count: 1
                }

            ]
            localStorage.setItem('cart', JSON.stringify(cart))
        }
        setCartItem();
    });
}

const setCartItem = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart && cart.length > 0) {
        cartIcon.innerHTML = `
            <p class="cart-item">${cart.length}</p>
            <i class="fa fa-shopping-bag"></i>
        `
    }
}

function logout() {
    // Xóa thông tin người dùng đã lưu trong localStorage
    localStorage.removeItem('loggedInUser');

    // Thay đổi giao diện người dùng thành trạng thái chưa đăng nhập
    document.querySelector(".header__account").innerHTML = `
      <i class="fa fa-user-alt"></i>
      <p id="accountname">Đăng nhập</p>
    `;

    // Chuyển hướng đến trang login_signup.html
    window.location.href = 'login_signup.html';
}

header__account.addEventListener('click', logout)

setCartItem();
getDetailProduct();