const TOKEN_KEY_NAME = 'access_token';

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY_NAME);
}

function setToken(token: string) {
  if (token === null) {
    throw new Error('Token is null!');
  }

  return sessionStorage.setItem(TOKEN_KEY_NAME, token);
}

function deleteToken() {
  return sessionStorage.removeItem(TOKEN_KEY_NAME);
}

export {setToken, deleteToken, getToken};