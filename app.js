/* Read: <input type="checkbox" name="fruit" class="myCheck" ${book.read}>

var parent = document.querySelector(".card-container");
var nodesSameClass = parent.getElementsByClassName("book-card");

var elements = document.querySelectorAll("input[type=button]"); 

elements.onclick = console.log(nodesSameClass.length); 

showChecked();
function showChecked(){
  document.getElementById("counter").textContent = document.querySelectorAll("input:checked").length;
}
document.querySelectorAll("input[name=fruit]").forEach(i=>{
 i.onclick = function(){
  showChecked();
 }
});

function bookStatus() {

}
 */
var readBooks = [];
var notReadBooks = [];

let myLibrary = [
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
        totalpages: 448,
        completedpages: 448,
        read: true
      },
      {
        title: 'New Book',
        author: 'Arthur Author',
        totalpages: 150,
        completedpages: 0,
        read: false
      },
      {
        title: 'A Great Title',
        author: 'John Writer',
        totalpages: 275,
        completedpages: 12,
        read: false
      }  
];

function Book(title, author, totalpages, id, read) {
    this.title = title;
    this.author = author;
    this.totalpages = totalpages;
    this.id = id;
    this.read = read;
}


function addBookToLibrary() {
var books = getBooks();
books.forEach((book) => addBookToList(book));
}


function addBookToList(book) {
    var listContainer = document.querySelector('.card-container');

    var listItem = document.createElement('div');
    listItem.classList.add('book-card')
    listItem.innerHTML = `

        <div class="title-text">${book.title}</div>
        <div class="author-text">${book.author}</div>
        <div class="toPage">${book.totalpages} pages</div>
        <h4 class="readHeader">${book.read}</h4>
        <div class="hidden">${book.id}</div>
        <button class="delete">Delete</button>
        <button class="edit">Edit</button>
    `;
    listContainer.appendChild(listItem);
    count = 0;
    if (book.read === 'Yes') {
      readBooks.push('Yes');
      listItem.classList.add('completed')
    }
  }

/*   function editBookList(book){
    if (document.getElementById('readHeader').innerHTML === 'yes') {
      document.getElementById('readHeader').innerHTML = "no";
      book.read = "no";
      localStorage.setItem("books", JSON.stringify(books));
    }
  } */

      function getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
      }

      function addBooks(book){
        const books = getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
      }

      function removeBook(id) {
        const books = getBooks();
    
        books.forEach((book, index) => {
          if(book.id == id) {
            books.splice(index, 1);
          }
        });

        localStorage.setItem('books', JSON.stringify(books));
      }

      function updateBook(id) {
        const books = getBooks();

        books.forEach(book => {
          if(book.id == id){
            if(book.read === 'Yes') {
              book.read = 'No';
            } else if(book.read === 'No') {
              book.read = 'Yes'
            }
        }
        });

        localStorage.setItem('books', JSON.stringify(books));
          }

  
document.getElementById('getForm').addEventListener('click', () => {
  document.querySelector('.form-container').style.display = 'block';

});

document.querySelector('.cancel-btn').addEventListener('click', () => {
  document.querySelector('.form-container').style.display = 'none';
})
document.addEventListener('DOMContentLoaded', () => {
  checkBookStatus();
  addBookToLibrary();
  checkReadStatus();
}); 

document.querySelector('.card-container').addEventListener('click', (e) => {

  editBook(e.target)
  deleteBook(e.target);

  removeBook(e.target.previousElementSibling.textContent);
  checkBookStatus()
  checkReadStatus()

  updateBook(e.target.previousElementSibling.previousElementSibling.textContent)

  checkStyle(e.target)

})

document.querySelector('#submitForm').addEventListener('submit', (e) => {

    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const totalpages = document.getElementById('totalPages').value;
    const id = Date.now();
    const read = document.getElementById('readStatus').value;

    if (title === "" || author === "" || totalpages === "") {
        alert('Please fill all field');
    }else {       
        const book = new Book(title, author, totalpages, id, read)
        addBookToList(book);
        addBooks(book);
        document.getElementById('submitForm').reset();
        document.querySelector('.form-container').style.display = 'none';
        checkBookStatus()
        checkReadStatus()
        console.log(readBooks.length);
    }

    document.getElementById('submitForm').reset();


})


function deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.remove();
      readBooks.shift();
    }
  }

function editBook(el) {

  if(el.classList.contains('edit')) {
    if(el.previousElementSibling.previousElementSibling.previousElementSibling.textContent == 'Yes') {
      el.previousElementSibling.previousElementSibling.previousElementSibling.textContent = 'No';
      readBooks.shift();

      checkReadStatus()
    } else if (el.previousElementSibling.previousElementSibling.previousElementSibling.textContent == 'No') {
      el.previousElementSibling.previousElementSibling.previousElementSibling.textContent = 'Yes';
      readBooks.push('yes');
      checkReadStatus()

    }
  }
}

function checkBookStatus() {
  const books = getBooks();
  document.getElementById('counter1').textContent = books.length;
}

function checkReadStatus() {
  document.getElementById('counter2').textContent = readBooks.length;
}

function checkStyle(el) {
  if(el.previousElementSibling.previousElementSibling.previousElementSibling.textContent == 'Yes') {
    el.parentElement.classList.add('completed');
  } else if (el.previousElementSibling.previousElementSibling.previousElementSibling.textContent == 'No') {
    el.parentElement.classList.remove('completed');
  }
}