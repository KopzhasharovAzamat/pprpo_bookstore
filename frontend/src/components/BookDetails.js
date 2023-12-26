import { useBooksContext } from "../hooks/useBooksContext" 
import { useAuthContext } from "../hooks/useAuthContext"

const BookDetails = ({ book }) => {
    const { dispatch } = useBooksContext()
    const { user } = useAuthContext()
    
    const handleClick = async () => {
        if(!user){
            return
        }

        const response = await fetch('/books/' + book._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: 'DELETE_BOOK', payload: json})
        }
    }

    return (
        <div className="book-details">
            <h4> {book.title} </h4>
            <p><strong>Author: </strong>{book.author}</p>
            <p><strong>Publish year: </strong>{book.publishYear}</p>
            <p><strong>Cost: </strong>{book.cost}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}
export default BookDetails