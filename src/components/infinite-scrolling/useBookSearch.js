import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useBookSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setBooks([])
    }, [query])
    
    /**
     * An alternative to cancelling axios requests here
     * is to use debouncing
     */
    useEffect(() => {
        let cancelRequest = null
        setLoading(true)
        setError(false)

        axios({
            method: 'GET',
            url: 'https://openlibrary.org/search.json',
            params: { 
                q: query, 
                page: pageNumber 
            },
            cancelToken: new axios.CancelToken(canceler => {
                cancelRequest = canceler
            })
        })
        .then(res => {
            console.log(res.data)
            setBooks(prevBooks => {
                // Use Set to remove duplicate books from the API
                return [ ...new Set([...prevBooks, ...res.data.docs.map(book => book.title)]) ]
            })
            setHasMore(res.data.docs.length > 0)
            setLoading(false)
        })
        .catch(err => {
            if (axios.isCancel(err)) return
            setError(true)
        })

        return () => {
            cancelRequest()
        }
    }, [query, pageNumber])
    
    return { loading, error, books, hasMore }
}
