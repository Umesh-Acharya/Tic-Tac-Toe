// Const = it's a key word to declare a js variable that cannot be reasigine a new value
// todoInput = it's a variable name
// document.querySelector('.todo-input') it selects the todo-input class from the html
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
// यहाँ सम्म तोकिएको class लाई seclect मात्र गरेका छन् noting more than that

document.addEventListener("DOMContentLoaded", getLocalTodos);
// DOMContentLoaded ????????????????????????
// getLocalTodos यो त call back function भइनै गो which will be called after DOMContentLoaded event is trigired
// but what in a hell is DOMContentLoaded???????????????????????  पछी research गर्नु पर्छ
todoButton.addEventListener("click", addTodo);
// Click भए पछि addTodo function call हुन्छ
todoList.addEventListener("click", deleteCheck);
// same as above same 
filterOption.addEventListener("change", filterTodo);
// same same puppy same

function addTodo(event) {

    event.preventDefault();
    // यसले form submit गरे पछि browser को reload हुने बानि लाई prevent गरेको छ
    const todoDiv = document.createElement("div");
    // यहाँ एउटा variable बन्यो named todoDiv जसको value document.createElement("div") हो basically it made a ne div
    todoDiv.classList.add("todo"); // this line of code just added the class name "todo" to the recentely added div 
    const newTodo = document.createElement("li"); // this variable created a <li></li> element
    newTodo.innerText = todoInput.value; // यो भन्या newTodo ले create गरेको element/ Html tag भित्र toDpInput मा type भाको value आएर बस्छ 
    // This is confusing because in html Input has class name called todo-input but here he used camelcase todoInput
    newTodo.classList.add("todo-item"); // this added the class name called todo-item to li tag


    todoDiv.appendChild(newTodo);
    /*
    माथीको  line of code means this
    it is clear to us that we created div tag from this code
    const todoDiv = document.createElement("div")
    and again we created li tag from this 
    const newTodo = document.createElement("li");
    those two code will create div and list element which will apper like this
    <div>
    </div>
    <li>
    </li>
    and todoDiv.appendChild(newTodo);
    will make them appear like this
    <div>
        <li>somethign</li>
    </div>
    */


    //ADDING TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
