export const getUser = () => {
  let userInfo = 0;
  if (localStorage.userData) {
    userInfo = JSON.parse(localStorage.userData);
  }
  return userInfo;
};

export const getSender = (users, id) => {
  return users[0]?._id === id ? users[1] : users[0];
};

export const validateMessage = (str) => {
  if (str !== undefined) {
    const copy = str.split("").filter((char) => char !== " ");
    return copy.length > 0 ? false : true;
  }
};
