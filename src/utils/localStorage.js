
export const saveFile = (fileName, file) => {
  localStorage.setItem(fileName, file);
  return
}

export const getFile = (fileName) => {
  return localStorage.getItem(fileName);
}
