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
    // This created an variable name completedButton which will create an button element in html

    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    // This will create an icon tag <i class="fas fa-check-circle"></i>

    completedButton.classList.add("complete-btn");
    // This will add the class to the button tage

    todoDiv.appendChild(completedButton);
    // this will make i tage apper inside button tag

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Same as above hai kanxa

    todoList.appendChild(todoDiv);
    // This  to remember The variable inside the () is always the child
    // and the variable before the appendChild is parants



    todoInput.value = "";
}

/*
Remember that यहाँ सम्म text area मा केहि लेखेर enter गर्यो भने
त्यो entered value ले inner html मा यस्तो काम गर्छ 

this is pre existing
<div class="todo-container"> 

this is pre existing
        <div class="todo-list">
            
        <div class="todo">
        from this onward is created by above codes
                
        <li class="todo-item">something</li>
                <button class="complete-btn"><i class="fas fa-check-circle"></i></button>
                <button class="trash-btn"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    </div>
*/

function deleteCheck(e) {
    // simple a function name deleteCheck with parameter name "e"
    const item = e.target;

    /*
    from my intense research I found out that
    e is a parameter
    and when const item = e.target
    this statement says that the value of the "item" variable will be the element or in our case the button which our user will click
    */

    if (item.classList[0] === "trash-btn") {
        /* 
        if (item.classlist[0] === "trash-btn") 
        This line of code means that 
        as we know that class of an element act like an array so to ascess the first array of an tag we used that code
        */
        const todo = item.parentElement;
        // item को parent element के हो मैले बुजिन किनकि item = यसले e.target भनेको छ


        /*
        we created a variable name todo which value is parant element of item so it's value is the dive with the class name todoItem
        */
        todo.classList.add("slide");
        // this added a class name slide to the dive with class name todoItem

        removeLocalTodos(todo);
        // this will call an function name removeLocalTodos with 

        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
        /*
        So what this
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });

        does is first it add a event to a variable todo whose value is assigined at to 
        const todo = item.parentElement;
        so the parent element of todo is added an eventlistner name transitioned

        after that a function is called as eventlistner which will remove the todo variable after compleation of the transition 
        हल्का grammer बिग्रियो यहाँ 
         */


    }

    if (item.classList[0] === "complete-btn")
    // delete check function को यो check वाला पाटो हो it will strickthrough on a text
    {
        const todo = item.parentElement;
        // उता Traash button वाला if statement को block मा ni यसले const todo = item.parentElement भनेर declare गरेको छ
        // So I asume that माथि declare गर्या todo ले माथि को conditioin हुँदा मात्र प्रयोग मा आउछ र तलको लाई भनेर छुट्टै declare गर्नु पर्छ 
        // ....................................................................................

        todo.classList.toggle("completed");
        // यो togगले le todo अर्थात item को parent element मा completed छैन भने completed class name add गर्छ
    }
}

function filterTodo(e) {
    // we made an function name filterTodo with the parameter (e) 

    const todos = todoList.childNodes;
    /* 
    we created a variable name todos which value will be  childreen of todoList and the text inside it
    const todoList = document.querySelector(".todo-list");
    */

    todos.forEach(function (todo) {
        // यसले todos मा रहेको nodes हरुलाई iterate/ repet गर्न खोज्यो

        switch (e.target.value) {
            // In a select tag there are three value which are all, completed, incomplet so this e.target.value means it will take the selected value and those selection are divided into case  

            case "all":
                todo.style.display = "flex";
                break;
            /*
            This is first case where if the option value selected is "all" than it will add inline style displey flex to todo whose value is
                    const todo = item.parentElement;
                    where item value is 
                        const item = e.target; meaning जुन button click गर्या हो
            */

            case "completed":
                if (todo.classList.contains("completed"))
                // यसको मतलब यदी todo ठाडै भन्दा click गरेको item मा class completed छ भने perfom this block of code
                {
                    todo.style.display = "flex";
                }

                else {
                    todo.style.display = "none";
                    // यदी class name completed छैन भने त्यो चिज नदेखाइदेउ
                }
                break;

            case "incomplete":
                if (!todo.classList.contains("completed"))
                /* 
            to understand if (!todo.classList.contains("completed")) we need to understand it's simpleer verseon 
            if i remove "!" symbole then this code will look like this
                if (todo.classList.contains("completed"))
                which means that the item which has the class name "completed" will be selected 
                our code with this symbold "!" means that
                condition is true if todo does not have the class "completed".
                सिधा साधा रुपमा भन्ने हो भने class name completed भाको लाई चाँहि select नगर अरुलाई चाँहि गर भन्न खोज्या
                after selecting that element perform this block of code
                */ {
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