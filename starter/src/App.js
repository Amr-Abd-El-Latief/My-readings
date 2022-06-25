import "./App.css";
import { useState, useEffect } from "react";
import BooksGrid from "./BooksGrid";

import SearchPage from "./SearchPage";
import NotFound from "./NotFound";
import * as BooksAPI from './BooksAPI'; 
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';


function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  useEffect(()=>{
    const getBooks = async ()=>{
      const res = await BooksAPI.getAll();
      setBooks([...res.map(b=>{return {title:b['title'],id:b['id'],authors:b['authors'],shelf:b['shelf'],previewLink:b['previewLink']}}) ]);
      console.log("from outside books : " +JSON.stringify(books))

     
    }
    getBooks();
  }
    )

  let booksList=[]
  const [books,setBooks]=useState([...booksList])
  const [searchBooks,setSearchBooks]=useState([...booksList])




const updateBookState = (book)=>{


  booksList = books.map(b=>{
   return b.id===book.id?book:b}
    
    )


  setBooks([...booksList]);

  BooksAPI.update(book,book.shelf)

}

const senQueryToAppPage=async (query)=>{
  try{
  const res = await BooksAPI.search(query);
  setSearchBooks([...res?.map(b=>{return {title:b['title'],id:b['id'],authors:b['authors'],shelf:b['shelf'],previewLink:b['previewLink']}}) ]);
  }catch(e){
    console.error(e)
  }
}

const updateBooksinApp = (book)=>{

  updateBookState(book)
}

const backToMainPage= ()=>{
 //
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
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">

                  <BooksGrid books={books.filter(b=>b.shelf==='currentlyReading')} updateBooksinApp={updateBooksinApp} />
  
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <BooksGrid books={books.filter(b=>b.shelf==='wantToRead')}  updateBooksinApp={updateBooksinApp}/>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <BooksGrid books={books.filter(b=>b.shelf==='read')} updateBooksinApp={updateBooksinApp} />
                </div>
              </div>
            </div>
          </div>
          <Link to="/search">  <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div></Link>
        </div>
      
      } />
      <Route path="/search" element={ <SearchPage books={searchBooks} updateBooksinApp={updateBooksinApp} senQueryToAppPage={senQueryToAppPage} 
        backToMainPage={backToMainPage}/>}/>
    
      <Route path="*" element={<NotFound />}/>

    </Routes>
      

    </div>
    </BrowserRouter>
  );
}

export default App;
