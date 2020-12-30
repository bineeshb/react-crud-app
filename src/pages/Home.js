import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import ItemsService from '../services/items';

import Item from '../components/Item';

class Home extends Component {
  errors = {
    totalItems: null
  };

  constructor(props) {
    super(props);
    this.itemsService = new ItemsService();
    const { totalItems, items } = this.itemsService.getDetails();
    this.state = { totalItems, items };
  }

  static contextType = AuthContext;

  get sumOfItems() {
    return this.state.items.reduce((sum, { count }) => sum + count, 0);
  }

  get canAddItems() {
    return this.sumOfItems < this.state.totalItems;
  }

  updateTotalItems(newValue) {
    let items = this.state.items;
    this.errors.totalItems = null;

    if (newValue < this.sumOfItems) {
      items = this.state.items.map(item => ({ ...item, count: 0 }));
    }

    if (isNaN(newValue) || newValue < 1) {
      this.errors.totalItems = 'Total Items should be a number and greater than 1';
    }

    this.saveItemsData({ totalItems: newValue, items });
  }

  updateItemCount(updateItem, updateCountBy) {
    const updatedItems = this.state.items.map(item => item.name === updateItem.name ? { ...item, count: (item.count + updateCountBy) } : item);

    this.saveItemsData({ items: updatedItems });
  }

  saveItemsData(updatedData) {
    this.setState(updatedData, () => {
      this.itemsService.updateDetails(this.state);
    });
  }

  logoutUser() {
    this.context.logout();
    this.props.history.push('/login');
    // console.log('home - logoutUser');
  }

  render() {
    const { username, isAdmin } = this.context.user;
    return (
      <div>
        <h1>Welcome, {username}</h1>
        <button onClick={this.logoutUser.bind(this)}>Logout</button>
        {isAdmin && <div>
          <label htmlFor="totalItems">Total Items*</label>
          <input type="number" name="totalItems" id="totalItems" min="1"
            value={this.state.totalItems}
            onChange={e => this.updateTotalItems(e.target.value)} required />
          {this.errors.totalItems && <div>{this.errors.totalItems}</div>}
        </div>}
        <div>
          <ul>
            {this.state.items.map((item, index) => (
              <li key={index}>
                <Item item={item}
                  updateItemCount={this.updateItemCount.bind(this)}
                  isAddAllowed={isAdmin && this.canAddItems} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
 
export default withRouter(Home);