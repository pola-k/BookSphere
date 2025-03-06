import "./List.css"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import ListBook from "../../components/ListBook/Listbook.jsx";
import {books} from "../../../book_data.js"
import { useState } from "react";

export default function List() {

    const [bookList, setBookList] = useState(books.filter(book => book.added))
    
    const bookListComponents = bookList.map(book => <ListBook
                                                    key={book.id}                   
                                                    id={book.id}
                                                    image={book.image}
                                                    title={book.title}
                                                    remove={removeFromList}/>)

    function removeFromList(bookToRemoveID)
    {
        const updatedBooks = books.map(book => book.id === bookToRemoveID ? { ...book, added: false } : book)
        books.splice(0, books.length, ...updatedBooks)
        setBookList(prev => prev.filter(book => book.id !== bookToRemoveID))
    }

    return (
        <>
            <div className='list-container'>
                <Navbar />
                <div className='list-main-container'>
                    <div className='sidebar-container'>
                        <Sidebar />
                    </div>
                    <div className='content-container'>
                        {bookListComponents}
                    </div>
                </div>
            </div>
        </>
    );
}
