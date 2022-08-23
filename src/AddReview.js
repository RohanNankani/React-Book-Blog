import { useState } from "react";
import { useHistory } from "react-router-dom";
import backend_url from "./constants";

const AddReview = () => {
    const[title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [contributor, setContributor] = useState('');
    const [rating, setRating] = useState('');
    const[summary, setSummary] = useState('');
    const[review, setReview] = useState('');
    const[isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalNumReviews = 1
        const book = {contributor:[contributor], title, author, rating, summary, review:[review], totalNumReviews};

        setIsPending(true);

        fetch(`${backend_url}/books`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(book)
        }).then(() => {
            console.log('New Book Added');
            setIsPending(false);
            history.push('/');
        })
    }

    return (
        <div className="create">
            <h2>Add a New Book Review</h2>
            <form onSubmit={handleSubmit}>
                <label>Book title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Book author:</label> 
                <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <label>Rating:</label> 
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label>Summary:</label>
                <textarea
                    required
                    value = {summary}
                    onChange={(e) => setSummary(e.target.value)}
                ></textarea>
                <label>Review:</label>
                <textarea
                    required
                    value = {review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <label>Your Name:</label> 
                <input
                    type="text"
                    required
                    value={contributor}
                    onChange={(e) => setContributor(e.target.value)}
                />
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    );
}
 
export default AddReview;