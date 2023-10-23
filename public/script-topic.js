document.addEventListener("DOMContentLoaded", () => {
  const createTopicForm = document.getElementById("create-topic-form");
  const topicTitle = document.getElementById("topic-title");
  const topicDescription = document.getElementById("topic-description");
  const topicsList = document.getElementById("topics-list");

  // Function to create a new topic
  const createTopic = async (title, description) => {
    try {
      const response = await fetch("http://localhost:3000/topics/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
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
      const response = await fetch("http://localhost:3000/topics/topiclist/", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
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
