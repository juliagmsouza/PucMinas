// Model
class TodoModel {
    constructor() {
        this.todos = []; // Array para armazenar as tarefas
    }

    // Método para adicionar uma nova tarefa
    addTodo(todoText) {
        const todo = { text: todoText, completed: false }; // Cria um objeto de tarefa com texto e estado
        this.todos.push(todo); // Adiciona a tarefa ao array de tarefas
    }

    // Método para remover uma tarefa com base no índice
    removeTodo(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos.splice(index, 1); // Remove a tarefa do array
        }
    }

    // Método para marcar uma tarefa como concluída com base no índice
    markAsCompleted(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index].completed = true; // Define o estado da tarefa como concluída
        }
    }

    // Método para editar uma tarefa com base no índice e novo texto
    saveTodo(index, newText) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index].text = newText; // Atualiza o texto da tarefa
        }
    }
}

// View
class TodoView {
    constructor() {
        // Obtém elementos do DOM
        this.todoList = document.getElementById('to-do-list'); // Lista de tarefas a fazer
        this.doneList = document.getElementById('done-list'); // Lista de tarefas concluídas
        this.todoInput = document.getElementById('to-do-input'); // Campo de entrada de nova tarefa
        this.todoForm = document.getElementById('to-do-form'); // Formulário para adicionar tarefas
        this.orderButton = document.getElementById('order-button'); // Botão para ordenar tarefas a fazer
        this.orderDoneButton = document.getElementById('order-done-list-button'); // Botão para ordenar tarefas concluídas

        // Adiciona ouvintes de eventos aos elementos do DOM
        this.todoForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário
            const todoText = this.todoInput.value.trim(); // Obtém o texto da nova tarefa
            if (todoText !== '') {
                this.controller.addTodo(todoText); // Chama o controlador para adicionar a nova tarefa
                this.todoInput.value = ''; // Limpa o campo de entrada
            }
        });

        // Adiciona ouvintes de eventos para ordenar as listas
        this.orderButton.addEventListener('click', () => {
            this.controller.sortTodoList('to-do-list'); // Chama o controlador para ordenar a lista de tarefas a fazer
        });

        this.orderDoneButton.addEventListener('click', () => {
            this.controller.sortTodoList('done-list'); // Chama o controlador para ordenar a lista de tarefas concluídas
        });
    }

    // Define o controlador para esta visualização
    setController(controller) {
        this.controller = controller;
    }

    // Método para renderizar a lista de tarefas
    render() {
        this.todoList.innerHTML = ''; // Limpa a lista de tarefas a fazer
        this.doneList.innerHTML = ''; // Limpa a lista de tarefas concluídas

        // Renderiza cada tarefa na lista
        this.controller.model.todos.forEach((todo, index) => {
            this.renderTodo(todo, index); // Chama o método para renderizar uma tarefa
        });
    }

    // Método para renderizar uma única tarefa
    renderTodo(todo, index) {
        const editTextarea = document.createElement('textarea');

        editTextarea.classList.add('to-do-form-input-class');
        editTextarea.style.display = "none"; // Ficará oculta até o clique no botão de edição
        editTextarea.setAttribute('maxlength', 64); // Número máximo de caracteres
        editTextarea.setAttribute('rows', 4); // Número máximo de linhas
        editTextarea.setAttribute('cols', 16); // Número máximo de caracteres por linha
        editTextarea.setAttribute('id', `edit-textarea-${index}`);

        const todoItem = document.createElement('li'); // Cria um elemento <li> para a tarefa

        const todoText = document.createElement('div'); // Cria um elemento <div> para exibir o texto da tarefa
        todoText.setAttribute('id', `div-${index}`); // Define o texto da tarefa
        todoText.textContent = todo.text; // Define o texto da tarefa

        // Cria botões e adiciona ouvintes de eventos para ações como excluir, concluir e editar
        const deleteButton = this.createButton(`delete-button-${index}`, 'delete-button', 'trash-alt.svg', () => {
            this.controller.removeTodo(index); // Chama o controlador para remover a tarefa
        });

        const doneButton = this.createButton(`done-button-${index}`, 'done-button', 'check.svg', () => {
            this.controller.markAsCompleted(index); // Chama o controlador para marcar a tarefa como concluída
        });

        const editButton = this.createButton(`edit-button-${index}`, 'edit-button', 'pen.svg', () => {
            this.controller.editTodo(index); // Chama o controlador para editar a tarefa
        });

        const saveButton = this.createButton(`save-button-${index}`, 'delete-button', 'save.svg', () => {
            this.controller.saveTodo(index); // Chama o controlador para salvar a tarefa
        });

        saveButton.style.display = 'none';

        todoItem.appendChild(editTextarea); // Adiciona o textarea
        todoItem.appendChild(todoText); // Adiciona o texto da tarefa ao elemento <li>
        todoItem.appendChild(deleteButton); // Adiciona o botão de exclusão
        todoItem.appendChild(doneButton); // Adiciona o botão de conclusão
        todoItem.appendChild(editButton); // Adiciona o botão de edição
        todoItem.appendChild(saveButton); // Adiciona o botão de salvar

        if (todo.completed) {
            editButton.style.display = 'none';
            doneButton.style.display = 'none';
            todoItem.classList.add('done-li'); // Adiciona uma classe para indicar que a tarefa está concluída
            this.doneList.appendChild(todoItem); // Adiciona a tarefa à lista de tarefas concluídas
        } else {
            this.todoList.appendChild(todoItem); // Adiciona a tarefa à lista de tarefas a fazer
        }
    }

    // Método para criar um botão com uma classe CSS, ícone e ouvinte de eventos
    createButton(id, className, iconFileName, clickHandler) {
        const button = document.createElement('button'); // Cria um elemento <button>
        button.classList.add(className); // Adiciona a classe CSS especificada
        const img = document.createElement('img'); // Cria um elemento <img> para o ícone
        img.src = `https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/${iconFileName}`; // Define a fonte do ícone
        button.appendChild(img); // Adiciona o ícone ao botão
        button.addEventListener('click', clickHandler); // Adiciona um ouvinte de eventos de clique
        button.setAttribute('id', id);
        return button; // Retorna o botão criado
    }

    showTextarea(index) {
        // Obtem elementos através do Id
        const deleteButton = document.getElementById(`delete-button-${index}`);
        const editButton = document.getElementById(`edit-button-${index}`);
        const doneButton = document.getElementById(`done-button-${index}`);
        const saveButton = document.getElementById(`save-button-${index}`);
        const textarea = document.getElementById(`edit-textarea-${index}`);
        const div = document.getElementById(`div-${index}`);

        //Configura estilos de exibição dos botões e das tags div e textarea
        div.style.display = 'none';
        textarea.style.display = 'block';
        deleteButton.style.display = 'none';
        editButton.style.display = 'none';
        doneButton.style.display = 'none';
        saveButton.style.display = 'block';

        // Atualiza o texto da tarefa
        textarea.textContent = div.textContent;
    }

    saveTodo(index) {
        // Obtem elementos através do Id
        const deleteButton = document.getElementById(`delete-button-${index}`);
        const editButton = document.getElementById(`edit-button-${index}`);
        const doneButton = document.getElementById(`done-button-${index}`);
        const saveButton = document.getElementById(`save-button-${index}`);
        const textarea = document.getElementById(`edit-textarea-${index}`);
        const div = document.getElementById(`div-${index}`);

        //Configura estilos de exibição dos botões e das tags div e textarea
        div.style.display = 'block';
        textarea.style.display = 'none';
        deleteButton.style.display = 'inline';
        editButton.style.display = 'inline';
        doneButton.style.display = 'inline';
        saveButton.style.display = 'none';

        // Atualiza o texto da tarefa
        div.textContent = textarea.value;
        return textarea.value
    }
}

// Controller
class TodoController {
    constructor(model, view) {
        this.model = model; // Recebe o modelo
        this.view = view; // Recebe a visualização
        this.view.setController(this); // Define o controlador para a visualização
    }

    // Método para adicionar uma nova tarefa
    addTodo(todoText) {
        this.model.addTodo(todoText); // Chama o modelo para adicionar a tarefa
        this.view.renderTodo(this.model.todos[this.model.todos.length - 1], this.model.todos.length - 1); // Chama a visualização para renderizar a nova tarefa
    }

    // Método para remover uma tarefa com base no índice
    removeTodo(index) {
        this.model.removeTodo(index); // Chama o modelo para remover a tarefa
        this.view.render(); // Chama a visualização para atualizar a lista de tarefas
    }

    // Método para marcar uma tarefa como concluída com base no índice
    markAsCompleted(index) {
        this.model.markAsCompleted(index); // Chama o modelo para marcar a tarefa como concluída
        this.view.render(); // Chama a visualização para atualizar a lista de tarefas
    }

    // Método para editar uma tarefa com base no índice
    editTodo(index) {
        this.view.showTextarea(index)
    }

    // Método para salvar uma tarefa editada
    saveTodo(index) {
        const newValue = this.view.saveTodo(index)
        this.model.saveTodo(index, newValue)
    }

    // Método para ordenar a lista de tarefas
    sortTodoList(listId) {
        const ul = document.getElementById(listId); // Obtém a lista com base no ID especificado
        const lis = ul.getElementsByTagName('li'); // Obtém elementos <li> na lista
        const liArray = Array.from(lis); // Converte a coleção de elementos em um array
        liArray.sort((a, b) => {
            return a.textContent.localeCompare(b.textContent); // Ordena os elementos com base no texto
        });

        ul.innerHTML = ''; // Limpa a lista
        liArray.forEach((li) => {
            ul.appendChild(li); // Adiciona os elementos novamente, agora em ordem
        });
    }

    // Método de inicialização
    init() {
        this.view.render(); // Renderiza as tarefas iniciais
    }
}

// Cria uma instância do modelo, da visualização e do controlador
const model = new TodoModel();
const view = new TodoView();
const controller = new TodoController(model, view);

controller.init(); // Inicializa o controlador e a aplicação
