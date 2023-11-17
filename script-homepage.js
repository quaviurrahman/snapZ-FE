document.addEventListener("DOMContentLoaded", () => {

        // Retrieve user details from local storage
        const username = localStorage.getItem('username');
        const company = localStorage.getItem('company');
    
      // Display the user's name and company in the specified HTML elements
      document.getElementById("usernameDisplay").innerHTML = username;
      document.getElementById("companyDisplay").innerHTML = company;
      
});