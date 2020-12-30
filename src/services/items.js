const MOCK_DATA = {
  totalItems: 15,
  items: [
    { name: 'Orange', count: 4 },
    { name: 'Banana', count: 7 },
    { name: 'Grape', count: 3 }
  ]
};

const storageKey = 'itemsDetails';

class ItemsService {
  getDetails() {
    let details = MOCK_DATA;

    if (localStorage.getItem(storageKey)) {
      details = JSON.parse(localStorage.getItem(storageKey));
    }

    return details;
  }

  updateDetails(updatedDetails) {
    localStorage.setItem(storageKey, JSON.stringify(updatedDetails));
    return { success: true };
  }
}

export default ItemsService;