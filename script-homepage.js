document.addEventListener("DOMContentLoaded", () => {

  const logoutButton = document.getElementById("logoutButton");

  // Add a click event listener to the logout button
   logoutButton.addEventListener("click", (event) => {
     event.preventDefault(); // Prevent default link behavior (e.g., navigation)
 
     // Call your logout function when the logout button is clicked
     logoutUser();
   });

        // Retrieve user details from local storage
        const username = localStorage.getItem('username');
        const company = localStorage.getItem('company');
    
      // Display the user's name and company in the specified HTML elements
      document.getElementById("usernameDisplay").innerHTML = username;
      document.getElementById("companyDisplay").innerHTML = company;
      
});