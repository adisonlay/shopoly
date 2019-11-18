import React, { Component } from 'react';
import Header from './header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      activeCartID: null,
      cartItems: [],
      orderedCarts: []
    };
  }
  setView() {

  }
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
