const BookDetails = ({ book }) => {
    return (
        <div className="book-details">
            <h4> {book.title} </h4>
            <p><strong>Author: </strong>{book.author}</p>
            <p><strong>Publish year: </strong>{book.publishYear}</p>
            <p><strong>Cost: </strong>{book.cost}</p>
        </div>
    )
}
export default BookDetails