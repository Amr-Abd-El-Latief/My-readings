import React, { useState } from 'react'
import BookMenu from './BookMenu'

function Book({book,updateBookStateInGrid}) {
    console.log("book : " + JSON.stringify(book))
    const [bookCopy,setBook] = useState({...book})

    const updateBookState = (bookState)=>{
      bookCopy['shelf'] = bookState;
      setBook(bookCopy)
     
      updateBookStateInGrid(bookCopy)
    }
  return (
    <div className="book">
    <div className="book-top">
      <img
        className="book-cover"

        src={book?.previewLink}

        style={{
          backgroundImage:
          `url(${book?.previewLink})`,
          width: 128,
          height: 193
      
        }}
      ></img>
      <div className="book-shelf-changer">
        <BookMenu currentState={book.shelf} updateBookState={updateBookState} />

      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors?.map((author)=><p>{author}</p>)}</div>
  </div>
  )
}

export default Book