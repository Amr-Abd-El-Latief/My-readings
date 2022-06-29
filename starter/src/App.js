import "./App.css";
import { useState, useEffect } from "react";
import BookShelf from "./BookShelf";

import SearchPage from "./SearchPage";
import NotFound from "./NotFound";
import * as BooksAPI from './BooksAPI';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  let booksList = [];
  const [books, setBooks] = useState([...booksList])
  const [searchBooks, setSearchBooks] = useState([...booksList])


  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      const validatedRes = Array.isArray(res)?res:[];
     // console.log("from outside books : " + JSON.stringify(res))
      setBooks([...validatedRes]);
      // console.log("from outside books : " +JSON.stringify(books))

    }
    getBooks();
  }, [])

  const updateBookState = (book) => {
    booksList = books.map(b => {
      return b.id === book.id ? book : b
    }
    )
    setBooks([...booksList]);

    BooksAPI.update(book, book.shelf);


  }
  

  const senQueryToAppPage = async (query) => {
    try {
      const res = await BooksAPI.search(query.trim());
      let retrievedSearchBooks =Array.isArray(res)?[...res?.filter(b => b['imageLinks'] !== undefined && b['imageLinks']['thumbnail'] !== undefined)]:[];
      retrievedSearchBooks = addShelfState(retrievedSearchBooks)
      setSearchBooks(retrievedSearchBooks);
    } catch (e) {
      console.error(e)
    }
  }

  const addShelfState = (bookList) => {
    return bookList.map(b => {
      b['shelf'] = books.filter(c => c.id === b.id)[0]?.shelf;
      return b;
    })

  }

  return (

    <BrowserRouter>
      <div className="app">

        <Routes>
          <Route path="/" element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf books={books.filter(b => b.shelf === 'currentlyReading')} bookShelfTitle='Currently Reading' updateBooksinApp={updateBookState} />

                  <BookShelf books={books.filter(b => b.shelf === 'wantToRead')} bookShelfTitle='Want to Read' updateBooksinApp={updateBookState} />

                  <BookShelf books={books.filter(b => b.shelf === 'read')} bookShelfTitle='Read' updateBooksinApp={updateBookState} />
                </div>
              </div>
              <Link to="/search">  <div className="open-search">
                <a href='true'>Add a book</a>
              </div></Link>
            </div>

          } />
          <Route path="/search" element={<SearchPage books={searchBooks} updateBooksinApp={updateBookState} senQueryToAppPage={senQueryToAppPage}
          />} />

          <Route path="*" element={<NotFound />} />

        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
