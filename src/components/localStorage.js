const saveItem = (keyStorage, item) => localStorage
  .setItem(keyStorage, JSON.stringify(item));

const getItem = (keyStorage) => JSON.parse(localStorage.getItem(keyStorage));

export { saveItem, getItem };
