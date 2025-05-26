document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");

    if (!container || !signUpButton || !signInButton) {
        console.error("某些关键元素未找到，请检查 HTML ID 是否匹配！");
        return;
    }

    // 切换到注册页
    signUpButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
    });

    // 切换到登录页
    signInButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    });

    // 注册逻辑
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("regUsername").value.trim();
            const password = btoa(document.getElementById("regPassword").value);

            if (!username || !password) {
                alert("请输入用户名和密码");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users") || "{}");

            if (users[username]) {
                alert("该用户名已被注册");
                return;
            }

            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("注册成功！");
            container.classList.remove("right-panel-active"); // 自动切回登录
        });
    }

    // 登录逻辑
    /*const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("loginUsername").value.trim();
            const password = btoa(document.getElementById("loginPassword").value);

            const users = JSON.parse(localStorage.getItem("users") || "{}");

            if (users[username] && users[username] === password) {
                alert("登录成功！");
                // 可跳转主页：window.location.href = "index.html";
            } else {
                alert("用户名或密码错误");
            }
        });
    }
});*/
// 登录逻辑
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("loginUsername").value.trim();
        const password = btoa(document.getElementById("loginPassword").value); // 使用 Base64 编码模拟加密

        const users = JSON.parse(localStorage.getItem("users") || "{}");

        if (users[username] && users[username] === password) {
            alert("登录成功！");
            // 跳转至播放器页面
            window.location.href = "demo33.html";
        } else {
            alert("用户名或密码错误");
        }
    });
  }
});