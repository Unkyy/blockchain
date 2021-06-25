import logo from './logo.svg';
import './App.css';
import  {BrowserRouter as Router,Switch,Route,Link } from'react-router-dom'
import Blockchain from './components/Blockchain.jsx';
import Transaction from './components/Transactions.jsx';


function App() {
  return (
    <Router>
        <div>
          <ul>
            <li>
              <Link to="/blockchain">blockchain</Link>
            </li>
            <li>
              <Link to="/transaction">transaction</Link>
            </li>
          </ul>
        <Switch>
          <Route path="/blockchain" component={Blockchain} />
          <Route path="/transaction" component={Transaction} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
