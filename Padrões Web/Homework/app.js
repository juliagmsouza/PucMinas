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
    // Cria Div que guardará o texto dentro da tag Li (Foi usado div ao invés de span pois a div permite paddings)
    const todoDiv = document.createElement('div');
    todoDiv.textContent = todo;
    
    // Cria textarea para edição do item
    const editTextarea = document.createElement('textarea');
    editTextarea.classList.add('to-do-form-input-class');
    editTextarea.style.display = "none"; // Ficará oculta até o clique no botão de edição
    editTextarea.setAttribute('maxlength', 64); // Número máximo de caracteres
    editTextarea.setAttribute('rows', 4); // Número máximo de linhas
    editTextarea.setAttribute('cols', 16); // Número máximo de caracteres por linha
 
    // Cria botão com funcionalidade de deletar o item já criado
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button'); // Adiciona classe ao botão
    const img = document.createElement('img'); // Cria elemento de imagem
    img.src = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/trash-alt.svg'; // Define url da imagem
    deleteButton.appendChild(img); // Adiciona imagem ao botão
    
    // Cria botão com funcionalidade de concluir o item já criado
    const doneButton = document.createElement('button');
    doneButton.classList.add('done-button');
    const imgDone = document.createElement('img');
    imgDone.src = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/check.svg';
    doneButton.appendChild(imgDone);

    // Cria botão com funcionalidade de editar o item já criado
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    const imgEdit = document.createElement('img');
    imgEdit.src = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/pen.svg';
    editButton.appendChild(imgEdit);

    // Cria botão com funcionalidade de salvar edição do item
    const saveButton = document.createElement('button');
    saveButton.classList.add('delete-button'); // Adiciona classe para definir posicionamento igual ao do botão de deletar
    saveButton.style.display = 'none'; // Oculta botão até o momento da edição
    const imgSave = document.createElement('img'); // Cria elemento de imagem
    imgSave.src = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/floppy-disk.svg'; // Define url da imagem
    saveButton.appendChild(imgSave); // Adiciona imagem ao botão
    
    // Cria Li e adiciona todos os itens acima nele
    const todoItem = document.createElement('li');
    todoItem.appendChild(todoDiv);
    todoItem.appendChild(editTextarea);
    todoItem.appendChild(deleteButton);
    todoItem.appendChild(doneButton);
    todoItem.appendChild(editButton);
    todoItem.appendChild(saveButton);
    this.todoList.appendChild(todoItem); // Adiciona li na lista (Ul) de itens para fazer

    // Cria evento para escutar clique no botão de deletar item
    deleteButton.addEventListener('click', () => {
        const parentElement = deleteButton.parentElement; // Obtém elemento pai
        if(parentElement) { // Se elemento pai existir ele é removido
            parentElement.remove();
        }
    });

    // Cria evento para escutar clique no botão de concluir item
    doneButton.addEventListener('click', () => {
        const parentElement = doneButton.parentElement; // Obtém elemento pai
        if(parentElement) {  //Se elemento pai existir 
            parentElement.remove(); // Remove elemento pai (Item na lista de "para fazer")
            const doneList = document.getElementById('done-list') // Busca a lista (Tag UL) de itens concluídos
            doneButton.remove(); // Remove botão de concluir
            editButton.remove(); // Remove botão de edição
            todoItem.classList.add('done-li') // Adiciona classe para mudar o li de cor
            doneList.appendChild(todoItem); // Adiciona o LI (criado na linha 59) na lista de concluídos
        }
    });

    // Cria evento para escutar clique no botão de editar item
    editButton.addEventListener('click', () => {
        const parentElement = editButton.parentElement; // Obtém elemento pai
        if(parentElement) {
            const childTextareaElement = parentElement.getElementsByTagName('textarea')[0]; // Busca textarea no elemento pai
            const childDivElement = parentElement.getElementsByTagName('div')[0]; // Busca div com texto no elemento pai
            childTextareaElement.textContent = childDivElement.textContent; // Adiciona o texto da div na textarea para ser editado
            doneButton.style.display = "none"; // Oculta botão de conclusão
            editButton.style.display = "none"; // Oculta botão de edição
            deleteButton.style.display = "none"; // Oculta botão de deletar item
            saveButton.style.display = "inline-block"; // Exibe botão de salvar edição
            childDivElement.style.display = "none"; // Oculta div com texto
            childTextareaElement.style.display = "inline-block"; // Exibe textarea de edição
        }
    });

    // Cria evento para escutar clique no botão de salvar edição
    saveButton.addEventListener('click', () => {
        const parentElement = saveButton.parentElement; // Obtém elemento pai
        if(parentElement) {
            const childTextareaElement = parentElement.getElementsByTagName('textarea')[0]; // Busca textarea no elemento pai
            const childDivElement = parentElement.getElementsByTagName('div')[0]; // Busca div com texto no elemento pai
            childDivElement.textContent = childTextareaElement.value; // Define texto da div com o texto editado na textarea
            doneButton.style.display = "inline-block"; // Exibe botão de concluir item
            editButton.style.display = "inline-block"; // Exibe botão de editar item
            deleteButton.style.display = "inline-block"; // Exibe botão de deletar item
            saveButton.style.display = "none"; // Oculta botão de salvar edição
            childTextareaElement.style.display = "none"; // Oculta textarea de edição
            childDivElement.style.display = "block"; // Exibe div com texto editado
        }
    });

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

        // Cria evento para escutar cliques no botão de ordenação na lista de itens para fazer
        const orderButton = document.getElementById('order-button'); // Obtém botão de ordenação pelo id
        orderButton.addEventListener('click', () => {
            const ul = document.getElementById('to-do-list'); // Obtém lista de elementos (Ul)
            const lis = ul.getElementsByTagName('li'); // Obém elementos (Li) dentro da lista (Ul)
            const liArray = Array.from(lis); // Cria array a partir dos elementos obtidos
            liArray.sort((a, b) => {
                return a.textContent.localeCompare(b.textContent); // Utiliza função localeCompare para ordenar os itens do vetor
            });

            ul.innerHTML = ''; // Limpa lista de elementos
            liArray.forEach(li => {
                ul.appendChild(li); // Adiciona novamente os elementos (Li) na lista, agora de forma ordenada.
            });
        })

        // Cria evento para escutar cliques no botão de ordenação na lista de itens concluidos
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

