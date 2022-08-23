import BookList from './BookList';
import useFetch from './useFetch';
import backend_url from './constants';

const Home = () => {
    const{data: books, isPending, error} = useFetch(`${backend_url}/books`);

    return (  
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {books && <BookList books={books} title="All Books!" /> }
        </div>
    ); 
}
 
export default Home;