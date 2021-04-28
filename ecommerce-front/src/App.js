import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './components/Register/Register';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" component={Home} />
          {/* register */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
