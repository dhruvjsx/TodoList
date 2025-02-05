let taskInput = document.getElementById('task-input');
let addTaskBtn = document.getElementById('add-task-btn');
let todoList = document.getElementById('todo-list');
let clearAllBtn = document.getElementById('clear-all-btn');

function handleAddTask (){
  let task = taskInput.value.trim();
  if (task) {
      let todoItem = createTodoElement(task);
      todoList.appendChild(todoItem);
      taskInput.value = '';
  }
}
function handleClearAll (){
  todoList.innerHTML = '';
}
function addNestedTask(li){
  
    let children = li.querySelectorAll('.nested-task');
    children.forEach(child => {
        child.classList.toggle('hidden');
    });
    toggleBtn.textContent = toggleBtn.textContent === '▶' ? '▼' : '▶';

}

function handleDelete(li) {
  li.remove();
}
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
    toggleBtn.addEventListener('click',addNestedTask.bind(null, li) );
    let span = document.createElement('span');
    span.textContent = task;
    span.contentEditable = true;
    span.addEventListener('blur', () => {
        li.dataset.task = span.textContent;
    });

    let actions = document.createElement('div');
    actions.className = 'actions';

    let completeBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    completeBtn.setAttribute("width", "24");  // Slightly increased size
    completeBtn.setAttribute("height", "24");
    completeBtn.setAttribute("viewBox", "-20 -20 375 375"); // Added padding
    completeBtn.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    completeBtn.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    
    // Background rectangle (White)
    const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("width", "100%");
    bgRect.setAttribute("height", "100%");
    bgRect.setAttribute("fill", "white");
    
    // Tick Group (To Center It)
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", "translate(20, 20) scale(0.8)"); // Shrinking & Centering
    
    // Original Polygon (Tick Mark) - Scaled Down & Aligned
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", "311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795");
    polygon.setAttribute("fill", "black");
    
    // Append elements in order
    g.appendChild(polygon);
    completeBtn.appendChild(bgRect);  // White Background
    completeBtn.appendChild(g);       // Centered Tick
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    let deleteBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    deleteBtn.setAttribute("width", "24px");
    deleteBtn.setAttribute("height", "24px");
    deleteBtn.setAttribute("viewBox", "0 0 32 32");
    deleteBtn.setAttribute("version", "1.1");
    deleteBtn.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    deleteBtn.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    deleteBtn.setAttribute("xmlns:sketch", "http://www.bohemiancoding.com/sketch/ns");
    
    // Create background rectangle (Red)
    const bgRect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect1.setAttribute("width", "32");
    bgRect1.setAttribute("height", "32");
    bgRect1.setAttribute("fill", "white");
    
    // Create Group
    const g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g1.setAttribute("fill", "red"); // Set the element color to white
    g1.setAttribute("transform", "translate(-206, -1037)"); // Preserve original transform
    
    // Create Path (Cross Icon)
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z");
    path1.setAttribute("fill", "red");
    
    // Append elements
    g1.appendChild(path1);
    deleteBtn.appendChild(bgRect1); // Append background first
    deleteBtn.appendChild(g1); 
    // deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', handleDelete.bind(null,li));

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

    actions.appendChild(deleteBtn);
    actions.appendChild(completeBtn);
    actions.appendChild(nestedBtn);
    
    wrapper.appendChild(actions);
    wrapper.appendChild(span);
    heading.appendChild(toggleBtn);
    heading.appendChild(wrapper)
    li.appendChild(heading)
    return li;
}

addTaskBtn.addEventListener('click', handleAddTask );

clearAllBtn.addEventListener('click', handleClearAll);
