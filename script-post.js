document.addEventListener("DOMContentLoaded", () => {
const postDetails = document.getElementById("post-details");
const createPostForm = document.getElementById("create-post-form");
const topicsListDropdown = document.getElementById("topics-list-dropdown");
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
   
// Function to display topics in a dropdown
const displayTopicsDropdown = async () => {
    try {
      const response = await fetch("https://snap-z-be.vercel.app/topics/topiclist/",{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization":localStorage.getItem('token'),
        },
      })
      const data = await response.json();
      console.log(data)
      if (Array.isArray(data)) {
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item._id;
        option.textContent = item.title;
        topicsListDropdown.appendChild(option);
      });
    }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

// Function to create a new post
    const createPost = async (topicID, text) => {
        try {
          const URL = "https://snap-z-be.vercel.app/posts/" + topicID        
          const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization":localStorage.getItem('token'),
            },
            body: JSON.stringify({ text }),
          });
          console.log(JSON.stringify({ text }))
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error creating post:", error);
          return null;
        }
      };

createPostForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        const text = postDetails.value;
        const topicID = topicsListDropdown.value;
        const createdPost = await createPost(topicID, text);
        console.log(createdPost)
        if (createdPost) {
          postDetails.value = "";
          topicsListDropdown.value = "";
        }
    } catch (error) {
        console.log("Error creating Post due to:",error)
    }
  });

displayTopicsDropdown();
});