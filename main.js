// change text on submit button
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
const incompleteBook = document.getElementById("incompleteBookshelfList");
const completeBook = document.getElementById("completeBookshelfList");
const submit = document.getElementById("inputBook");
submit.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;
  let bookObject = {
    id: new Date(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };
  console.log(bookObject);
  const book = addBook(bookObject);
  if (isComplete) {
    completeBook.append(book);
  } else {
    incompleteBook.append(book);
  }
});

// add book function
function addBook(book) {
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
    function (book) {
      console.log(book);
      changeStatus(book.isComplete);
    }
  );

  const btnDel = createButton("red", "Hapus buku", function (event) {
    remove(event.target.parentElement.parentElement);
  });

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("action");
  btnContainer.append(btnChange, btnDel);

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(textTitle, textAuthor, textYear, btnContainer);

  return container;
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
function changeStatus(e) {
  const bookTitle = e.querySelector("h3");
  const bookAuthor = e.querySelector(".author");
  const bookYear = e.querySelector(".year");
  let bookObject = {
    id: new Date(),
    title: bookTitle,
    author: bookAuthor,
    year: bookYear,
    isComplete: isComplete,
  };
  console.log(bookObject);
  const book = addBook(bookObject);
  if (isComplete) {
    completeBook.append(book);
  } else {
    incompleteBook.append(book);
  }
  e.remove();
}

// delete book function
function remove(e) {
  e.remove();
}
