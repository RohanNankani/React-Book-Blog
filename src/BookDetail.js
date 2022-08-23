import {useHistory, useParams} from 'react-router-dom';
import { useState } from "react";
import useFetch from './useFetch';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import backend_url from "./constants";

const BookDetails = () => {
    const [newRating, setNewRating] = useState(1);
    const[newReview, setNewReview] = useState('');
    const[newContributor, setNewContributor] = useState('');
    const[Pending, setPending] = useState('');
    const[additionalReview, setAdditionalReview] = useState(false);


    const {id} = useParams();
    const {data: book, error, isPending} = useFetch(`${backend_url}/books/`+ id)
    const history = useHistory();

    const handleClick = () => {
        fetch(`${backend_url}/books/` + book.id, {
            method: 'DELETE'
        }).then(() => {
            setPending(false);
            history.push('/');
        })
    }

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
        book.contributor.push(newContributor)


        // const book = {title, author, averageRating, summary, updatedReview};
        const book2 = {title: book.title, author: book.author, rating: averageRating, summary: book.summary, review: book.review, totalNumReviews, contributor: book.contributor};

        setPending(true);

        fetch(`${backend_url}/books/` + book.id, {
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
        setAdditionalReview(!additionalReview)
    }

    return ( 
        <div className="book-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {book && (
            <article className='text'>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <Rating
                name="simple-controlled"
                value={book.rating}
                precision={0.1}
                icon={<StarIcon style={{fill: "orange"}}/>}
                readOnly
                />
                <div><b>Summary:</b></div>
                <div>{book.summary}</div>
                <div><b>Reviews: </b></div>
                <div>{book.review.map((review, idx) => <div><ul>{review + "\t\t\t - by: " + book.contributor[idx]}</ul></div>)}</div>
                <div><button onClick={addReview}>Add Review</button></div>
                <div><button onClick={handleClick }>Delete</button></div>
                {additionalReview && (
                <div>
                    <form onSubmit={addReview}>
                        <div>
                            <label>Rating: </label>
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
                        </div>
                        <div>
                            <label>Review: </label>
                            <textarea
                                required
                                value = {newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label>Your Name: </label> 
                            <input
                                type="text"
                                required
                                value={newContributor}
                                onChange={(e) => setNewContributor(e.target.value)}
                            />
                        </div>
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