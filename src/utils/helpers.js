import { DEPARTMENTS } from './constants.js';

export function splitName(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
  };
}

export function mapApiUser(apiUser, index = 0) {
  const { firstName, lastName } = splitName(apiUser.name);

  return {
    id: apiUser.id,
    firstName,
    lastName,
    email: apiUser.email || '',
    department: DEPARTMENTS[index % DEPARTMENTS.length],
  };
}

export function getNextUserId(users) {
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
  return maxId + 1;
}

export function normalizeUserInput(user) {
  return {
    firstName: user.firstName.trim(),
    lastName: user.lastName.trim(),
    email: user.email.trim(),
    department: user.department.trim(),
  };
}
