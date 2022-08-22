import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className='navbar'>
        <h1>Book Ratings</h1>
        <div className='links'>
            <Link to="/">Home</Link>
            <Link to="/add-review">Write Review</Link>
        </div>
        </nav>
    );
}
 
export default Navbar;