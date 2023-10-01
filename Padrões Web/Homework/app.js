//Model
const model = {
    todos: [],
    addTodo: function (todo) {
        this.todos.push(todo);
    },
    // removeTodo: function (index) {
    //     this.todos.splice(index, 1);
    // },
};

//View
const view = {
    todoList: document.getElementById('to-do-list'),
    renderTodo: function (todo)
 {
    const todoSpan = document.createElement('div');
    todoSpan.textContent = todo;
    const todoButton = document.createElement('button');
    todoButton.classList.add('delete-button');
    const img = document.createElement('img');
    img.src = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/trash-alt.svg';
    todoButton.appendChild(img);
    const doneButton = document.createElement('button');
    doneButton.classList.add('done-button');
    const imgDone = document.createElement('img');
    imgDone.src = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/check.svg';
    doneButton.appendChild(imgDone);
    const todoItem = document.createElement('li');
    todoItem.appendChild(todoSpan);
    todoItem.appendChild(todoButton);
    todoItem.appendChild(doneButton);
    todoButton.addEventListener('click', () => {
        const parentElement = todoButton.parentElement;
        if(parentElement) {
            parentElement.remove();
        }
    });
    doneButton.addEventListener('click', () => {
        const parentElement = todoButton.parentElement;
        if(parentElement) {
            parentElement.remove();
            const doneList = document.getElementById('done-list')
            doneButton.remove();
            todoItem.classList.add('done-li')
            doneList.appendChild(todoItem);
        }
    });
    this.todoList.appendChild(todoItem);
 },
};

//Controller
const controller = {
    init: function(){
        const todoForm = document.getElementById('to-do-form');
        todoForm.addEventListener('submit', function(event){
            event.preventDefault();
            const todoInput = document.getElementById('to-do-input');
            const todo = todoInput.value;
            if(todo.trim()!== ''){
                model.addTodo(todo);
                view.renderTodo(todo);
                todoInput.value = '';
            }
        });
        const orderButton = document.getElementById('order-button');
        orderButton.addEventListener('click', () => {
            const ul = document.getElementById('to-do-list');
            const lis = ul.getElementsByTagName('li');
            const liArray = Array.from(lis);
            liArray.sort((a, b) => {
                return a.textContent.localeCompare(b.textContent);
            });
            ul.innerHTML = '';
            liArray.forEach(li => {
                ul.appendChild(li);
            });
        })
        const orderDoneButton = document.getElementById('order-done-list-button');
        orderDoneButton.addEventListener('click', () => {
            const ul = document.getElementById('done-list');
            const lis = ul.getElementsByTagName('li');
            const liArray = Array.from(lis);
            liArray.sort((a, b) => {
                return a.textContent.localeCompare(b.textContent);
            });
            ul.innerHTML = '';
            liArray.forEach(li => {
                ul.appendChild(li);
            });
        })
    },
};

controller.init();

