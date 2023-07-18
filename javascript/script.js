const val = localStorage.getItem("type");
console.log(val);
const navLinks =document.querySelectorAll(".dropdown-menu .dropdown-item");

const filter = document.getElementById("filter");
filter.addEventListener("keyup", filterTasks);
 
navLinks.forEach((link) =>{link.addEventListener("click",filterByStatus);});


function populateTaskList() {
  const table = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  const nameHeader = document.createElement("th");
  const taskHeader = document.createElement("th");
  const dateHeader = document.createElement("th");
  const statusHeader = document.createElement("th");
  const updateStatusHeader= document.createElement("th");
  const actionHeader = document.createElement("th");

  nameHeader.innerText = "Name";
  taskHeader.innerText = "Task";
  dateHeader.innerText = "Date";
  statusHeader.innerText = "Status";
  updateStatusHeader.innerText="UpdateStatus";
  actionHeader.innerText = "Action";
  

  headerRow.appendChild(nameHeader);
  headerRow.appendChild(taskHeader);
  headerRow.appendChild(dateHeader);
  headerRow.appendChild(statusHeader);
  headerRow.appendChild(updateStatusHeader)
  headerRow.appendChild(actionHeader);
  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);
  table.appendChild(tableBody);

  const list = document.getElementById('task_body');
  list.appendChild(table);

  // Retrieve the task data from localStorage

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (val == "year") {
    sortByYear(tasks);
  }
  if (val == "month") {
    sortByMonth(tasks);
  }
  if (val == "day") {
    sortByDay(tasks);
  }

  if (tasks && tasks.length > 0) {
    tasks.forEach(({ name, task, date, status }) => {
      let row = document.createElement("tr");
      let nameCell = document.createElement("td");
      let taskCell = document.createElement("td");
      let dateCell = document.createElement("td");
      let statusCell = document.createElement("td");
      let updateStatuscell = document.createElement("td");
      let actionCell = document.createElement("td");
      let deleteButton = document.createElement("button");
      let updateButton = document.createElement("button");
      
      nameCell.innerText = name;
      taskCell.innerText = task;
      dateCell.innerText = date;
      statusCell.innerText = status;
      updateButton.innerText='Update';
      updateButton.setAttribute("data-name", name);
      updateButton.addEventListener("click", updateStatus);
      deleteButton.innerText = 'Delete';
      deleteButton.setAttribute("data-name", name);
      deleteButton.addEventListener("click", deleteTask);

      row.appendChild(nameCell);
      row.appendChild(taskCell);
      row.appendChild(dateCell);
      row.appendChild(statusCell);
      row.appendChild(updateStatuscell);
      updateStatuscell.appendChild(updateButton);
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);
      tableBody.appendChild(row);
    });

  } else {

    let row = document.createElement("tr");
    let noTasksCell = document.createElement("td");
    noTasksCell.setAttribute("colspan", "6");
    noTasksCell.innerText = "No tasks found.";

    row.appendChild(noTasksCell);
    tableBody.appendChild(row);
  }
}

// DELETE FILTER

function updateStatus(e) {
  const updateButton = e.target;
  const name = updateButton.getAttribute("data-name");
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find((task) => task.name === name);
  if (task) {
    if (task.status === "start") {
      task.status = "Pending";
    } else if (task.status === "Pending") {
      task.status = "Completed";
    } else if (task.status === "Completed") {
      alert("the task aready completed")
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const statusCell = updateButton.parentNode.previousSibling;
    statusCell.innerText = task.status;
  }
}

function deleteTask(e) {
  if (confirm("Are you sure you")) {
    const deleteButton = e.target;
    const name = deleteButton.getAttribute("data-name");
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter((task) => task.name !== name);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const row = deleteButton.closest("tr");
    row.remove();

  }

}
// SORTING FILTR

function sortByDay(tasks) {
  return tasks.sort((a, b) => {
    const dayA = new Date(a.date).getDate();
    const dayB = new Date(b.date).getDate();
    return dayA - dayB;
  });

}

function sortByMonth(tasks) {
  return tasks.sort((a, b) => {
    const monthA = new Date(a.date).getMonth();
    const monthB = new Date(b.date).getMonth();
    return monthA - monthB;

  });

}
function sortByYear(tasks) {
  return tasks.sort((a, b) => {
    const yearA = new Date(a.date).getFullYear();
    const yearB = new Date(b.date).getFullYear();
    return yearA - yearB;

  });

}

// SEARCHING FILTER

function filterByStatus(e) {
  const selectedStatus = e.target.dataset.filter;
  navLinks.forEach((link) => {
    link.classList.remove("active");

  });
  e.target.classList.add("active");
  filterTasks();

}
function filterTasks() {
  let searchText = filter.value.toLowerCase();
  let selectedStatus = document.querySelector(".dropdown-item.active").dataset.filter; // Get the selected status from the active dropdown item
  let rows = document.getElementById("task_table").getElementsByTagName("tr");
  for (let row of rows) {
    let name = row.cells[0].textContent.toLowerCase();
    let task = row.cells[1].textContent.toLowerCase();
    let date = row.cells[2].textContent.toLowerCase();
    let status = row.cells[3].textContent.toLowerCase();
    let match =
      (name.includes(searchText) ||
        task.includes(searchText) ||
        date.includes(searchText) ||
        status.includes(searchText)) &&
      (selectedStatus === "all" || status === selectedStatus);

    if (match) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  }
}
window.addEventListener('DOMContentLoaded', populateTaskList);
