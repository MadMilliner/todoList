const tdCard = (todo) => `
      <p><span class="todoTitle">${todo.title}</span></p>
      <p>${todo.description}</p>
      <p>Due: <span id="date-${todo.id}">${todo.dueDateFormatted}</span></p>
      <p class="priority">Priority: ${todo.priority}</p>
      <p>Category: ${todo.category || 'Uncategorized'}</p>
      <p>
        <input type="checkbox" class="complete" id="check-${todo.id}" ${todo.complete ? 'checked' : ''}>
        <button type="button" class="delete-btn" id="delete-btn-${todo.id}"></button>
      </p>`

      export {tdCard}