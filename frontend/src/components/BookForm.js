import { useState } from "react"
import { useBooksContext } from "../hooks/useBooksContext"

const BookForm = () => {
    const { dispatch } = useBooksContext()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [cost, setCost] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) 

    const handleSubmit = async (e) => {
        e.preventDefault()

        const book = {title, author, publishYear, cost}

        const response = await fetch('/books', {
            method:'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setError(null)
            setEmptyFields([])
            setTitle('')
            setAuthor('')
            setPublishYear('')
            setCost('')
            console.log('New book added', json)
            dispatch({type: 'CREATE_BOOK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new book</h3>

            <label>Book name: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Book author: </label>
            <input
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                className={emptyFields.includes('author') ? 'error' : ''}
            />

            <label>Year of publication: </label>
            <input
                type="number"
                onChange={(e) => setPublishYear(e.target.value)}
                value={publishYear}
                className={emptyFields.includes('publishYear') ? 'error' : ''}
            />

            <label>Cost of the book: </label>
            <input
                type="number"
                onChange={(e) => setCost(e.target.value)}
                value={cost}
                className={emptyFields.includes('cost') ? 'error' : ''}
            />
            <button>Add book</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BookForm