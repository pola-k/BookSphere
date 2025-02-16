import "./List.css"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import ListBook from "../../components/ListBook/Listbook.jsx";
import { useState } from "react";

export default function List() {

    const[bookList, setBookList] = useState(() => getBookList())
    const bookListComponents = bookList.map(book => <ListBook
                                                    key={book.id}                   
                                                    id={book.id}
                                                    image={book.image}
                                                    title={book.title}
                                                    remove={removeFromList}/>)

    function getBookList()
    {
        return [
            {
                "id": 1,
                "title": "Sherlock Holmes and the Hounds of Baskerville",
                "author": ["Arthur Conan Doyle"],
                "year": 1902,
                "genre": ["Mystery", "Detective"],
                "image": "../../../src/images/sherlock-hounds-of-baskerville.jpg",
            },
            {
                "id": 2,
                "title": "Harry Potter and the Deathly Hallows",
                "author": ["J.K. Rowling"],
                "year": 2007,
                "genre": ["Fantasy", "Adventure"],
                "image": "../../../src/images/harry-potter-deathly-hallows.jpeg",
            },
            {
                "id": 3,
                "title": "Beyond Good and Evil",
                "author": ["Friedrich Nietzsche"],
                "year": 1886,
                "genre": ["Philosophy", "Non-fiction"],
                "image": "../../../src/images/beyond-good-and-evil.jpg",
            },
            {
                "id": 4,
                "title": "The Old Man and the Sea",
                "author": ["Ernest Hemingway"],
                "year": 1952,
                "genre": ["Fiction", "Classic"],
                "image": "../../../src/images/the-old-man-and-the-sea.jpg",
            },
            {
                "id": 5,
                "title": "Sherlock Holmes and the Hounds of Baskerville",
                "author": ["Arthur Conan Doyle"],
                "year": 1902,
                "genre": ["Mystery", "Detective"],
                "image": "../../../src/images/sherlock-hounds-of-baskerville.jpg",
            },
            {
                "id": 6,
                "title": "Harry Potter and the Deathly Hallows",
                "author": ["J.K. Rowling"],
                "year": 2007,
                "genre": ["Fantasy", "Adventure"],
                "image": "../../../src/images/harry-potter-deathly-hallows.jpeg",
            },
            {
                "id": 7,
                "title": "Beyond Good and Evil",
                "author": ["Friedrich Nietzsche"],
                "year": 1886,
                "genre": ["Philosophy", "Non-fiction"],
                "image": "../../../src/images/beyond-good-and-evil.jpg",
            },
            {
                "id": 8,
                "title": "The Old Man and the Sea",
                "author": ["Ernest Hemingway"],
                "year": 1952,
                "genre": ["Fiction", "Classic"],
                "image": "../../../src/images/the-old-man-and-the-sea.jpg",
            },
            {
                "id": 9,
                "title": "Sherlock Holmes and the Hounds of Baskerville",
                "author": ["Arthur Conan Doyle"],
                "year": 1902,
                "genre": ["Mystery", "Detective"],
                "image": "../../../src/images/sherlock-hounds-of-baskerville.jpg",
            },
            {
                "id": 10,
                "title": "Harry Potter and the Deathly Hallows",
                "author": ["J.K. Rowling"],
                "year": 2007,
                "genre": ["Fantasy", "Adventure"],
                "image": "../../../src/images/harry-potter-deathly-hallows.jpeg",
            },
            {
                "id": 11,
                "title": "Beyond Good and Evil",
                "author": ["Friedrich Nietzsche"],
                "year": 1886,
                "genre": ["Philosophy", "Non-fiction"],
                "image": "../../../src/images/beyond-good-and-evil.jpg",
            },
            {
                "id": 12,
                "title": "The Old Man and the Sea",
                "author": ["Ernest Hemingway"],
                "year": 1952,
                "genre": ["Fiction", "Classic"],
                "image": "../../../src/images/the-old-man-and-the-sea.jpg",
            },
        ]        
    }

    function removeFromList(bookToRemoveID)
    {
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
