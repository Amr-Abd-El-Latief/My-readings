import React, { useState } from 'react'
import {Link } from 'react-router-dom';

function SearchForm(props) {

    const [query,setQuery] = useState("");

    const updateQuery = (query) => {
        if(query===undefined){
            query = "";
        }
        setQuery(query.trim());
        props.senQueryToSearchPage(query.trim());

      };



   return (
    <div className="search-books-bar">
         <Link to="/"> <a
      className="close-search"
      
    >
      Close
    </a></Link>
   
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title, author, or ISBN"

        value={query}
        onChange={(event)=>{updateQuery(event.target.value);}}
      />
    </div>
  </div>
  )
}

export default SearchForm