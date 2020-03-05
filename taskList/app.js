const taskItem = document.querySelector('#task');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

 const storeInLocalStorage = (task) => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  }

const addTask = (e) => {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskItem.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondery-content';
  link.innerHTML = '<i class="fa fa-remove"> </i>';
  li.appendChild(link);
  taskList.appendChild(li);
   
  storeInLocalStorage(taskItem.value);

  taskItem.value='';
  
  e.preventDefault();
};

const getTasks = (e) => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  const link = document.createElement('a');
  link.className = 'delete-item secondery-content';
  link.innerHTML = '<i class="fa fa-remove"> </i>';
  li.appendChild(link);
  taskList.appendChild(li);
     })
}

const removeFromLS = (taskItem) => {
  console.log(taskItem.textContent)
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const deleteItem = (e) => {
  if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
  //localStorage.removeItem(e.target.parentElement.parentElement);
   removeFromLS(e.target.parentElement.parentElement);
  }
};

const clearTasks = (e) => {
  if (e.target.classList.contains('clear-tasks')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  localStorage.clear();
};

const filtr = (e) => {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      return task.style.display = 'block';
    } return task.style.display = 'none';
  });
};

const loadEventListeners = () => {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteItem);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filtr);
  document.addEventListener('DOMContentLoaded', getTasks);
};
loadEventListeners();


