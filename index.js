let taskInput = document.getElementById('task-input');
let addTaskBtn = document.getElementById('add-task-btn');
let todoList = document.getElementById('todo-list');
let clearAllBtn = document.getElementById('clear-all-btn');

function createTodoElement(task, level = 0) {
    let li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.level = level;
    let heading= document.createElement('div')
    heading.className='heading';
    let wrapper= document.createElement('div')
    wrapper.className='wrapper'

    let toggleBtn = document.createElement('span');
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = '▼';
    toggleBtn.addEventListener('click', () => {
        let children = li.querySelectorAll('.nested-task');
        children.forEach(child => {
            child.classList.toggle('hidden');
        });
        toggleBtn.textContent = toggleBtn.textContent === '▶' ? '▼' : '▶';
    });
    let span = document.createElement('span');
    span.textContent = task;
    span.contentEditable = true;
    span.addEventListener('blur', () => {
        li.dataset.task = span.textContent;
    });

    let actions = document.createElement('div');
    actions.className = 'actions';

    let completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    let nestedBtn = document.createElement('button');
    nestedBtn.textContent = '+';
    nestedBtn.className = 'nested-button';
    nestedBtn.addEventListener('click', () => {
        if (level < 2) {
            let nestedTaskInput = document.createElement('input');
            nestedTaskInput.type = 'text';
            nestedTaskInput.placeholder = 'Add nested task';
            nestedTaskInput.addEventListener('keypress', (e) => {
              e.stopPropagation();
                if (e.key === 'Enter') {
                    let nestedTask = nestedTaskInput.value.trim();
                    if (nestedTask) {

                      let nestedLi = createTodoElement(nestedTask, level + 1);
                        nestedLi.classList.add('nested-task');
                        li.appendChild(nestedLi);
                        nestedTaskInput.remove();
                        toggleBtn.style.display = 'inline-block';
                       
                    }
                }
            });
            li.appendChild(nestedTaskInput);
            nestedTaskInput.focus();
        } else {
            alert('Nesting limit reached!');
        }
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    actions.appendChild(nestedBtn);
    
    heading.appendChild(toggleBtn);
    wrapper.appendChild(span);
    wrapper.appendChild(actions);
    heading.appendChild(wrapper)
    li.appendChild(heading)
    return li;
}

addTaskBtn.addEventListener('click', () => {
    let task = taskInput.value.trim();
    if (task) {
        let todoItem = createTodoElement(task);
        todoList.appendChild(todoItem);
        taskInput.value = '';
    }
});

clearAllBtn.addEventListener('click', () => {
    todoList.innerHTML = '';
});
