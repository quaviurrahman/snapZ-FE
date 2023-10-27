document.addEventListener("DOMContentLoaded", () => {
    const userRegisterForm = document.getElementById("user-register-form");
  
    userRegisterForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("register-username").value;
      const password = document.getElementById("register-password").value;
      const email = document.getElementById("register-email").value;
  
      // Perform the registration process by making a POST request to your backend
      registerUser(username, password, email)
        .then((response) => {
          if (response.promptCompany) {
            const company = prompt("Enter your company name:");
            verifyUser(email, response.otpCode, company)
              .then((verificationResponse) => {
                if (verificationResponse) {
                  console.log("Registration successful");
                }
              })
              .catch((error) => {
                console.error("Error during verification:", error);
              });
          } else {
            const otpCode = prompt("Enter the OTP code sent to your email:");
            verifyUser(email, otpCode)
              .then((verificationResponse) => {
                if (verificationResponse) {
                  console.log("Registration successful");
                }
              })
              .catch((error) => {
                console.error("Error during verification:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error during registration:", error);
        });
    });
  
    async function registerUser(username, password, email) {
      try {
        const response = await fetch("https://snap-z-be.vercel.app/auth/register", {
          method: "POST",
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
  
    async function verifyUser(email, otpCode, company = null) {
      try {
        const response = await fetch("https://snap-z-be.vercel.app/auth/verify", {
          method: "POST",
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

    userRegisterForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;
        const email = document.getElementById("register-email").value;

        const registered = await registerUser(username, password);
        if (registered) {
          // Handle successful registration, e.g., show a success message
        }
      });
  });


