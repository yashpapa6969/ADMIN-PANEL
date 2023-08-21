// UserAuth.js
const validUsers = {
  admin: "admin123",
  drink: "drink123",
  food: "food123",
};

let authenticatedUsername = null;

export function authenticateUser(username, password) {
  if (
    validUsers.hasOwnProperty(username) &&
    validUsers[username] === password
  ) {
    authenticatedUsername = username;
    return true;
  }
  return false;
}

export function getUsername() {
  return authenticatedUsername;
}

export function isUserAdmin() {
  return authenticatedUsername === "admin";
}

export function isUserDrink() {
  return authenticatedUsername === "drink";
}

export function isUserFood() {
  return authenticatedUsername === "food";
}
