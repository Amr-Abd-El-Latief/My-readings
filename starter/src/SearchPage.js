import React, { useState } from 'react'
import BooksGrid from './BooksGrid'
import SearchForm from './SearchForm'

function SearchPage(props) {

  const [shownBooks,setShownBooks] = useState([]);
  //console.log("search page >>> books " + JSON.stringify(props));

  const updateBooks = (sBooks)=>{
     setShownBooks(sBooks);
  }

  const senQueryToSearchPage = (query)=>{
    props.senQueryToAppPage(query);
 }
  

 const  updateBooksinSearchPage= (book)=>{
    props.updateBooksinApp(book)
  }



  return (
    <div className="search-books">
     <SearchForm books={props.books} updateBooks={updateBooks} senQueryToSearchPage = {senQueryToSearchPage} 
     />
    <div className="search-books-results">
     {props.books.length>=1 && <BooksGrid books={props.books}  updateBooksinApp={updateBooksinSearchPage} />}
     {props.books.length<=0 && <h1>No Matching Books! </h1>}
    </div>
  </div>
  )
}

export default SearchPage