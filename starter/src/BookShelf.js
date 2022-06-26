import React from 'react'
import BooksGrid from './BooksGrid';

function BookShelf({books,bookShelfTitle,updateBooksinApp}) {
    const updateBookStateInShelf= (book)=>{
        updateBooksinApp(book)
    }
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{bookShelfTitle}</h2>
    <div className="bookshelf-books">

      <BooksGrid books={books} updateBooksinApp={updateBookStateInShelf} />

    </div>
  </div>
  )
}

export default BookShelf