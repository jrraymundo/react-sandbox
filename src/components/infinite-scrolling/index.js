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

        /**
         * We assign an intersection observer to the ref.
         * But if it has previously been assigned,
         * then we disconnect the ref from the previous element
         * so we can re-assign it to the new one.
         */
        if (observer.current) observer.current.disconnect() 
        observer.current = new IntersectionObserver(entries => {
            console.log(entries)
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
                console.log('Visibile')
            }
        })

        if (node) observer.current.observe(node)
        console.log(node)
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
                    // If it's the last book then add a callback ref to it
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
