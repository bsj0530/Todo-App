const $inputBox = document.querySelector('#inputbox');
const $addBtn = document.querySelector('#add-btn');
const $todolist = document.querySelector('#todo-list');
const $todocount = document.querySelector('#todo-count');
const $clearall = document.querySelector('#clear-all')
let todolist = [];


$inputBox.addEventListener('keyup', function(e) {
    console.log('e.target.value: ', e.target.value);
    if (e.target.value) {
        $addBtn.classList.add('active');
    } else {
        $addBtn.classList.remove('active');
    } 
});

    $addBtn.addEventListener('click', function() {
        const todoItem = {
            id: Date.now(),
            value: $inputBox.value,
        }
        todolist.push(todoItem)
        localStorage.setItem('todolist', JSON.stringify(todolist))
        appendTodoItem(todoItem);

        // 카운트 변경
        const $itemlist = $todolist.querySelectorAll('li');
        $todocount.textContent = $itemlist.length;

        // input box clear
        $inputBox.value = '';

        //전체삭제버튼 활성화
        $clearall.classList.add('active')
    });

function appendTodoItem(todoItem) {
    const $li = document.createElement('li');
    const $span = document.createElement('span');
    const $i = document.createElement('i');
    $i.classList.add('fas', 'fa-trash');
    $span.classList.add('icon');
    $span.addEventListener('click', deleteTask);
    $li.textContent = todoItem.value;
    $todolist.appendChild($li);
    $li.dataset.id = todoItem.id;
    $li.appendChild($span);
    $span.appendChild($i);
}

    function deleteTask(e) {
        const $li = e.currentTarget.parentNode; 
        const deleteId = parseInt($li.dataset.id);
        const deleteIndex = todolist.findIndex((item) => item.id === deleteId);
        todolist.splice(deleteIndex, 1)
        localStorage.setItem('todolist', JSON.stringify(todolist));

        e.currentTarget.parentNode.remove()
        let value = $todocount.textContent;
        let count = parseInt(value);
        count--;
        $todocount.textContent = count;

        //전체삭제버튼 비활성화
        const $itemlist = $todolist.querySelector('li');
        if ($itemlist.length === 0) {
            $clearall.classList.remove('active');
        }
    }

    $clearall.addEventListener('click', function(){
        $todolist.innerHTML = '';
        $todocount.textContent = 0;
        todolist = [];
        localStorage.removeItem('todolist');
    })


    function showtasks() {
        const todoItems = localStorage.getItem('todolist')
        if (todoItems) {
            todolist = JSON.parse(todoItems);
            for (let todoItem of todolist) {
                appendTodoItem(todoItem);
            }
            $todocount.textContent = todolist.length;
            $clearall.classList.add('active');
        }
    }
    showtasks();