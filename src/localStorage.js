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
  if (todos && todos.length > 0) {
    localStorage.setItem("storedTodos", JSON.stringify(window.todos));
  } else {
    localStorage.setItem("storedTodos", JSON.stringify([])); // Save empty array, not undefined
  }

  if (tags && tags.length > 0) {
    localStorage.setItem("storedTodos", JSON.stringify(window.tags));
  } else {
    localStorage.setItem("storedTodos", JSON.stringify([])); // Save empty array, not undefined
  }

  localStorage.setItem("style", document.documentElement.className);

}


function getTodos() {
  try {
    const stored = localStorage.getItem("storedTodos");
    window.todos = stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading todos:", error);
    window.todos = []; // Fallback to empty array
  }
  console.log("Loaded todos:", window.todos);
}

function getTags() {
  try {
    const stored = localStorage.getItem("storedTags");
    window.tags = stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading tags:", error);
    window.tags = []; // Fallback to empty array
  }
  console.log("Loaded tags:", window.tags);
}

function setStyles() {
    if (localStorage.getItem("style")) {
        const style = localStorage.getItem("style");
        document.documentElement.className = style;
    } else document.documentElement.className = "dark";
}




export {storageAvailable, populateStorage, getTodos, getTags, setStyles}