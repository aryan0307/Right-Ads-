const TOKEN_KEY = 'rightads_admin_token';
const USER_KEY = 'rightads_admin_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminUser() {
  return localStorage.getItem(USER_KEY);
}

export function setAuth(token, username) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}
