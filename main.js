// change text on check button
const submitTxt = document.getElementById("bookSubmit").childNodes[1];
const completeBox = document.getElementById("inputBookIsComplete");
completeBox.addEventListener("change", function () {
  let isChecked = this.checked;
  if (isChecked) {
    submitTxt.innerText = "Selesai dibaca";
  } else {
    submitTxt.innerText = "Belum selesai dibaca";
  }
});

// submit new book
let books = [];
const incompleteBook = document.getElementById("incompleteBookshelfList");
const completeBook = document.getElementById("completeBookshelfList");
const submit = document.getElementById("inputBook");
submit.addEventListener("submit", function () {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;
  let bookObject = {
    id: +new Date(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };
  books.push(bookObject);
  document.dispatchEvent(new Event("setBookEvent"));
});

// add book function
function addBook(books) {
  books.forEach((book) => {
    const textTitle = document.createElement("h3");
    textTitle.innerText = book.title;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("author");
    textAuthor.innerText = `Penulis: ${book.author}`;

    const textYear = document.createElement("p");
    textAuthor.classList.add("year");
    textYear.innerText = `Tahun: ${book.year}`;

    const btnChange = createButton(
      "green",
      book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca",
      function (e) {
        console.log(book.isComplete);
        changeStatus(e.target.parentElement.parentElement, book.isComplete);
      }
    );

    const btnDel = createButton("red", "Hapus buku", function (e) {
      remove(e.target.parentElement.parentElement);
    });

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("action");
    btnContainer.append(btnChange, btnDel);

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(textTitle, textAuthor, textYear, btnContainer);

    if (book.isComplete) {
      completeBook.append(container);
    } else {
      incompleteBook.append(container);
    }
  });
}

// load book function
window.addEventListener("load", function () {
  (books = JSON.parse(localStorage.getItem("books")) || []), addBook(books);
  document.addEventListener("setBookEvent", setBook);
});
function setBook() {
  !(function (books) {
    localStorage.setItem("books", JSON.stringify(books));
  })(books),
    addBook(books);
}

// button function
function createButton(btnClass, btnTxt, eventListener) {
  const button = document.createElement("button");
  button.classList.add(btnClass);
  button.innerText = btnTxt;
  button.addEventListener("click", function (e) {
    eventListener(e);
  });
  return button;
}

//  function
function changeStatus(e, status) {
  const bookTitle = e.querySelector("h3").innerText;
  const bookAuthor = e.querySelector(".author").innerText;
  const bookYear = e.querySelector(".year").innerText;
  let bookObject = {
    id: +new Date(),
    title: bookTitle,
    author: bookAuthor,
    year: bookYear,
    isComplete: status,
  };
  const book = addBook(bookObject);
  if (status) {
    incompleteBook.append(book);
  } else {
    completeBook.append(book);
  }
  e.remove();
}

// delete book function
function remove(e) {
  e.remove();
}
