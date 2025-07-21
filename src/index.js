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

let testTodo = new createTodo("Eat lunch", "Eat some lunch", "2025-07-17");
// console.log(testTodo);
console.log(todos);

let tags = [];
window.tags = tags;

class createTag{ 
  constructor(title) {
  this.title = title;
  tags.push(this);
};
}

new createTag("Home");
new createTag("Work");
new createTag("Play");

const pageMain = {
  deleteTodo: function(id) {
    const thisItem = todos.find((thisItem) => thisItem.id === String(id));
    let index = todos.indexOf(thisItem)
    todos.splice(index, 1);
    document.getElementById("display").innerHTML = "";
    pageMain.mainDisplay();
},
  priorityDropdown: document.querySelectorAll(".priority").forEach(el => {
  el.addEventListener("click", () => {
    document.getElementById("priorityDropdown").classList.toggle("show");
  });
}),
  mainDisplay: function() {
    todos.forEach((todo) => {
  const display = document.getElementById("display");
  const todoCard = document.createElement("div");
  todoCard.setAttribute("id", `${todo.id}`);
  todoCard.innerHTML = `
    <p>Task: <span class="todoTitle">${todo.title}</span></p>
    <p>Description: ${todo.description}</p>
    <p>Due Date: ${todo.dueDate}</p>
    <p class="priority">Priority: ${todo.priority}</p>
    <p>Categories: ${todo.categories}</p>
    <p>
      <input type="checkbox" class="complete" id="check-${todo.id}" ${todo.complete ? 'checked' : ''}>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    </p>
  `;
  display.appendChild(todoCard);
  const checkbox = document.getElementById(`check-${todo.id}`);
  checkbox.addEventListener("change", () => {
    todo.complete = checkbox.checked;
    console.log(`"${todo.title}" is now ${todo.complete ? 'complete' : 'incomplete'}`);
    // Optional: visual feedback
    todoCard.classList.toggle("task-completed", todo.complete);
  });
});

},
categorySidebar: function() {
  const tagSpace = document.getElementById("insertTags");
  tags.forEach((tag) => {
    if (tag.title === "") {}
    else {
    const categoryButton = document.createElement("button");
    categoryButton.setAttribute("id", `${tag.title}`);
    categoryButton.setAttribute("class", "category");
    categoryButton.innerHTML = `${tag.title}`;
    tagSpace.appendChild(categoryButton);
    console.log(categoryButton);
    }
  })
},
  init: function() {
    this.deleteTodo;
    this.mainDisplay();
    this.categorySidebar();
  },
};


const userInteract = {
  markComplete: function() {
    var checkbox = `${this.complete}`;
    this.complete = !this.complete;
  },
  addTaskPopUp: function() {
    document.getElementById("addTask-form").reset();
    document.getElementById("addTaskDisplay").style.display = "block";
    document.getElementById("addThatTask").addEventListener("click", userInteract.addTask);
    document.getElementById("closeAddTaskDisplay").addEventListener("click", function() {
      document.getElementById("addTaskDisplay").style.display = "none";
    });
    document.getElementById("taskDateDue").addEventListener("change", function() {
      var input = this.value;
      var dateEntered = new Date(input);
      console.log(input); //e.g. 2015-11-13
      console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
      return dateEntered
    });
    document.getElementById("taskTitle").focus();
},
  addTask: function() {
    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;
    // let dueDate = dateEntered;
    new createTodo(title, description);
    pageMain.mainDisplay();
    document.getElementById("addTask-form").reset();
    document.getElementById("addTaskDisplay").style.display = "none";
  },
  addCategory: function(tag) {
    if (!tags.some(t => t.title === tag)) {
      new createTag(tag);
    };
    document.getElementById("insertTags").innerHTML="";
    pageMain.categorySidebar();
  },
  

  init: function() {
    this.markComplete;
    this.addTaskPopUp;
    this.addTask;
    this.addCategory;
  },
};



const pageElements = {
  addCategoryButton: document.getElementById("addCategory").addEventListener("click", function() {
  const tag = prompt("What is the category name").trim();
  if (tag) { 
    userInteract.addCategory(tag);
  }
}),
  eventListenerAddTask: document.getElementById("addTodo").addEventListener("click", userInteract.addTaskPopUp),
//   eventListenerAddCategory: document.getElementById("addCategory").addEventListener("click", function() {
//     const tag = prompt("What is the category name").trim();
//   if (tag) { 
//     userInteract.addCategory(tag);
//   }
// }),
  init: function() {
    this.addCategoryButton;
    this.addTaskPopUp;
    this.eventListenerAddTask;
    this.eventListenerAddCategory;
  }
};

pageMain.init();
userInteract.init();
pageElements.init();








