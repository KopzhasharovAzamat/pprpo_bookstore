import { useEffect } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'

// components
import BookDetails from '../components/BookDetails'
import BookForm from '../components/BookForm'

const Home = () => {
    const {books, dispatch} = useBooksContext()
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/books')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_BOOKS', payload: json})
            }
        }
        fetchBooks()
    }, [])

    return (
        <div className="home">
            <div className="books">
                {books && books.map((book) => (
                    <BookDetails key={book._id} book={book}/>
                ))}
            </div>
            <BookForm/>
        </div>
    )
}
export default Home