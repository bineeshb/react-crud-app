export const itemsReducer = (state, action) => {
  if (action.type === 'UPDATE_ITEMS') {
    return { ...state, ...action.details };
  } else {
    return state;
  }
};
