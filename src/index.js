import "./style.css";
import {setTheme} from "./theme.js";

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
  return todo = {
    title: title,
    desc: description,
    dueDate: dueDate,
    priority: "medium",
    tags: [],
    complete: false,
    id: rypto.randomUUID(),
  };
  todos.push(todo);
}

let todo1 = createTodo("Eat lunch", "Eat some lunch", "2025-07-17")


function createTag(title) {
  return {
    title: title,
  }
}

createTag("Home");
createTag("Work");
createTag("Play");

const pageMain = {
  getDom: this.main = document.getElementById("main"),
  mainDisplay: function() {
    for (i = 0; i = todos.length; i++)
      main.innerHTML+=`${this.title}, ${this.desc}, ${this.dueDate}`
  },
}

const userInteract = {
  markComplete: function() {
    this.complete = !this.complete
  },

}

const pageElements = {

}

