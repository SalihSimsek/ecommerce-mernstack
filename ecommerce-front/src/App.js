import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Header from './components/Header/Header'
import ProductDetail from './components/ProductDetail/ProductDetail';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Home} />
          <Route path='/search/:categoryId?' component={Search} />
          <Route path='/search' exact component={Search} />
          <Route path='/product-detail/:productId' component={ProductDetail} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
