import "./style.css";
// import {setTheme, toggleThemeButton} from "./theme.js";
document.documentElement.className = "dark";
function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;
};
document.querySelector('.theme-toggle').addEventListener('click', setTheme);

if (process.env.NODE_ENV !== 'production') {

   console.log('Looks like we are in development mode!');

 }
import { compareAsc, format } from "date-fns";

format(new Date(2014, 1, 11), "yyyy-MM-dd");
//=> '2014-02-11'

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];
dates.sort(compareAsc);
//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]

let todos = [];

function createTodo(title, description, dueDate) {
  let todo = {};
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = "medium";
  todo.tags = [];
  todo.complete = false;
  todo.id = crypto.randomUUID();
  todos.push(todo);
  return todo;
};

let todo1 = createTodo("Eat lunch", "Eat some lunch", "2025-07-17");

let tags = [];

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
  getDom: display = document.getElementById("display"),
  mainDisplay: function() {
    for (i = 0; i = todos.length; i++)
      display.innerHTML+=`${this.title}, ${this.description}, ${this.dueDate}`
  },
};

const userInteract = {
  markComplete: function() {
    this.complete = !this.complete
  },
  addTask: function() {
    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;
    let dueDate = document.getElementById("taskDateDue");
    createTodo(title, description, dueDate);
    document.getElementById("addTask-form").reset();
  },
  addCategory: function(tag) {
    tag = prompt("What is the category name");
    createTag(tag);
  }
};

const pageElements = {
  addTaskButton: document.addEventListener("click", userInteract.addTask()),
  addCategoryButtoon: document.addEventListener("click", userInteract.addCategory()),
  addTaskPopUp: function() {
    let addTaskForm = document.getElementById("addTask-display");
    addTaskForm.dialog( "open" );
    document.getElementById("addThatTask").addEventListener("click", userInteract.addTask())
  },
  eventListenerAddTask: document.getElementById("addTodo").addEventListener("click", pageElements.addTaskPopUp())
};





