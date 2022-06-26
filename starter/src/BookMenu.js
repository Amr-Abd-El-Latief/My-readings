import React from 'react'

function BookMenu({currentState,updateBookState}) {

  return (
 
    <select  value={currentState===undefined?'none':currentState}   onChange={(event)=>updateBookState(event.target.value)}>
    <option value="no" disabled>
      Move to...
    </option>
    <option value="currentlyReading">
      Currently Reading
    </option>
    <option value="wantToRead">Want to Read</option>
    <option value="read">Read</option>
    <option value="none" >None</option>
  </select>
  )
}

export default BookMenu