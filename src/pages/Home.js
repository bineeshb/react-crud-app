import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { ItemsContext } from '../contexts/ItemsContext';

import Item from '../components/Item';

const Home = () => {
  const { user: { username, isAdmin }, authDispatch } = useContext(AuthContext);
  const { itemsDetails, itemsDispatch } = useContext(ItemsContext);
  const history = useHistory();

  const { totalItems, items } = itemsDetails;
  const [details, setDetails] = useState({ totalItems, items });
  const [errors, setErrors] = useState({ totalItems: null });

  useEffect(() => {
    itemsDispatch({ type: 'UPDATE_ITEMS', details });
  }, [details]);

  const getSumOfItems = () => {
    return details.items.reduce((sum, { count }) => sum + count, 0);
  }

  const isItemsLessThanTotal = () => {
    return getSumOfItems() < details.totalItems;
  }

  const updateTotalItems = newValue => {
    let items = details.items;
    setErrors({ totalItems: null });

    if (newValue < getSumOfItems()) {
      items = details.items.map(item => ({ ...item, count: 0 }));
    }

    if (isNaN(newValue) || newValue < 1) {
      setErrors({ totalItems: 'Total Items should be a number and greater than 1' });
    }

    setDetails({ totalItems: newValue, items });
  }

  const updateItemCount = (updateItem, updateCountBy) => {
    const updatedItems = details.items.map(item => item.name === updateItem.name ? { ...item, count: (item.count + updateCountBy) } : item);

    setDetails({ ...details, items: updatedItems });
  }

  const logoutUser = () => {
    authDispatch({ type: 'LOGOUT' });
    history.push('/login');
  }

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <button onClick={logoutUser}>Logout</button>
      {isAdmin && <div>
        <label htmlFor="totalItems">Total Items*</label>
        <input type="number" name="totalItems" id="totalItems" min="1"
          value={details.totalItems}
          onChange={e => updateTotalItems(e.target.value)} required />
        {errors.totalItems && <div>{errors.totalItems}</div>}
      </div>}
      <div>
        <ul>
          {details.items.map((item, index) => (
            <li key={index}>
              <Item item={item}
                updateItemCount={updateItemCount}
                isAddAllowed={isAdmin && isItemsLessThanTotal()} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
 
export default Home;
