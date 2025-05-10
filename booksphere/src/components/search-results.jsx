import { useLocation } from 'react-router-dom';
import "./ListBook/Listbook.css"
import ListBook from './ListBook/Listbook.jsx';
import InfiniteScroll from './infinite-scroll copy.jsx';
import axios from 'axios';

export default function SearchResults() {

  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search).get('query');

  const fetchResults = async (pageNum, objectLimit) => {

    try {

      const res = await axios.get('http://localhost:5001/api/auth/search', {
        params: {
          query: searchQuery,
          page: pageNum,
          limit: objectLimit,
        },
        withCredentials: true,
      });

      const searchResults = res.data.books || [];
      return searchResults;

    } catch (error) {
      throw error
    }
  }

  const renderResults = (books, lastElementRef, hasMore) => {

    return (
      <div className="p-[1vw]">
        <h2 className="text-[2.5vw] text-[var(--headingcolordark)] font-bold mb-[3vh]">Search results for: "{searchQuery}"</h2>
        {books.length <= 0 ?

          <p>No books found.</p> :
          (
            <div className="flex flex-row flex-wrap items-right justify-start gap-x-[2vw] gap-y-[3vh]">
              {books.map((bookObject, index) => (
                <div key={bookObject.id} ref={books.length === index + 1 && hasMore ? lastElementRef : null}>
                  <ListBook
                    id={bookObject.id}
                    image={bookObject.image}
                    title={bookObject.title}
                    remove={null}
                  />
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }

  return (
    <InfiniteScroll fetchObjects={fetchResults} renderObjects={renderResults} />
  )
}