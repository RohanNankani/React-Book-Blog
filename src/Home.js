import BookList from './BookList';
import useFetch from './useFetch';

const Home = () => {
    const{data: books, isPending, error} = useFetch(`http://localhost:8000/books`);

    return (  
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {books && <BookList books={books} title="All Books!" /> }
        </div>
    ); 
}
 
export default Home;