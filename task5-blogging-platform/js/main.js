const add = document.getElementById('submit');
const reset = document.getElementById('reset');
const dels = document.querySelectorAll('.delete');
const edit = document.querySelectorAll('.edit');
let title = document.getElementById('blog-head');
let body = document.getElementById('blog-body');
const blogList = document.getElementById('b-list');

add.addEventListener('click', addNewBlog);
reset.addEventListener('click', resetContent);
blogList.addEventListener('click', deleteEditBlog);

function addNewBlog(e) {
    e.preventDefault();

    console.log(e.target.value);

    const li = document.createElement('li');
    li.innerHTML =
        `<div class="title"><h3>${title.value}</h3></div>
        <div class="body"><p>${body.value}</p></div>
        <div class="btn">
            <button class="delete">Delete</button>
            <button class="edit">Edit</button>
        </div>`;
    document.querySelector('ul').appendChild(li);
}

function resetContent(e) {
    title.value = '';
    body.value = '';
    add.textContent = 'submit';
}

function deleteEditBlog(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var li = e.target.parentElement.parentElement;
            blogList.removeChild(li);
        }
    }
    if (e.target.classList.contains('edit')) {
        const li = e.target.parentElement.parentElement;
        const new_title = li.querySelector('h3').textContent;
        const new_body = li.querySelector('p').textContent;

        document.getElementById('blog-head').value = new_title;
        document.getElementById('blog-body').value = new_body;

        add.textContent = 'update';
    }
}