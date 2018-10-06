// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {

  // Add Task 
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // validate
    if (taskInput.value === '') {
      alert('Please enter something into field');
      return;
    }

    //create li
    const li = document.createElement('li');

    // add class to li
    li.className = 'collection-item';

    // create text node and append to li
    const textNode = document.createTextNode(taskInput.value);
    li.appendChild(textNode);

    //create new link element
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append the link to li
    li.appendChild(link);

    // add to DOM
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);
  });


  // DOM load event, set local storage items into UI
  document.addEventListener('DOMContentLoaded', function () {
    // get item from local storage
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //set tasks
    tasks.forEach(function(task){
      //create li
      const li = document.createElement('li');

      // add class to li
      li.className = 'collection-item';

      // create text node and append to li
      const textNode = document.createTextNode(task);
      li.appendChild(textNode);

      //create new link element
      const link = document.createElement('a');

      //add class
      link.className = 'delete-item secondary-content';

      //add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';

      //append the link to li
      li.appendChild(link);

      // add to DOM
      taskList.appendChild(li);
    });
  })

  // Add task to local storage
  function storeTaskInLocalStorage(task) {
    // get item from local storage
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    // set items into local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Delete Tasks
  taskList.addEventListener('click', function (e) {
    if (e.target.classList == 'fa fa-remove') {
      let taskLi = e.target.parentElement.parentElement;
      taskLi.remove();

      // Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  });


  // Remove item from local storage 
  function removeTaskFromLocalStorage(taskItem){
    // get item from local storage
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // remove item
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
      tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Filter through tasks
  filter.addEventListener('keyup', function (e) {
    let ul = document.querySelector('.collection');
    // find ul > li
    let lis = ul.childNodes;
    lis = Array.from(lis);
    // loop through li collection
    lis.forEach(function (list) {
      // compare li textnode to input field value
      let listText = list.textContent.toLowerCase();
      let filterVal = filter.value.toLowerCase();
      if (filterVal.indexOf(listText) != -1) {
        list.style.display = 'block';
      } else if (filterVal === '') {
        list.style.display = 'block';
      } else {
        list.style.display = 'none';
      }
    });
  });

  filter.addEventListener('blur', function (e) {
    let ul = document.querySelector('.collection');
    // find ul > li
    let lis = ul.childNodes;
    lis = Array.from(lis);
    // loop through li collection
    lis.forEach(function (list) {
      list.style.display = 'block';
    });
  })

  // Clear all Tasks
  clearBtn.addEventListener('click', function (e) {
    let liCollection = document.querySelectorAll('.collection-item');
    liCollection.forEach(function (listItem) {
      listItem.remove();
    })

    //clear from local storage
    localStorage.clear();
  });

}