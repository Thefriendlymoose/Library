const lib = document.getElementById("library-container");



const bookName = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const desc = document.getElementById("desc");
const read = document.getElementById("read");
const addBook = document.getElementById("add-book");
const form = document.getElementById("form");

function deleteCard(card){
    myLibrary.splice(card.target.parentNode.dataset.index, 1);
    booksToDom();
    setLocalStorage();
}

function changeReadStatus(card){
    myLibrary[card.target.parentNode.parentNode.dataset.index].readBook();
    setLocalStorage();
}

let myLibrary = [];

checkIfLocalStorage();

// Book Constructor

function Book(title, author, pages, desc, read) {
    this.title = title;
    this.author = author
    this.pages = pages;
    this.desc = desc;
    this.read = read;
    this.readBook = function(){
        if(this.read){
            this.read = false;
        } else{
            this.read = true
        }
    }
}

function booksToDom(){
    while (lib.firstChild) {
        lib.removeChild(lib.lastChild);
      }
    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    })
}

function addBookToLibrary(book){
    myLibrary.push(book);
    booksToDom();
    setLocalStorage();
}

function createBookCard(book, serialNumber){
    const newContainer = document.createElement("div");
    newContainer.classList.add("book-card");
    newContainer.setAttribute("data-index", serialNumber);
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const pages = document.createElement("h4");
    const desc = document.createElement("p");
    
    const readContainer = document.createElement("div");
    const read = document.createElement("input");
    const readLabel = document.createElement("label");
    read.type = "checkbox";
    read.name = "bookread" + serialNumber;
    read.id = "bookread" + serialNumber;
    readLabel.htmlFor = "bookread" + serialNumber;
    readLabel.textContent = "Read: ";
    readContainer.classList.add("card-read");

    if(book.read){
        read.checked = true;
    } else{
        read.checked = false;
    }

    read.addEventListener("click", changeReadStatus);

    readContainer.appendChild(readLabel);
    readContainer.appendChild(read);
    
    const deleteContainer = document.createElement("div");
    const deleteBook = document.createElement("svg");
    deleteBook.classList.add("fas");
    deleteBook.classList.add("fa-times");

    deleteContainer.addEventListener("click", deleteCard);

    deleteContainer.appendChild(deleteBook);

    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = `Pages: ${book.pages}`;
    desc.innerText = book.desc;

    newContainer.appendChild(deleteContainer);
    newContainer.appendChild(title);
    newContainer.appendChild(author);
    newContainer.appendChild(pages);
    newContainer.appendChild(desc);
    newContainer.appendChild(readContainer);

    lib.appendChild(newContainer);
}

// Add new book

form.addEventListener("submit", logSubmit);

function logSubmit(event) {
    let newBook = new Book(bookName.value, author.value, pages.value, desc.value, read.checked);
    addBookToLibrary(newBook);
    event.preventDefault();
    event.target.reset();
    modal.style.display = "none";
}


// Book form popup

const modal = document.getElementById("modal")
const showForm = document.getElementById("show-form")
const closeForm = document.getElementById("close-btn")

showForm.addEventListener("click", openModal)
closeForm.addEventListener("click", closeModal)
window.addEventListener("click", outsideClick);

function openModal(){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}

function outsideClick(e){
    if(e.target == modal){
        modal.style.display = "none";
    }
    
}

// LOCAL STORAGE   

function setLocalStorage(){
    localStorage.clear();
    myLibrary.forEach((book, index) => {
        localStorage.setItem(index, JSON.stringify(book));
    });
}

function checkIfLocalStorage(){
    if(localStorage.getItem("0") === null){

    } else{
        for(let i = 0; i<localStorage.length; i++){
            let book = JSON.parse(localStorage.getItem(i))
            let createBook = new Book(book.title, book.author, book.pages, book.desc, book.read);
            myLibrary.push(createBook);
        }
    }
    booksToDom();
}