import { createContext, useEffect, useReducer } from 'react';

import { itemsReducer } from '../reducers/itemsReducer';

const MOCK_DATA = {
  totalItems: 15,
  items: [
    { name: 'Orange', count: 4 },
    { name: 'Banana', count: 7 },
    { name: 'Grape', count: 3 }
  ]
};

const storageKey = 'itemsDetails';

export const ItemsContext = createContext();

const ItemsContextProvider = props => {
  const [itemsDetails, itemsDispatch] = useReducer(itemsReducer, [], () => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : MOCK_DATA;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(itemsDetails));
  }, [itemsDetails]);

  return (
    <ItemsContext.Provider value={{itemsDetails, itemsDispatch}}>
      {props.children}
    </ItemsContext.Provider>
  );
}
 
export default ItemsContextProvider;
