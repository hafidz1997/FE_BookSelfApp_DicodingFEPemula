// load book function
window.addEventListener("load", function () {
  (books = JSON.parse(localStorage.getItem("books")) || []), addBook(books);
  document.addEventListener("setBookEvent", setBook);
});

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
submit.addEventListener("submit", function (e) {
  e.preventDefault();
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

// search book
const search = document.getElementById("searchBook");
search.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchVal = document.getElementById("searchBookTitle").value;
  console.log(searchVal);
  searchVal
    ? addBook(
        books.filter(function (e) {
          return e.title.toLowerCase().includes(searchVal.toLowerCase());
        })
      )
    : addBook(books);
});

// add book function
function addBook(books) {
  (completeBook.innerHTML = ""), (incompleteBook.innerHTML = "");
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
      book.id,
      book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca",
      function (e) {
        changeStatus(e);
      }
    );

    const btnDel = createButton("red", book.id, "Hapus buku", function (e) {
      remove(e);
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

// save and show book function
function setBook() {
  !(function (books) {
    localStorage.setItem("books", JSON.stringify(books));
  })(books),
    addBook(books);
}

// button function
function createButton(btnClass, btnId, btnTxt, eventListener) {
  const button = document.createElement("button");
  button.classList.add(btnClass);
  button.id = btnId;
  button.innerText = btnTxt;
  button.addEventListener("click", function (e) {
    eventListener(e);
  });
  return button;
}

// change status function
function changeStatus(e) {
  const pop = confirm("Apakah anda yakin akan mengubah status buku?");
  if (pop) {
    const btnId = Number(e.target.id);
    const bookTarget = books.find((x) => x.id === btnId);
    bookTarget.isComplete = !bookTarget.isComplete;
    document.dispatchEvent(new Event("setBookEvent"));
  } else {
    return 0;
  }
}

// delete book function
function remove(e) {
  const pop = confirm("Apakah anda yakin akan menghapus buku ?");
  if (pop) {
    const btnId = Number(e.target.id);
    books = books.filter((x) => x.id != btnId);
    document.dispatchEvent(new Event("setBookEvent"));
  } else {
    return 0;
  }
}
