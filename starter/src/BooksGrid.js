import React from 'react'
import Book from './Book'

function BooksGrid({books,updateBooksinApp}) {
   // console.log("BooksGrid >> books : " +JSON.stringify(books));
    const updateBookStateInGrid = (book)=>{
     books = books?.map(b=>b.id===book.id?book:b)
      updateBooksinApp(book)
    }
  return (
    <ol className="books-grid">
   {books?.map((book)=>  <li key={book.id}> <Book book={book} updateBookStateInGrid = {updateBookStateInGrid}/> </li>)}

   </ol>
  )
}

export default BooksGrid