import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from './useBookSearch'

export default function InfiniteScroll() {
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    
    const { books, hasMore, loading, error } = useBookSearch(query, pageNumber)
    
    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        // If loading then just return so we don't constantly trigger infinite scrolling
        if (loading) return
        console.log(node)

        /**
         * 3.) Remove the intersection observer from previous node
         * 
         * We check if observer has previously been assigned with an intersection observer,
         * if true then we disconnect the ref from the previous element
         * so we can re-assign it to the new one.
         */
        if (observer.current) observer.current.disconnect() 

        /**
         * 2.) The callback function is triggered
         * 
         * With this observerCallback, we are able to make the observer trigger pagination 
         * everytime we scroll to the last node or element
         * 
         * Further explanation:
         * A callback function is passed when creating an IntersectionObserver instance.
         * The callback will receive an "entries" argument which would contain the nodes to be observed.
         * Intersection observer will invoke the callback on the first time it is set to observe a node,
         * and for this scenario when the node becomes present on the screen
         * 
         * More info: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
         */
        function observerCallback(entries) {
            // console.log(entries)
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
                console.log('Visible')
            }
        }

        /**
         * 1.) IntersectionObserver is created 
         * 
         * It's passed a callback function, assigned to the observer ref, and set to observe a node
         */
        observer.current = new IntersectionObserver(observerCallback)
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    return (
        <div>
            <input type='text' onChange={handleSearch} />
            {books.map((book, index) => {
                if (books.length === index + 1)  {
                    /**
                     * If it's the last book then add a callback ref to it
                     * By passing a callback instead of the usual useRef,
                     * we have more fine controls with what to do with the ref
                     * The callback ref will receive the DOM node as an argument
                     */
                    return <div ref={lastBookElementRef} key={book}>{book}</div>
                } else {
                    return <div key={book}>{book}</div>
                }
            })}
            {loading && <p style={{ color: 'red', fontSize: 18 }}>Loading...</p>}
            {error && <p>Error</p>}
        </div>
    )
}
