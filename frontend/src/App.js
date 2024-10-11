import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Login from './pages/Login';
import Settings from './pages/Settings';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <nav>
            <ul className="app-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/messages">Messages</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </header>

        <main className="app-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/messages" component={Messages} />
            <Route path="/settings" component={Settings} />
            <Route path="/login" component={Login} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
