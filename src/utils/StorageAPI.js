
export const saveFile = (key, value) => {
  const valueToString = JSON.stringify(value);
  localStorage.setItem(key, valueToString);
};

export const getFile = (key) => {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
};
