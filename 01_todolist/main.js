const $inputBox = document.querySelector('#inputbox');
const $addBtn = document.querySelector('#add-btn');
const $todolist = document.querySelector('#todo-list');
const $todocount = document.querySelector('#todo-count');
const $clearall = document.querySelector('#clear-all')

$inputBox.addEventListener('keyup', function(e) {
    console.log('e.target.value: ', e.target.value);
    if (e.target.value) {
        $addBtn.classList.add('active');
    } else {
        $addBtn.classList.remove('active');
    }
});

    $addBtn.addEventListener('click', function() {
        const $li = document.createElement('li');
        const $span = document.createElement('span')
        const $i = document.createElement('i')
        $i.classList.add('fas', 'fa-trash')
        $span.classList.add('icon');
        $span.addEventListener('click', deleteTask)
        $li.textContent = $inputBox.value;
        $todolist.appendChild($li);
        $li.appendChild($span);
        $span.appendChild($i);

        // 카운트 변경
        const $itemlist = $todolist.querySelectorAll('li');
        $todocount.textContent = $itemlist.length;

        // input box clear
        $inputBox.value = '';

        //전체삭제버튼 활성화
        $clearall.classList.add('active')
    });

    function deleteTask(e) {
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
    })