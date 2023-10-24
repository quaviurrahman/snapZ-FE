document.addEventListener("DOMContentLoaded", async () => {
  const tableContainer = document.getElementById("table-container");
  const tableBody = document.getElementById("table-body");

  // Function to display the data for Topic-wise last post
  const fetchData = async () => {
    try {
      const URL = "https://snap-z-be.vercel.app/dashboard/lastTopicPosts";
      const response = await fetch(URL, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Credentials' : true,
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET',
          'Access-Control-Allow-Headers':'application/json',
        },
      });
      const data = await response;
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error fetching data due to:", error);
    }
  };

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
