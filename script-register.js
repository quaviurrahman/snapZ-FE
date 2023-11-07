document.addEventListener("DOMContentLoaded", () => {
    const userRegisterForm = document.getElementById("user-register-form");
  
    userRegisterForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("register-username").value;
      const password = document.getElementById("register-password").value;
      const email = document.getElementById("register-email").value;
  
      // Perform the registration process by making a POST request to your backend
      const response = await registerUser(username, password, email)
          if (response.promptCompany) {
            const company = prompt("Enter your company name:");
            const verificationResponse = await verifyUser(email, response.otpCode, company)
                if (verificationResponse) {
                  console.log("Registration successful");
                }
              }
           else {
            const otpCode = prompt("Enter the OTP code sent to your email:");
            const verificationResponse = await verifyUser(email, otpCode)
                if (verificationResponse) {
                  console.log("Registration successful");
                }
                else {
                  console.log(verificationResponse);
                }
              }
            });
  
    const registerUser = async (username, password, email) => {
      try {
        const response = await fetch("https://snap-z-be.vercel.app/user/register", {
          method: "POST",
          mode : "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        });
        return response.json();
      } catch (error) {
        throw error;
      }
    }
  
    const verifyUser = async (email, otpCode, company = null) => {
      try {
        const response = await fetch("https://snap-z-be.vercel.app/user/verify", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otpCode, company }),
        });
        return response.json();
      } catch (error) {
        throw error;
      }
    }
  });


