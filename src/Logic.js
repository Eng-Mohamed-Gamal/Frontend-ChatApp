
export const baseUrl = "http://localhost:3001"


export const getUser = () => {
  let userInfo ;
  if (localStorage.userData) {
    userInfo = JSON.parse(localStorage.userData);
  }
  return userInfo;
};

export const getChatingUser = (users, id) => {
  return users[0]?._id === id ? users[1] : users[0];
};

export const validateMessage = (str) =>{
  if (str !== undefined) {
    const copy = str.split("").filter((char) => char !== " ");
    return copy.length > 0 ? false : true;
  }
};

export const messagesPosition = (messages, index, loggedUserId) => {
  return messages[index]?.sender?._id === loggedUserId ? "end" : "start";
};


