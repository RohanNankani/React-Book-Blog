import {useHistory, useParams} from 'react-router-dom';
import { useState } from "react";
import useFetch from './useFetch';

const BookDetails = () => {
    const [newRating, setNewRating] = useState(1);
    const[newReview, setNewReview] = useState('');
    const[Pending, setPending] = useState('');
    const[additionalReview, setAdditionalReview] = useState(false);


    const {id} = useParams();
    const {data: book, error, isPending} = useFetch(`http://localhost:8000/books/` + id)
    const history = useHistory();

    // const handleClick = () => {
    //     fetch(`http://localhost:8000/books/` + book.id, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         setPending(false);
    //         history.push('/');
    //     })
    // }

    const submitReview = (e) => {
        e.preventDefault();
        // compute new average rating

        const totalNumReviews = book.totalNumReviews + 1

        const a = parseFloat(newRating)
        const b = parseFloat(book.rating) * book.totalNumReviews // prevTotal
        const c = totalNumReviews

        const averageRating = ((a + b) / (c)).toFixed(1);

        // compute new review
        book.review.push(newReview)


        // const book = {title, author, averageRating, summary, updatedReview};
        const book2 = {title: book.title, author: book.author, rating: averageRating, summary: book.summary, review: book.review, totalNumReviews};

        setPending(true);

        fetch(`http://localhost:8000/books/` + book.id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(book2)
        }).then(() => {
            console.log('New Book Added');
            setPending(false);
            history.push('/');
        })
    }

    const addReview = () => {
        setAdditionalReview(true)
    }

    return ( 
        <div className="book-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {book && (
            <article>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.rating}</p>
                <div><b>Summary:</b></div>
                <div>{book.summary}</div>
                <div><b>Reviews: </b></div>
                <div>{book.review.map(review => <div><ul>{review}</ul></div>)}</div>
                <button onClick={addReview}>Add Review</button>
                {additionalReview && (
                <div>
                    <form onSubmit={addReview}>
                        <select
                        value={newRating}
                        onChange={(e) => setNewRating(e.target.value)}
                        >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select>
                        <label>Review:</label>
                        <textarea
                            required
                            value = {newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                        ></textarea>
                    </form>
                    <div><button onClick={submitReview}>Submit Review</button></div>
                    {Pending && <button disabled>Adding Review...</button>}
                </div>)}
            </article>
            )}
        </div>
    );
}
 
export default BookDetails; 