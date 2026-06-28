import assert from 'node:assert/strict';
import { splitName } from '../src/utils/helpers.js';
import { validateEmail } from '../src/utils/validators.js';
import {
  filterUsers,
  getPaginatedUsers,
  getActiveFilterCount,
  sortUsers,
} from '../src/utils/userTable.js';

function runHelperVerification() {
  const sampleUsers = [
    { id: 1, firstName: 'Alice', lastName: 'Stone', email: 'alice@example.com', department: 'Engineering' },
    { id: 2, firstName: 'Bob', lastName: 'Carter', email: 'bob@example.com', department: 'Product' },
    { id: 3, firstName: 'Clara', lastName: 'Wells', email: 'clara@example.com', department: 'Engineering' },
  ];

  assert.deepEqual(splitName('John Doe'), { firstName: 'John', lastName: 'Doe' });
  assert.equal(validateEmail('team@example.com'), true);
  assert.equal(validateEmail('not-an-email'), false);

  const filteredUsers = filterUsers(sampleUsers, 'ali', {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });
  assert.equal(filteredUsers.length, 1);
  assert.equal(filteredUsers[0].firstName, 'Alice');

  const engineeringUsers = filterUsers(sampleUsers, '', {
    firstName: '',
    lastName: '',
    email: '',
    department: 'engineering',
  });
  assert.equal(engineeringUsers.length, 2);

  const sortedDescendingById = sortUsers(sampleUsers, 'id', 'desc');
  assert.equal(sortedDescendingById[0].id, 3);
  assert.equal(sortedDescendingById[2].id, 1);

  const paginationResult = getPaginatedUsers(sortedDescendingById, 2, 2);
  assert.equal(paginationResult.totalPages, 2);
  assert.equal(paginationResult.safeCurrentPage, 2);
  assert.equal(paginationResult.visibleUsers.length, 1);
  assert.equal(paginationResult.visibleUsers[0].id, 1);

  assert.equal(
    getActiveFilterCount({
      firstName: 'alice',
      lastName: '',
      email: '',
      department: 'Engineering',
    }),
    2,
  );
}

try {
  runHelperVerification();
  console.log('Helper verification passed.');
} catch (error) {
  console.error('Helper verification failed.');
  console.error(error);
  process.exitCode = 1;
}
