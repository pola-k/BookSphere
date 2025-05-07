import "./List.css"
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import ListBook from "../../components/ListBook/Listbook.jsx";
import { useState , useEffect} from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";

export default function List() {

    const userId = sessionStorage.getItem("user_id");
    const [bookList, setBookList] = useState([])
    const [loading, setLoading] = useState(true);
    const[notification, setNotification] = useState("")

    useEffect(() => {
        const fetchUserList = async () => {
            if(userId === null)
            {
                setLoading(false)
                return
            }
            try 
            {
                const response = await axios.get(`http://localhost:5001/api/list/getUserList/`, {
                    params: {
                        user_id: userId,
                    }
                });
    
                if (response.data.length !== 0) 
                {
                    setBookList(response.data);
                } 
                else 
                {
                    setBookList([]);
                }
            } 
            catch (err) 
            {
                console.error("Error in Fetching User List:", err);
                setBookList([]);
            } 
            finally 
            {
                setLoading(false); 
            }
        };
    
        fetchUserList();
    }, [userId]);
        
    useEffect(() => {
        if(notification !== "")
        {
            setTimeout(() => {
                setNotification("");
            }, 3000);
        }
    },[notification])

    const bookListComponents = bookList ? bookList.map(book => <ListBook
                                                    key={book.id}                   
                                                    id={book.id}
                                                    image={book.image}
                                                    title={book.title}
                                                    remove={removeFromList}/>) : null

    async function removeFromList(bookToRemoveID)
    {
        if(userId === null)
        {
            return;
        }
        try
        {
            const book_status = await axios.delete(`http://localhost:5001/api/list/removeBookFromList/`, {
                params: {
                    user_id: userId,
                    book_id: bookToRemoveID
                }
            });

            if(book_status.status === 200)
            {
                setNotification("Book Removed from List Successfully")
            }
        }
        catch (err)
        {
            console.error("Error in Removing Book from List:", err);
        }
        finally
        {
            const updatedBookList = bookList.filter(book => book.id !== bookToRemoveID)
            setBookList(updatedBookList)
            setLoading(false);
        }
    }

    if (loading) 
    {
        return (
            <Loading />
        )
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
                    {bookList.length > 0 ? (
                        <div className="content-container">
                            {bookListComponents}
                        </div>
                    ) : (
                        <div className="no-books-container">
                            <h1 className="no-books">{userId === null ? "Login to View List" : "No Books in List"}</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
