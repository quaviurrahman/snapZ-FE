document.addEventListener("DOMContentLoaded", async () => {
  const tableContainer = document.getElementById("table-container");
  const tableBody = document.getElementById("table-body");
    // Retrieve user details from local storage
    const username = localStorage.getItem('username');
    const company = localStorage.getItem('company');

  // Display the user's name and company in the specified HTML elements
  document.getElementById("usernameDisplay").innerHTML = username;
  document.getElementById("companyDisplay").innerHTML = company;
  const logoutButton = document.getElementById("logoutButton");

 // Add a click event listener to the logout button
  logoutButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior (e.g., navigation)

    // Call your logout function when the logout button is clicked
    logoutUser();
  });

  // Function to display the data for Topic-wise last post
  const fetchData = async () => {
    try {
      const URL = "https://snap-z-be.vercel.app/dashboard/lastTopicPosts";
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error fetching data due to:", error);
    }
  };

  // Your logout function to clear user details and perform logout actions
const logoutUser = async () => {
  try {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("company");
  // Redirect to the login page or perform any other necessary action
  window.location.href = "/index.html";
  } catch(error) {
    console.log(error)
  }
}
  
  const displayTable = async (data) => {
    try {
      for (const topicId in data) {
        const item = data[topicId];
        const row = document.createElement("tr");

        const topicTitleCell = document.createElement("td");
        topicTitleCell.textContent = item.topic.title; // Access topic.title
        row.appendChild(topicTitleCell);

        const lastPostTextCell = document.createElement("td");
        lastPostTextCell.textContent = item.text;
        row.appendChild(lastPostTextCell);

        const createdDateCell = document.createElement("td");
        const createdDate = new Date(item.createdDate);
        createdDateCell.textContent = createdDate.toDateString();
        row.appendChild(createdDateCell);

        tableBody.appendChild(row);
      }
    } catch (error) {
      console.log("Failed to display the table:", error);
    }
  };

  const data = await fetchData();
  displayTable(data);
});
