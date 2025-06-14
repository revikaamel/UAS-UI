document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const loginPopup = document.getElementById("loginPopup");
  const closePopup = document.getElementById("closePopup");

  const loginForm = loginPopup.querySelector("form");
  const usernameInput = loginPopup.querySelector("#username");
  const passwordInput = loginPopup.querySelector("#password");

  const adminAccount = {
    username: "admin",
    password: "admin123"
  };

  if (loginBtn && loginPopup && closePopup) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loginPopup.classList.add("visible"); // Menampilkan pop-up
      loginPopup.classList.remove("hidden"); // Pastikan tidak ada kelas hidden
    });

    closePopup.addEventListener("click", function () {
      loginPopup.classList.remove("visible"); // Sembunyikan pop-up
      loginPopup.classList.add("hidden"); // Menyembunyikan pop-up
    });

    window.addEventListener("click", function (e) {
      if (e.target === loginPopup) {
        loginPopup.classList.remove("visible");
        loginPopup.classList.add("hidden");
      }
    });

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      if (username === adminAccount.username && password === adminAccount.password) {
        // ✅ Login berhasil, arahkan ke dashboard
        window.location.href = "admin/dashboard.html"; // Ganti dengan nama folder dan file yang sesuai
      } else {
        alert("Username atau password salah!");
      }
    });
  }
});
