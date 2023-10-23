document.addEventListener("DOMContentLoaded", () => {
const postDetails = document.getElementById("post-details");
const createPostForm = document.getElementById("create-post-form");
const topicsListDropdown = document.getElementById("topics-list-dropdown");

// Function to display topics in a dropdown
const displayTopicsDropdown = async () => {
    try {
      const response = await fetch("http://localhost:3000/topics/topiclist/",{
      method: "GET",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
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
          const URL = "http://localhost:3000/posts/" + topicID        
          const response = await fetch(URL, {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
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