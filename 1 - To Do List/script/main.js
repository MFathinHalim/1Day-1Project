class ToDo {
    constructor(todos) {
        this.todos = todos;
    }

    getTodos() {
        return this.todos;
    }

    addTodo(newTodo) {
        this.todos.push(newTodo);
        this.updateLocalStorage();
    }

    updateStatus(title, isDone) {
        this.todos = this.todos.map(todo => {
            if (todo.title === title) {
                todo.done = isDone;
            }
            return todo;
        });
        this.updateLocalStorage();
    }

    removeTodo(title) {
        this.todos = this.todos.filter(todo => todo.title !== title);
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        localStorage.setItem("todo", JSON.stringify(this.todos));
    }
}

// Initialize with stored data or an empty list
let todoClass;
const todosInLocal = JSON.parse(localStorage.getItem("todo"));
if (todosInLocal) {
    todoClass = new ToDo(todosInLocal);
} else {
    todoClass = new ToDo([]);
}

// Add new ToDo
function addTodo() {
    const title = document.getElementById("addInput");
    if (!title.value) return;
    
    const newTodo = {
        title: title.value,
        done: false
    };
    todoClass.addTodo(newTodo);
    addTodoCard(newTodo);
    title.value = "";
}

// Add a new card to the DOM
function addTodoCard(todo) {
    const parent = document.getElementById("cardParent");
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.id = todo.title;

    const title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = todo.title;
    newCard.appendChild(title);

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "card-button";
    
    // Done button
    const doneButton = document.createElement("button");
    doneButton.className = "done-button";
    doneButton.textContent = "Done";
    doneButton.addEventListener('click', function() {
        markAsDone(doneButton, todo.title);
    });

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', function() {
        removeCard(newCard, todo.title);
    });

    if(!todo.done) buttonDiv.appendChild(doneButton);
    buttonDiv.appendChild(removeButton);
    newCard.appendChild(buttonDiv);
    parent.appendChild(newCard);
}

// Mark a card as done
function markAsDone(button, title) {
    button.remove();
    todoClass.updateStatus(title, true);
}

// Remove a card
function removeCard(element, title) {
    const parent = document.getElementById("cardParent");
    parent.removeChild(element);
    todoClass.removeTodo(title);
}

// Load cards from Local Storage on page load
window.onload = function() {
    const todos = todoClass.getTodos();
    todos.forEach(todo => addTodoCard(todo));
};
