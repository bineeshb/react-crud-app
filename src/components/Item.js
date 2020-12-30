import React from 'react';

const Item = props => {
  const { item, updateItemCount, isAddAllowed } = props;

  return (
    <React.Fragment>
      <div>Name: {item.name}</div>
      <div>Count: {item.count}</div>
      {isAddAllowed && <button type="button" onClick={() => updateItemCount(item, 1)}>+1</button>}
      {item.count > 0 && <button type="button" onClick={() => updateItemCount(item, -1)}>-1</button>}
    </React.Fragment>
  );
}
 
export default Item;