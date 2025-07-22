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

if (storageAvailable("localStorage")) {
  // Yippee! We can use localStorage awesomeness
} else {
  // Too bad, no localStorage for us
}

function populateStorage() {
  localStorage.setItem("todos", JSON.stringify(window.todos));
  localStorage.setItem("tags", JSON.stringify(window.tags));
  localStorage.setItem("style", document.documentElement.className.value);

  setStyles();
}

function getStorage() {
    if (localStorage.getItem("todos")) {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  const savedTags = JSON.parse(localStorage.getItem("tags"));
  
  window.todos = savedTodos;
  window.tags = savedTags;
    } else {}
}

function setStyles() {
    if (!localStorage.getItem("style")) {
        const style = localStorage.getItem("style");
        document.documentElement.className = style;
    } else document.documentElement.className = "dark";
}




export {storageAvailable, populateStorage, getStorage, setStyles}