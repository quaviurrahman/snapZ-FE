document.addEventListener("DOMContentLoaded", () => {
  const createTopicForm = document.getElementById("create-topic-form");
  const topicTitle = document.getElementById("topic-title");
  const topicDescription = document.getElementById("topic-description");
  const topicsList = document.getElementById("topics-list");

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
    
  // Function to create a new topic
  const createTopic = async (title, description) => {
    try {
      const response = await fetch("https://snap-z-be.vercel.app/topics/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description }),
      });
      console.log(JSON.stringify({ title, description }));
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating topic:", error);
      return null;
    }
  };

  // Function to display topics as a list
  const displayTopics = async () => {
    try {
      const response = await fetch("https://snap-z-be.vercel.app/topics/topiclist/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      console.log(data);
      topicsList.innerHTML = "";
      data.forEach((topic) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${topic.title}</strong>`;
        topicsList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  createTopicForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = topicTitle.value;
    const description = topicDescription.value;
    const createdTopic = await createTopic(title, description);
    if (createdTopic) {
      topicTitle.value = "";
      topicDescription.value = "";
      displayTopics();
    }
  });

  // Initial loading of topics
  displayTopics();
});
