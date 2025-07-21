import "./style.css";
// import {setTheme, toggleThemeButton} from "./theme.js";
document.documentElement.className = "dark";
function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;
};
document.querySelector('.theme-toggle').addEventListener('click', setTheme);


const todos = [];
window.todos = todos; 

class createTodo {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = "medium";
    this.categories = [];
    this.complete = false;
    this.id = crypto.randomUUID();
    this.addTodos();
  }
  addTodos() {
    todos.push(this);
  }
}

window.createTodo = createTodo;
// const createTodo = (title, description, dueDate) => {
//   const todo = {
//     title: title,
//     description: description,
//     dueDate: dueDate,
//     priority: "medium",
//     categories: [],
//     complete: false,
//     id: crypto.randomUUID(),
//   };
//   todos.push(todo);
//   return todo;
// };

let testTodo = new createTodo("Eat lunch", "Eat some lunch", "2025-07-17");
console.log(testTodo);
console.log(todos);

let tags = [];
window.tags = tags;

function createTag(title) {
  let tag = [];
  tag.title = title;
  tags.push(tag);
  return tag;
};

createTag("Home");
createTag("Work");
createTag("Play");

const pageMain = {
  mainDisplay: function() {
    todos.forEach((todo) => {
      display = document.getElementById("display");
      var todoCard = document.createElement("div");
      todoCard.setAttribute("id", `${todo.id}`);
      todoCard.innerHTML = `
        <p>Task: <span class="todoTitle">${todo.title}</span></p>
        <p>Description: ${todo.description}</p>
        <p>Due Date: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <p>Categories: ${todo.categories}</p>
        <p><input type="checkbox" class="complete" id="${todo.id}">`;
      display.appendChild(todoCard);
    });
  },
  // return {mainDisplay}
};

pageMain.mainDisplay();

const userInteract = {
  markComplete: function() {
    var checkbox = `${this.complete}`;
    this.complete = !this.complete;
  },
  addTask: function() {
    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;
    let dueDate = document.getElementById("taskDateDue");
    new createTodo(title, description, dueDate);
    pageMain.mainDisplay();
    document.getElementById("addTask-form").reset();
    document.getElementById("addTaskDisplay").style.display = "none";
  },
  addCategory: function(tag) {
    createTag(tag);
  },
  addTaskPopUp: function() {
    document.getElementById("addTaskDisplay").style.display = "block";
    document.getElementById("addThatTask").addEventListener("click", userInteract.addTask);
    document.getElementById("closeAddTaskDisplay").addEventListener("click", function() {
    document.getElementById("addTaskDisplay").style.display = "none";
  })
},
  init: function() {
    this.markComplete;
    this.addTask;
    this.addCategory;
    this.addTaskPopUp;
    this.addTaskcancelButton;
  },
};

userInteract.init();

const pageElements = {
  // addTaskButton: document.addEventListener("click", userInteract.addTask),
  addCategoryButton: document.addEventListener("click", userInteract.addCategory),
  eventListenerAddTask: document.getElementById("addTodo").addEventListener("click", userInteract.addTaskPopUp),
  eventListenerAddCategory: document.getElementById("addCategory").addEventListener("click", function() {
    const tag = prompt("What is the category name");
  if (tag) { // Check if user didn't cancel
    userInteract.addCategory(tag);
  }
}),
  init: function() {
    // this.addTaskButton;
    this.addCategoryButton;
    this.addTaskPopUp;
    this.eventListenerAddTask;
    this.eventListenerAddCategory;
  }
};

pageElements.init();







