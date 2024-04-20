// document.addEventListener("DOMContentLoaded", function () {
// Your code here

// Function to get data
async function getData() {
  try {
    const response = await fetch("https://todo-backend-jsht.onrender.com/todolist", {
      method: "GET",
    });

    const todolistData = await response.json();
    displayTodolistData(todolistData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display data with pagination
// Function to display data with pagination
function displayTodolistData(todolistData) {
  const itemsPerPage = 10;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const todolistContainer = document.getElementById("todolist");
  todolistContainer.innerHTML = "";

  // Display items for the current page
  const itemsToDisplay = todolistData.slice(startIdx, endIdx);
  console.log("item", itemsToDisplay);

  itemsToDisplay.forEach((item) => {
    const itemElement = document.createElement("div");
    // Format date to display only the date part
    // const formattedDate = new Date(item.date).toLocaleDateString("en-US");
    itemElement.innerHTML = `
      <div class="list-div">
        <div>
          <p class="list">${item.list.toUpperCase()}</p>
          <p class="date">Date: ${item.date}</p>
        </div>

        <div>
          <a href="updatedata.html?itemId=${encodeURIComponent(
            item.idtodolist
          )}&list=${encodeURIComponent(item.list)}" class="edit-btn">Edit</a>
          <button class="delete-btn" onclick="deleteItem('${
            item.idtodolist
          }')">Delete</button>
        </div>
      </div>
    `;
    todolistContainer.appendChild(itemElement);
  });

  // Add pagination buttons
  addPaginationButtons(todolistData.length, itemsPerPage);

  // Highlight the current page button
  const buttons = document.querySelectorAll(".pagination-container button");
  buttons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Function to delete item
async function deleteItem(itemId) {
  await fetch(`https://todo-backend-jsht.onrender.com/todolist/${itemId}`, {
    method: "DELETE",
  });
  getData(); // Reload data after deletion
}

// Fetch data on page load
getData();

// Global variable to track the current page
let currentPage = 1;

// Function to display data with pagination
function displayTodolistData(todolistData) {
  const itemsPerPage = 10;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const todolistContainer = document.getElementById("todolist");
  todolistContainer.innerHTML = "";

  // Display items for the current page
  const itemsToDisplay = todolistData.slice(startIdx, endIdx);
  itemsToDisplay.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
        <div class="list-div">
          <div>
            <p class="list">${item.list.toUpperCase()}</p>
            <p class="date">Date: ${item.date}</p>
          </div>

          <div>
            <a href="updatedata.html?itemId=${encodeURIComponent(
              item.idtodolist
            )}&list=${encodeURIComponent(item.list)}" class="edit-btn">Edit</a>
            <button class="delete-btn" onclick="deleteItem('${
              item.idtodolist
            }')">Delete</button>
          </div>
        </div>
      `;
    todolistContainer.appendChild(itemElement);
  });

  // Add pagination buttons
  addPaginationButtons(todolistData.length, itemsPerPage);
}

// Function to add pagination buttons
function addPaginationButtons(totalItems, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination-container");

  const prevButton = createPaginationButton("Previous", () => {
    if (currentPage > 1) {
      currentPage--;
      getData();
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createPaginationButton(i, () => {
      currentPage = i;
      getData();
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = createPaginationButton("Next", () => {
    if (currentPage < totalPages) {
      currentPage++;
      getData();
    }
  });
  paginationContainer.appendChild(nextButton);

  const todolistContainer = document.getElementById("todolist");
  todolistContainer.appendChild(paginationContainer);
}

// Function to create a pagination button
function createPaginationButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}
// });

// Function to add data
async function addData() {
  const list = document.getElementById("new-list").value;

  try {
    const response = await fetch("https://todo-backend-jsht.onrender.com/todolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list }),
    });

    const responseData = await response.json();
    console.log("", responseData);

    if (response.ok) {
      // getData();

      const successMessage = document.getElementById("success-message");
      successMessage.style.display = "block";

      setTimeout(() => {
        successMessage.style.display = "none";
        window.location.reload();
      }, 3000);
    } else {
      const errorMessage = responseData.error || "Failed to add list";
      console.error(errorMessage);
      // Display error message to the user
      const errorElement = document.getElementById("error-message");
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = "block";
      } else {
        console.error("Error element not found");
      }
    }
  } catch (error) {
    console.error("Error adding list:", error);
  }
}
