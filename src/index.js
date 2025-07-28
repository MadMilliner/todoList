import "./style.css";
import {storageAvailable, storeTodos, storeTags, getTodos, getTags, storeStyles, getStyles} from "./localStorage.js"


if (!localStorage.getItem("style")) {
  document.documentElement.className = "dark";
} else {
  getStyles();
}

if (storageAvailable("localStorage")) {
  document.getElementById("footer").innerHTML+=`<p><h6>Local Storage Enabled</h6></p>`
} else {
  document.getElementById("footer").innerHTML+=`<p><h6>Local Storage Not Avaialable</h6></p>`
}

function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;
  
};
document.querySelector('.theme-toggle').addEventListener('click', setTheme);


const todos = [];

class createTodo {
  constructor(title, description, dueDate, priority, category) {
    this.title = title;
    this.description = description;
    const dateObj = new Date(dueDate);
    this.dueDate = dateObj 
    this.dueDateFormatted = dateObj.toLocaleDateString()
    this.priority = priority;
    this.category = category;
    this.complete = false;
    this.id = crypto.randomUUID();
    this.addTodos();
  }
  addTodos() {
    todos.push(this);
    todos.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }
}

window.createTodo = createTodo;

// console.log(todos);

const tags = new Set();
window.todos = todos; 
window.tags = tags;
console.log("Just before get Todos and Tags - todos:", todos);
console.log("Just before get Todos and Tags - #display children:", document.getElementById("display").children.length);
console.log("Just before get Todos and Tags - tags:", tags)
window.onload = function() {
  if (!localStorage.getItem("storedTodos")) {storeTodos();}
  else {getTodos();}

  if (!localStorage.getItem("storedTags")) {
    new createTag("Home");
    new createTag("Work");
    new createTag("Play");
    storeTags();}
    else {getTags();}
  pageMain.mainDisplay();
};

class createTag{ 
  constructor(title) {
  this.title = title;
  this.addTags();
  }
  addTags() {
    tags.add(this);
};
}


  // new createTag("Home");
  // new createTag("Work");
  // new createTag("Play");


const pageMain = {
  deleteTodo: function(id) {
    const thisItem = todos.find((thisItem) => thisItem.id === String(id));
    let index = todos.indexOf(thisItem)
    todos.splice(index, 1);
    document.getElementById("display").innerHTML = "";
    pageMain.mainDisplay();
},
deleteTag: function(title) {
  const thisItem = Array.from(tags).find((thisItem) => thisItem.title === String(title));
  
  if (thisItem) {
    tags.delete(thisItem); 
  }
    // document.getElementById("display").innerHTML = "";
  pageMain.categorySidebar();
  pageMain.mainDisplay();
    
},

  mainDisplay: function() {
  
  document.getElementById("display").innerHTML = "";
  
  todos.forEach((todo, index) => {
    const display = document.getElementById("display");
    const todoCard = document.createElement("div");
    todoCard.setAttribute("id", `${todo.id}`);
    todoCard.innerHTML = `
      <p><span class="todoTitle">${todo.title}</span></p>
      <p>${todo.description}</p>
      <p>Due: ${todo.dueDateFormatted}</p>
      <p class="priority">Priority: ${todo.priority}</p>
      <p>Category: ${todo.category || 'Uncategorized'}</p>
      <p>
        <input type="checkbox" class="complete" id="check-${todo.id}" ${todo.complete ? 'checked' : ''}>
        <button type="button" class="delete-btn" id="delete-btn-${todo.id}"></button>
      </p>`;
    
    display.appendChild(todoCard);
    
    document.getElementById(`delete-btn-${todo.id}`).addEventListener("click", () => {
      pageMain.deleteTodo(todo.id);
    });
    
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
        <p><span class="todoTitle">${todo.title}</span></p>
        <p>${todo.description}</p>
        <p>Due: ${todo.dueDateFormatted}</p>
        <p class="priority">Priority: ${todo.priority}</p>
        <p>Category: ${todo.category}</p>
        <p>
          <input type="checkbox" class="complete" id="check-${todo.id}" ${todo.complete ? 'checked' : ''}>
          <button type="button" class="delete-btn" id="delete-btn-${todo.id}"></button>
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
  tagSpace.innerHTML="";
  Array.from(tags)
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((tag) => {
      if (tag.title !== "") {
        const categoryButton = document.createElement("button");
        categoryButton.setAttribute("id", `${tag.title}`);
        categoryButton.setAttribute("class", "category");
        categoryButton.setAttribute("type", "button");
        categoryButton.innerHTML = `${tag.title} <button class="delete-btn" id="delete-btn-${tag.title}"></button>`;
        categoryButton.addEventListener("click", pageMain.categoryFilter);
        tagSpace.appendChild(categoryButton);
        document.getElementById(`delete-btn-${tag.title}`).addEventListener("click", (e) => {
          e.stopPropagation();
          pageMain.deleteTag(tag.title);
      })
    }});
  },
//   tags.forEach((tag) => {
//     if (tag.title === "") {}
//     else {
//     const categoryButton = document.createElement("button");
//     categoryButton.setAttribute("id", `${tag.title}`);
//     categoryButton.setAttribute("class", "category");
//     categoryButton.setAttribute("type", "button");
//     categoryButton.innerHTML = `${tag.title} <button class="delete-btn" id="delete-btn-${tag.title}"></button>`;
//     categoryButton.addEventListener("click", pageMain.categoryFilter);
//     tagSpace.appendChild(categoryButton);
//     document.getElementById(`delete-btn-${tag.title}`).addEventListener("click", (e) => {
//       e.stopPropagation(); // ✅ Prevent event bubbling
//       pageMain.deleteTodo(tag.title);
// });
//     }
//   })



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
    Array.from(tags)
      .sort((a, b) => a.title.localeCompare(b.title))
      .forEach((tag) => {
        if (tag.title !== "") {
          const categoryButton = document.createElement("option");
          categoryButton.setAttribute("value", `${tag.title}`);
          categoryButton.innerHTML = `${tag.title}`;
          tagSpace.appendChild(categoryButton);
    }
  });
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
    if (!title) {
      alert("Please add some task info.");
      return;
    }
    new createTodo(title, description, dueDate, priority, category);
    console.log(todos);
    pageMain.mainDisplay();
    document.getElementById("addTask-form").reset();
    document.getElementById("addTaskDisplay").style.display = "none";
    
    // storeTodos();
  },
  addCategory: function(tag) {
  const tagExists = Array.from(tags).some(t => t.title === tag);
  
  if (!tagExists) {
    new createTag(tag);
  }
  pageMain.categorySidebar();
},
  addTaskShortcut: document.addEventListener("keydown", function(e) {
  if (e.key === "t") {
    const popup = document.getElementById("addTaskDisplay");
    if (popup.style.display === "none" || popup.style.display === "") {
      e.preventDefault();
      userInteract.addTaskPopUp(); 
    }
  }
}),
addCategoryPrompt: function() {
    const tag = prompt("What is the category name");
    if (tag && tag.trim()) {
      userInteract.addCategory(tag.trim());
    }
  },
addCategoryShortcut: document.addEventListener("keydown", function(e) {
  if (e.key === "c") {
    const popup = document.getElementById("addTaskDisplay");
    if (popup.style.display === "none" || popup.style.display === "") {
      e.preventDefault();
      userInteract.addCategoryPrompt(); 
    }
  }
}),
  

  init: function() {
    document.getElementById("addThatTask").addEventListener("click", userInteract.addTask);
    document.getElementById("closeAddTaskDisplay").addEventListener("click", function() {
      document.getElementById("addTaskDisplay").style.display = "none";
    });
    this.addTaskPopUp;
    this.addTask;
    this.addCategory;
    this.addTaskShortcut;
    this.addCategoryShortcut;
  },
};


const pageElements = {
  addCategoryButton: document.getElementById("addCategory").addEventListener("click", userInteract.addCategoryPrompt),
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

// new createTodo("Eat lunch", "Eat some lunch", "2025-07-17", "medium", "Home");
// new createTodo("Get local storage working", "Why is this so hard", "2025-07-23", "high", "Work");
// new createTodo("Code", "Time to learn", "2025-07-17", "high", "Play");

pageMain.init();
userInteract.init();
pageElements.init();

// todos.onchange = storeTodos();
// tags.onchange = storeTags();


function closingCode(){
   storeTags();
   storeTodos();
   storeStyles();
   return null;
}
window.onbeforeunload = closingCode;




// muatation observer code for debugging
// const displayElement = document.getElementById("display");
// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
//       console.log("🚨 Display cleared! Stack trace:");
//       console.trace();
//     }
//   });
// });
// observer.observe(displayElement, { childList: true });