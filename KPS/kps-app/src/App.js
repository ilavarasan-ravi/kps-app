import React from 'react';
import './App.css';
import ShopPage from './pages/shop/shop.component'
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} ></Route>
        <Route path='/Shop' component={ShopPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
