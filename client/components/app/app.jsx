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
    this.setView = this.setView.bind(this);
  }
  setView(name, params) {
    this.setState({
      view: { name, params }
    });
  }
  render() {
    return (
      <div>
        <Header setAppView={this.setView} cartItemCount={this.state.cartItems.length} />
      </div>
    );
  }
}
