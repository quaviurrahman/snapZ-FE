document.addEventListener("DOMContentLoaded", () => {
    const userLoginForm = document.getElementById("user-login-form");
  
  // Function to log in a user
  const loginUser = async (username, password) => {
    try {
      const response = await fetch("https://snap-z-be.vercel.app/user/login", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        // Save the JWT token in local storage for future API requests
        localStorage.setItem("token", data.token);
        console.log(data.token)
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  }

  userLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const loggedIn = await loginUser(username, password);
    if (loggedIn) {
      window.location.href = "./dashboard.html";
    }
  });
  }
);



  