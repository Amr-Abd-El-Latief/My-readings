import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function SearchForm(props) {

  const [query, setQuery] = useState("");

  const updateQuery = (query) => {
    if (query === undefined) {
      query = "";
    }
    setQuery(query);
    props.senQueryToSearchPage(query);

  };



  return (
    <div className="search-books-bar">
      <Link to="/"
        className="close-search" >
        Close
      </Link>

      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"

          value={query}
          onChange={(event) => { updateQuery(event.target.value); }}
        />
      </div>
    </div>
  )
}

export default SearchForm