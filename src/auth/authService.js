import { normalizeEmail } from '../utils/validators';

const REGISTERED_USERS_KEY = 'umd_registered_users';
const AUTH_USER_KEY = 'umd_auth_user';

function readJson(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getRegisteredUsers() {
  return readJson(REGISTERED_USERS_KEY, []);
}

export function registerUser({ fullName, email, password }) {
  const users = getRegisteredUsers();
  const normalizedEmail = normalizeEmail(email);

  const exists = users.some((user) => user.email === normalizedEmail);
  if (exists) {
    throw new Error('An account with this email already exists.');
  }

  const newUser = {
    id: Date.now(),
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
  };

  writeJson(REGISTERED_USERS_KEY, [newUser, ...users]);

  return { id: newUser.id, fullName: newUser.fullName, email: newUser.email };
}

export function loginUser({ email, password }) {
  const users = getRegisteredUsers();
  const normalizedEmail = normalizeEmail(email);

  const matched = users.find((user) => user.email === normalizedEmail && user.password === password);

  if (!matched) {
    throw new Error('Invalid email or password.');
  }

  return { id: matched.id, fullName: matched.fullName, email: matched.email };
}

export function getCurrentAuthUser() {
  return readJson(AUTH_USER_KEY, null);
}

export function setCurrentAuthUser(user) {
  writeJson(AUTH_USER_KEY, user);
}

export function clearCurrentAuthUser() {
  localStorage.removeItem(AUTH_USER_KEY);
}
