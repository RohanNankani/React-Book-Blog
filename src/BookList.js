import { Link } from "react-router-dom";

const BookList = ({ books, title}) => {
    return (
        <div className="book-list">
            <h2>{ title }</h2>
            {books.map((book) => (
                <div className='book-preview'key={book.id}>
                    <Link to={`/book-detail/${book.id}`}>
                        <h2>{ book.title }</h2>
                        <p>Author: { book.author }</p>
                        <p>Rated: { book.rating }</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default BookList;