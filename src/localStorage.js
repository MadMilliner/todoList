function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}



function populateStorage() {
  if (todos.length > 0) {
    localStorage.setItem("storedTodos", JSON.stringify(todos));
  } else {
    localStorage.setItem("storedTodos", JSON.stringify([])); // Save empty array, not undefined
  }
  console.log("Stored todos:", localStorage.getItem("storedTodos"));

  if (tags.length > 0) {
    localStorage.setItem("storedTags", JSON.stringify(tags));
  } else {
    localStorage.setItem("storedTags", JSON.stringify([])); // Save empty array, not undefined
  }
  console.log("Stored tags:", localStorage.getItem("storedTags"))
  localStorage.setItem("style", document.documentElement.className);

}

// function populateStorage() {
//   console.log("Inside populateStorage:");
//   console.log("todos === window.todos?", todos === window.todos);
//   console.log("todos:", todos);
//   console.log("window.todos:", window.todos);

//   console.log("todos:", todos);
//   console.log("todos.length:", todos ? todos.length : "todos is undefined");
//   console.log("todos exists?", !!todos);
//   console.log("todos.length > 0?", todos && todos.length > 0);
  
//   if (todos && todos.length > 0) {
//     console.log("✅ Taking the IF path - storing todos");
//     console.log("About to stringify:", todos);
//     const stringified = JSON.stringify(todos);
//     console.log("Stringified result:", stringified);
//     localStorage.setItem("storedTodos", stringified);
//   } else {
//     console.log("❌ Taking the ELSE path - storing empty array");
//     console.log("Why? todos is:", todos);
//     console.log("todos.length is:", todos ? todos.length : "N/A");
//     localStorage.setItem("storedTodos", JSON.stringify([]));
//   }
  
//   console.log("Final stored value:", localStorage.getItem("storedTodos"));
// }


// function getTodos() {
//   try {
//     const stored = localStorage.getItem("storedTodos");
//     todos = stored ? JSON.parse(stored) : [];
//   } catch (error) {
//     console.error("Error loading todos:", error);
//     todos = []; // Fallback to empty array
//   }
//   console.log("Loaded todos:", todos);
// }

function getTodos() {
  try {
    const stored = localStorage.getItem("storedTodos");
    const loadedTodos = stored ? JSON.parse(stored) : [];
    
    // Clear existing array without reassigning
    todos.length = 0;
    // Add loaded items back
    todos.push(...loadedTodos);
  } catch (error) {
    console.error("Error loading todos:", error);
    todos.length = 0; // Clear array, don't reassign
  }
  console.log("Loaded todos:", todos);
}

function getTags() {
  try {
    const stored = localStorage.getItem("storedTags");
    tags = stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading tags:", error);
    tags = []; // Fallback to empty array
  }
  console.log("Loaded tags:", tags);
}

function setStyles() {
    if (localStorage.getItem("style")) {
        const style = localStorage.getItem("style");
        document.documentElement.className = style;
        console.log(style)
    } else document.documentElement.className = "dark";
}




export {storageAvailable, populateStorage, getTodos, getTags, setStyles}