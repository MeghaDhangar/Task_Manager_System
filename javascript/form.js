// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  // Get the input values
  const nameInput = document.getElementById('name');
  const dateInput = document.getElementById('date');
  const taskInput = document.getElementById('task');
  const statusInput = document.getElementById('status');

  const name = nameInput.value;
  const date = dateInput.value;
  const task = taskInput.value;
  const status = statusInput.value;

  // Create an object with the task data
  const taskData = { name: name, task: task, date: date ,status: status};

  // Retrieve existing tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Add the new task to the tasks array
  tasks.push(taskData);
  // Store the updated tasks in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Clear the form inputs
  nameInput.value = '';
  dateInput.value = '';
  taskInput.value = '';
  statusInput.value ='';

  alert('Task added successfully!');
}

// Addeventlistener to the form submit
const form = document.getElementById('task_form');
form.addEventListener('submit', handleFormSubmit);
