const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = this.read === "Read" ? "Not Read" : "Read";
};

const newBtn = document.getElementById('newBtn');
const form = document.getElementById('bookForm');

newBtn.addEventListener('click', () => {
  form.style.display = form.style.display === 'block' ? 'none' : 'block';
});

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBook(); 
}

function removeBook(id) {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.classList.add('removing');
        setTimeout(() => {
            const index = myLibrary.findIndex(book => book.id === id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayBook();
            }
        }, 300); 
    }
}


function displayBook() {
  const container = document.querySelector('.Library-container');
  container.innerHTML = ''; 

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('books');
    card.setAttribute('data-id', book.id);

    const titleEl = document.createElement('h2');
    const authorEl = document.createElement('p');
    const pagesEl = document.createElement('p');
    const readEl = document.createElement('p');
    const removeBtn = document.createElement('button');
    const toggleBtn = document.createElement('button');

    titleEl.textContent = book.title;
    authorEl.textContent = `By: ${book.author}`;
    pagesEl.textContent = `Pages: ${book.pages}`;
    readEl.textContent = `Status: ${book.read}`;
    readEl.classList.add('read-status', book.read === "Read" ? "read" : "not-read");

    
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      card.classList.add('removing');
      setTimeout(() => {
        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1) {
          myLibrary.splice(index, 1);
          displayBook();
        }
      }, 300);
    });

    
    toggleBtn.textContent = 'Toggle Read';
    toggleBtn.addEventListener('click', () => {
      book.toggleRead();
      readEl.textContent = `Status: ${book.read}`;
      readEl.classList.toggle('read');
      readEl.classList.toggle('not-read');
      readEl.classList.add('pulse');
      setTimeout(() => readEl.classList.remove('pulse'), 500);
    });

    
    card.appendChild(titleEl);
    card.appendChild(authorEl);
    card.appendChild(pagesEl);
    card.appendChild(readEl);
    card.appendChild(toggleBtn);
    card.appendChild(removeBtn);

    container.appendChild(card);
  });
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "Read");
addBookToLibrary("Harry Potter", "J.K. Rowling", 500, "Not Read");
