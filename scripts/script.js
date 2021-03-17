const lib = document.getElementById("library-container");



const bookName = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const desc = document.getElementById("desc");
const read = document.getElementById("read");
const addBook = document.getElementById("add-book");
const form = document.getElementById("form");



let myLibrary = [];

function Book(title, author, pages, desc, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.desc = desc;
    this.read = read;
    readBook = function(){

    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
    createBookCard(book);
}

function createBookCard(book){
    const newContainer = document.createElement("div");
    newContainer.classList.add("book-card");
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const pages = document.createElement("h4");
    const desc = document.createElement("p");
    const read = document.createElement("p");


    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = `Pages: ${book.pages}`;
    desc.innerText = book.desc;
    read.innerText = book.read;

    newContainer.appendChild(title);
    newContainer.appendChild(author);
    newContainer.appendChild(pages);
    newContainer.appendChild(desc);
    newContainer.appendChild(read);

    lib.appendChild(newContainer);
}

function logSubmit(event) {
    let newBook = new Book(bookName.value, author.value, pages.value, desc.value, read.checked);
    addBookToLibrary(newBook);
    event.preventDefault();
    event.target.reset();

  }

form.addEventListener("submit", logSubmit);


