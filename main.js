const products = document.querySelector('.products');
const accountname = document.getElementById('accountname');
const headerAccount = document.querySelector(".header__account");

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

headerAccount.addEventListener('click', logout)

