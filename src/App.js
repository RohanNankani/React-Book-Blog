import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import AddReview from './AddReview';
import BookDetail from './BookDetail';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/add-review">
              <AddReview />
            </Route>
            <Route exact path="/book-detail/:id">
              <BookDetail />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
