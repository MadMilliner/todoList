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
  constructor(title, description, dueDate, priority, category) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.complete = false;
    this.id = crypto.randomUUID();
    this.addTodos();
  }
  addTodos() {
    todos.push(this);
  }
}

window.createTodo = createTodo;

let testTodo1 = new createTodo("Eat lunch", "Eat some lunch", "2025-07-17", "medium", "Home");
let testTodo2 = new createTodo("Eat lunch", "Eat packed lunch", "2025-07-16", "medium", "Work");
let testTodo3 = new createTodo("Code", "Time to learn", "2025-07-17", "high", "Play");
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
//   priorityDropdown: document.querySelectorAll(".priority").forEach(el => {
//   el.addEventListener("click", () => {
//     document.getElementById("priorityDropdown").classList.toggle("show");
//   });
// }),
  mainDisplay: function() {
    document.getElementById("display").innerHTML = "";
    todos.forEach((todo) => {
      const display = document.getElementById("display");
      const todoCard = document.createElement("div");
      todoCard.setAttribute("id", `${todo.id}`);
      todoCard.innerHTML = `
        <p>Task: <span class="todoTitle">${todo.title}</span></p>
        <p>Description: ${todo.description}</p>
        <p>Due Date: ${todo.dueDate}</p>
        <p class="priority">Priority: ${todo.priority}</p>
        <p>Category: ${todo.category}</p>
        <p>
          <input type="checkbox" class="complete" id="check-${todo.id}" ${todo.complete ? 'checked' : ''}>
          <button class="delete-btn" id="delete-btn-${todo.id}"></button>
        </p>
      `;
      display.appendChild(todoCard);
      document.getElementById(`delete-btn-${todo.id}`).addEventListener("click", () => {pageMain.deleteTodo(todo.id)});
      const checkbox = document.getElementById(`check-${todo.id}`);
      checkbox.addEventListener("change", () => {
        todo.complete = checkbox.checked;
        console.log(`"${todo.title}" is now ${todo.complete ? 'complete' : 'incomplete'}`);
        todoCard.classList.toggle("task-completed", todo.complete);
  });
});
},
categoryFilter: function(e) {
  document.getElementById("display").innerHTML = "";
  todos.filter(obj => {
        return obj.category === e.target.id 
    }).forEach((todo) => {
      const display = document.getElementById("display");
      const todoCard = document.createElement("div");
      todoCard.setAttribute("id", `${todo.id}`);
      todoCard.innerHTML = `
        <p>Task: <span class="todoTitle">${todo.title}</span></p>
        <p>Description: ${todo.description}</p>
        <p>Due Date: ${todo.dueDate}</p>
        <p class="priority">Priority: ${todo.priority}</p>
        <p>Category: ${todo.category}</p>
        <p>
          <input type="checkbox" class="complete" id="check-${todo.id}" ${todo.complete ? 'checked' : ''}>
          <button class="delete-btn" id="delete-btn-${todo.id}"></button>
        </p>
      `;
      display.appendChild(todoCard);
      document.getElementById(`delete-btn-${todo.id}`).addEventListener("click", () => {pageMain.deleteTodo(todo.id)});
      const checkbox = document.getElementById(`check-${todo.id}`);
      checkbox.addEventListener("change", () => {
        todo.complete = checkbox.checked;
        console.log(`"${todo.title}" is now ${todo.complete ? 'complete' : 'incomplete'}`);
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
    categoryButton.addEventListener("click", pageMain.categoryFilter);
    tagSpace.appendChild(categoryButton);
    }
  })
},


  init: function() {
    this.deleteTodo;
    this.mainDisplay();
    this.categoryFilter;
    this.categorySidebar();
    this.categoryEventlisteners;
  },
};


const userInteract = {
  addTaskPopUp: function() {
    document.getElementById("addTask-form").reset();
    document.getElementById("addTaskDisplay").style.display = "block";
    
    const tagSpace = document.getElementById("taskCategory");
    tagSpace.innerHTML="";
    tags.forEach((tag) => {
      if (tag.title === "") {}
      else {
      const categoryButton = document.createElement("option");
      categoryButton.setAttribute("value", `${tag.title}`);
      categoryButton.innerHTML = `${tag.title}`;
      tagSpace.appendChild(categoryButton);
    }
  })
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
    let dueDate = document.getElementById("taskDateDue").value;
    let category = document.getElementById("taskCategory").value;
    let priority = document.getElementById("taskPriority").value;
    new createTodo(title, description, dueDate, priority, category);
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
    document.getElementById("addThatTask").addEventListener("click", userInteract.addTask);
    document.getElementById("closeAddTaskDisplay").addEventListener("click", function() {
      document.getElementById("addTaskDisplay").style.display = "none";
    });
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
  allTasksButton: document.getElementById("allTasks").addEventListener("click", pageMain.mainDisplay),
  // categoryEventlisteners: function() {
  //   const categories = document.querySelectorAll(".category");
  //   categories.addEventListener("click", pageMain.categoryFilter)
  // },
  init: function() {
    this.addCategoryButton;
    this.addTaskPopUp;
    this.eventListenerAddTask;
    this.allTasksButton;
    // this.categoryEventlisteners();
  },
};

pageMain.init();
userInteract.init();
pageElements.init();








