import React, { Component } from 'react';
import ItemCard from './item-card';

export default class ItemCardsList extends Component {
  constructor(props) {
    super(props);
    this.state = { itemsData: [] };
  }
  getItemsData() {
    fetch('/api/helper/items.php')
      .then(response => response.json())
      .then(itemsData => this.setState({ itemsData }))
      .catch(error => console.error(error));
  }
  componentDidMount() {
    this.getItemsData();
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}
