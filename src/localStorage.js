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



function storeTodos() {
  if (todos.length > 0) {
    localStorage.setItem("storedTodos", JSON.stringify(todos));
  } else {
    localStorage.setItem("storedTodos", JSON.stringify([])); // Save empty array, not undefined
  }
  console.log("Stored todos:", localStorage.getItem("storedTodos"));

}

function storeTags() {
  if (tags.size > 0) {
    const tagsArray = Array.from(tags); // ✅ Convert Set to Array for JSON
    localStorage.setItem("storedTags", JSON.stringify(tagsArray));
  } else {
    localStorage.setItem("storedTags", JSON.stringify([])); // Save empty array, not undefined
  }
  console.log("Stored tags:", localStorage.getItem("storedTags"))
  
}

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
    const loadedTags = stored ? JSON.parse(stored) : [];
    
    tags.clear();
    // tags.add(...loadedTags);
    loadedTags.forEach(tag => tags.add(tag));
    
  } catch (error) {
    console.error("Error loading tags:", error);
    tags.clear();
  }
}

function storeStyles() {
    localStorage.setItem("style", document.documentElement.className);
}

function getStyles() {
    if (localStorage.getItem("style")) {
        const style = localStorage.getItem("style");
        document.documentElement.className = style;
        console.log(style)
    } else document.documentElement.className = "dark";
}




export {storageAvailable, storeTodos, storeTags, getTodos, getTags, storeStyles, getStyles}