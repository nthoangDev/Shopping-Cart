const products = document.querySelector('.products');
const accountname = document.getElementById('accountname');


window.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      document.getElementById("accountname").innerText = loggedInUser.username;
      document.querySelector(".header__account i").className = "fa fa-sign-out-alt"; // Đổi icon thành đăng xuất
    }
});

const getData = async () => {
    const respone = await fetch('data.json');

    const data = await respone.json();

    if (data) {
        products.innerHTML = data.map(item => {
            return `
            <div class="product__item">
            <img src="${item.img}" alt="${item.title}">
            <div class="product-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="pages/detail/detail.html?id=${item.id}" class="btn">View</a>
            </div>
        </div>
            `
        }).join('');
    }   

}

getData();