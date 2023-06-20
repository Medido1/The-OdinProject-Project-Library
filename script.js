function Book(title, author, pages, status){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.index = incrementValue();
}

function incrementValue() {
  if (typeof incrementValue.counter === 'undefined') {
    incrementValue.counter = 0;
  }
  
  incrementValue.counter++;
  return incrementValue.counter;
}


let myLibrary = [];

const addBtn = document.getElementById("add_btn");
const newBookForm = document.getElementById("new_book_form");
const library = document.getElementById("library");
const emptyLibraryText = document.querySelector(".empty_library");

addBtn.addEventListener("click",showBookForm);
newBookForm.addEventListener("submit", displayBook);

function displayBook(e){
  e.preventDefault();
  newBookForm.classList.add("hide");
  const newBook = getBookInfo();
  myLibrary.push(newBook);
  const index = myLibrary.length - 1;
  
  library.appendChild(createBookCard(myLibrary[index]));
  updateLibraryCount(myLibrary);
  emptyLibraryText.classList.add("hide");
  newBookForm.reset();
}

function showBookForm(){
  newBookForm.classList.remove("hide");
}

function getBookInfo(){
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const statusCheck = document.getElementById("status");
  let status;
  if (statusCheck.checked){
    status = "read";
  }
  else {
    status = "not read";
  }
  return new Book(title, author, pages, status);
}

function createBookCard(book){
  const card = document.createElement("div");
  const title = document.createElement("span");
  const author = document.createElement("span");
  const pages = document.createElement("span");
  const status = document.createElement("button");
  const removeBtn = document.createElement("button");
  const index = book.index;
  
  title.textContent = `${book.title}`;
  author.textContent = `Author : ${book.author}`; 
  pages.textContent = `Pages: ${book.pages}`;

  status.addEventListener("click", () => changeBookStatus(book, status, card));
  status.textContent = `${getBookStatus(book)}`
  status.classList.add("btn");
  if (status.textContent === "read"){
    status.classList.add("read_btn");
    card.classList.add("read_card");
  }
  else if (status.textContent === "not read"){
    status.classList.add("not_read_btn");
    card.classList.add("not_read_card");
  }

  removeBtn.classList.add("btn");
  removeBtn.textContent = "Delete Book";
  removeBtn.addEventListener("click", () => removeBook(index, card));
  
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(status);
  card.appendChild(removeBtn);
  return card;
}

function getBookStatus(book){
  if (book.status === "read"){
    return "read";
  }
  else return "not read";
}

function changeBookStatus(book, status, card){
  card.classList.remove("read_card", "not_read_card");
  status.classList.remove("read_btn", "not_read_btn");
  if (book.status === "read"){
    book.status = "not read";
    status.classList.add("not_read_btn");
    card.classList.add("not_read_card");
  }
  else if (book.status === "not read"){
    book.status = "read";
    status.classList.add("read_btn");
    card.classList.add("read_card");
  }
  status.textContent = `${book.status}`;
  updateLibraryCount(myLibrary);
}

function removeBook(value, card){
  for (let i = 0; i < myLibrary.length; i++){
    if (myLibrary[i].index === value){
      myLibrary.splice(i, 1);
      break;
    }
  }
  library.removeChild(card);
  updateLibraryCount(myLibrary);
} 

function updateLibraryCount(myLibrary){
  const total = document.querySelector(".total_books");
  const read = document.querySelector(".read_books");
  const notRead = document.querySelector(".not_read_books");
  let booksRead = 0;
  let booksNotRead = 0;

  for (let i = 0; i < myLibrary.length; i++){
    if (myLibrary[i].status === "read"){
      booksRead ++
    }
    else if (myLibrary[i].status === "not read"){
      booksNotRead ++
    }
  }

  total.textContent = `Total : ${myLibrary.length}`;
  read.textContent = `Read : ${booksRead}`;
  notRead.textContent = `Not read: ${booksNotRead}`;

  if (myLibrary.length < 1){
    emptyLibraryText.classList.remove("hide");
  }
}