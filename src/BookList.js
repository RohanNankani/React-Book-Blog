import { Link } from "react-router-dom";
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const BookList = ({ books, title}) => {
    return (
        <div className="book-list">
            <h2>{ title }</h2>
            {books.map((book) => (
                <div className='book-preview'key={book.id}>
                    <Link to={`/book-detail/${book.id}`}>
                        <h2>{ book.title }</h2>
                        <p><b>Author:</b> { book.author }</p>
                        <p><b>Rated:</b> 
                            <Rating
                                name="simple-controlled"
                                value={book.rating}
                                precision={0.1}
                                icon={<StarIcon style={{fill: "orange"}}/>}
                                readOnly
                            />
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default BookList;