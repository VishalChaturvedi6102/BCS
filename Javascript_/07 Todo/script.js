
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

   

    function addTodoItem() {
        const todoText = todoInput.value.trim(); 

        if (todoText === '') {
            alert('Please enter a task!'); 
            return;
        }

        
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${todoText}</span>
            <button class="delete-button">Delete</button>`;

       
        listItem.querySelector('span').addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });

        


        listItem.querySelector('.delete-button').addEventListener('click', () => {
            todoList.removeChild(listItem); 
        });

        todoList.appendChild(listItem); 
        todoInput.value = ''; 
        todoInput.focus(); 
    }
    
    addButton.addEventListener('click', addTodoItem);
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodoItem();
        }
    });
});