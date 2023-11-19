function addTodo() {
    const todoText = document.getElementById('new-todo').value

    if (todoText.trim() === '') {
        return
    }

    const todoList = document.getElementById('todo-list')
    const todoItem = createTodoItem(todoText)

    todoList.appendChild(todoItem)
    clearTodoInput()
}

function createTodoItem(todoText) {
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')

    const checkbox = createCheckbox(todoItem)
    const todoTextElement = createTodoTextElement(todoText)
    const deleteButton = createDeleteButton(todoItem)

    todoItem.append(checkbox, todoTextElement, deleteButton)

    return todoItem
}

function createCheckbox(todoItem) {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.addEventListener('change', () => {
        todoItem.classList.toggle('completed', checkbox.checked)
    })
    return checkbox
}

function createTodoTextElement(todoText) {
    const todoTextElement = document.createElement('span')
    todoTextElement.textContent = todoText
    return todoTextElement
}

function createDeleteButton(todoItem) {
    const deleteButton = document.createElement('span')
    deleteButton.textContent = '❌'
    deleteButton.classList.add('delete-btn')
    deleteButton.onclick = () => {
        document.getElementById('todo-list').removeChild(todoItem)
    }
    return deleteButton
}

function clearTodoInput() {
    document.getElementById('new-todo').value = ''
}

function handleFormSubmit(event) {
    event.preventDefault()
    addTodo()
  }
  
const form = document.querySelector("#form")
form.addEventListener("submit", handleFormSubmit)