document.addEventListener("DOMContentLoaded", () => {
    const userLoginForm = document.getElementById("user-login-form");
  
  // Function to log in a user
  const loginUser = async (username, password) => {
    try {
      const response = await fetch("https://snap-z-be.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        // Save the JWT token in local storage for future API requests
        localStorage.setItem("token", data.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };


  userLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const loggedIn = await loginUser(username, password);
    if (loggedIn) {
      // Handle successful login, e.g., redirect to a user dashboard
    }
  });
  });



  