import Loading from "./Loading/Loading.jsx";
import { useRef, useEffect, useState, useCallback } from "react";

export default function InfiniteScroll({ fetchObjects, renderObjects }) {
    const userID = sessionStorage.getItem("user_id");
    const [objects, setObjects] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const objectLimit = 10;

    const loadingRef = useRef(loading);
    const hasMoreRef = useRef(hasMore);
    const observer = useRef(null);

    useEffect(() => {
        loadingRef.current = loading;
    }, [loading]);

    useEffect(() => {
        hasMoreRef.current = hasMore;
    }, [hasMore]);


    const fetchPosts = useCallback(async (pageNum) => {

        if (loadingRef.current || !hasMoreRef.current) {
            // console.log(`Fetch aborted for page ${pageNum}: loading=${loadingRef.current}, hasMore=${hasMoreRef.current}`);
            return;
        }

        setLoading(true); // Set loading before the async operation

        try {

            const newObjects = await fetchObjects(pageNum, objectLimit) || [];    // see if this call should use aawait or not********

            setObjects((prev) => {
                // Filter out potential duplicates if API might return them
                const existingIds = new Set(prev.map(p => p.id));
                const uniqueNewObjects = newObjects.filter(p => !existingIds.has(p.id));
                return [...prev, ...uniqueNewObjects];
            });

            if (newObjects.length < objectLimit) {
                setHasMore(false);
            }

        } catch (err) {
            console.error("Fetch error:", err);
            setError('An error occurred while fetching data.');
            // Decide how to handle error - maybe set hasMore(false) on critical errors?
        } finally {
            setLoading(false); // Unset loading after fetch attempt
        }

    }, [userID]); // see if these need to be kept here**************


    useEffect(() => {

        if (hasMore) {
            fetchPosts(page);
        }
        else {
            // console.log("hasMore is false. Not fetching on page change.");
        }

    }, [page, hasMore, fetchPosts]); // Depend on page, hasMore, and memoized fetchPosts


    useEffect(() => {

        observer.current = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && !loadingRef.current && hasMoreRef.current) {

                setPage(prevPage => prevPage + 1);
            }
            else {
                // console.log("Intersection callback conditions not met:", {
                //     isIntersecting: entries[0].isIntersecting,
                //     loading: loadingRef.current,
                //     hasMore: hasMoreRef.current
                // });
            }
        },
            {
                threshold: 0.9,
            }
        );

        return () => {
            // console.log("Disconnecting observer.");
            observer.current?.disconnect();
        };

    }, []);

    const lastObjectRef = useCallback((node) => {

        if (!observer.current) {
            // console.log("Callback ref: Observer not yet created.");
            return;
        }

        observer.current.disconnect();

        if (node) {
            // console.log("Callback ref: Observing new last element.");
            observer.current.observe(node);
        }
        // If node is null (the element is unmounting, e.g., component unmounts),
        // the disconnect above already handles stopping observation.

        // No explicit cleanup function needed inside this useCallback ref
        // as the observer's lifecycle is managed by the other useEffect.
    }, []); // Empty dependency array: This callback function is stable and doesn't
    // need to be recreated. It relies on the stable 'observer.current' ref.

    if (loading && objects.length === 0 && page === 1) {
        return <Loading />;
    }

    if (error && objects.length === 0) {
        return <div className="text-center text-red-500 py-[2vh]">{error}</div>;
    }

    //  check for post's length here and render accordinglyu
    return (
        <div className="flex flex-col gap-[5vh]">

            {/* ensure the lastRef is being added to the last element */}
            {renderObjects(objects, lastObjectRef, hasMore)}

            {/* Show loading indicator while fetching, but not during initial empty load */}
            {loading && objects.length > 0 && <p className="text-center py-4">Loading More...</p>}

            {/* Show loading indicator if loading AND it's not the initial load (page > 1) */}
            {/* {loading && page > 1 && <p className="text-center py-4">Loading More...</p>} */}


            {/* Show error if it occurred after some posts were loaded */}
            {error && objects.length > 0 && <p className="text-center text-red-500 py-4">{error}</p>}

            {/* Message when all posts are loaded and no more data */}
            {!hasMore && objects.length > 0 && !loading && <p className="text-center py-4">You've reached the end...</p>}

        </div>
    );
}