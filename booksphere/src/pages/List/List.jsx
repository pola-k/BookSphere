import "./List.css"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import ListBook from "../../components/ListBook/Listbook.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import InfiniteScroll from "../../components/infinite-scroll.jsx";

export default function List() {

    const userId = sessionStorage.getItem("user_id");
    const [bookList, setBookList] = useState([])
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState("")

    const fetchUserList = async (pageNum, objectLimit) => {

        if (userId === null)
            return []

        try {
            const response = await axios.get(`http://localhost:5001/api/list/getUserList/`, {
                params: {
                    user_id: userId,
                    page: pageNum,
                    limit: objectLimit,
                }
            });

            if (response.data.length > 0)
                setBookList(response.data)

            return response.data;
        }
        catch (err) {
            throw err;
        }
    };

    const renderUserList = (books, lastElementRef, hasMore) => {

        const bookListComponents = books ? books.map((bookObject, index) =>
            <div key={bookObject.id} ref={books.length === index + 1 && hasMore ? lastElementRef : null}>
                <ListBook
                    id={bookObject.id}
                    image={bookObject.image}
                    title={bookObject.title}
                    remove={removeFromList} />
            </div>
        ) :

            null;

        return (
            books.length > 0 ? (
                <div className="content-container">
                    {bookListComponents}
                </div>
            ) : (
                <div className="no-books-container">
                    <h1 className="no-books">{userId === null ? "Login to View List" : "No Books in List"}</h1>
                </div>
            )
        )
    }

    useEffect(() => {
        if (notification !== "") {
            setTimeout(() => {
                setNotification("");
            }, 3000);
        }
    }, [notification])


    async function removeFromList(bookToRemoveID) {
        if (userId === null) {
            return;
        }
        try {
            const book_status = await axios.delete(`http://localhost:5001/api/list/removeBookFromList/`, {
                params: {
                    user_id: userId,
                    book_id: bookToRemoveID
                }
            });

            if (book_status.status === 200) {
                setNotification("Book Removed from List Successfully")
            }
        }
        catch (err) {
            console.error("Error in Removing Book from List:", err);
        }
        finally {
            const updatedBookList = bookList.filter(book => book.id !== bookToRemoveID)
            setBookList(updatedBookList)
            setLoading(false);
        }
    }

    return (
        <>
            <div className='list-container'>
                <Navbar />
                <div className='list-main-container'>
                    <div className='sidebar-container'>
                        <Sidebar />
                    </div>
                    {notification && (
                        <div className="notification-container">
                            <div className="notification">{notification}</div>
                        </div>
                    )}
                    <div className="overflow-y-auto">
                        <InfiniteScroll fetchObjects={fetchUserList} renderObjects={renderUserList} />
                    </div>
                </div>
            </div>
        </>
    );
}
