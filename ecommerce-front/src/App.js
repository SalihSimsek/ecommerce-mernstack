import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './components/Register/Register';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          {/* Homepage */}
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register} />
          {/* register */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
