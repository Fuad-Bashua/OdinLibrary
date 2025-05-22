const newBtn = document.getElementById('newBtn');
const form = document.querySelector('form');

newBtn.addEventListener('click', () => {
    form.style.display = 'block';
});

form.addEventListener('submit', (e) => {
  e.preventDefault(); 

 
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  displayBook();
  form.reset(); 
});



const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book1 = new Book(title, author, pages, read);
    myLibrary.push(book1)
    

  
}

function displayBook() {
  const container = document.querySelector('.Library-container');
  container.innerHTML = ""; 

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const card = document.createElement('div');
    card.classList.add('books');

    const titleEl = document.createElement('h2');
    const authorEl = document.createElement('p');
    const pagesEl = document.createElement('p');
    const readEl = document.createElement('p');

    titleEl.textContent = `Title: ${book.title}`;
    authorEl.textContent = `Author: ${book.author}`;
    pagesEl.textContent = `Pages: ${book.pages}`;
    readEl.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

    card.appendChild(titleEl);
    card.appendChild(authorEl);
    card.appendChild(pagesEl);
    card.appendChild(readEl);

    container.appendChild(card);
        
    }
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "Read")
addBookToLibrary("Harry Potter", "J.K Rowling", 2310, "Read")
displayBook()

