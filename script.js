const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
const todos = JSON.parse(localStorage.getItem('todos'))


// re-copy all existing todos from local storage
if (todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

function addTodo(todo) {
    let todoText = input.value
    if (todo) {
        todoText = todo.text
    }
    if (todoText) {
        const todoElt = document.createElement('li')
        if (todo && todo.completed) {
            todoElt.classList.add('completed')    
        }
        todoElt.innerText = todoText
        // on click, strike thru
        todoElt.addEventListener('click', () => {
            todoElt.classList.toggle('completed')
            updateLS()
        })
        // on right-click, remove element
        todoElt.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            todoElt.remove()
            updateLS()
        })
        todosUL.appendChild(todoElt)
        input.value = ''
        updateLS()
    }
}

function updateLS() {
    todosElt = document.querySelectorAll('li')
    const todos = []
    todosElt.forEach(todoElt => {
        todos.push({
            text: todoElt.innerText,
            completed: todoElt.classList.contains('completed')  
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
