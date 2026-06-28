import { describe, expect, it } from 'vitest';
import {
  filterUsers,
  getActiveFilterCount,
  getPaginatedUsers,
  sortUsers,
} from './userTable';

const sampleUsers = [
  { id: 1, firstName: 'Alice', lastName: 'Stone', email: 'alice@example.com', department: 'Engineering' },
  { id: 2, firstName: 'Bob', lastName: 'Carter', email: 'bob@example.com', department: 'Product' },
  { id: 3, firstName: 'Clara', lastName: 'Wells', email: 'clara@example.com', department: 'Engineering' },
];

describe('userTable helpers', () => {
  it('filters users by search query and department', () => {
    const bySearch = filterUsers(sampleUsers, 'ali', {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    });
    expect(bySearch).toHaveLength(1);
    expect(bySearch[0].firstName).toBe('Alice');

    const byDepartment = filterUsers(sampleUsers, '', {
      firstName: '',
      lastName: '',
      email: '',
      department: 'engineering',
    });
    expect(byDepartment).toHaveLength(2);
  });

  it('sorts users by id and string fields', () => {
    const byIdDesc = sortUsers(sampleUsers, 'id', 'desc');
    expect(byIdDesc.map((user) => user.id)).toEqual([3, 2, 1]);

    const byFirstNameAsc = sortUsers(sampleUsers, 'firstName', 'asc');
    expect(byFirstNameAsc.map((user) => user.firstName)).toEqual(['Alice', 'Bob', 'Clara']);
  });

  it('calculates safe pagination output', () => {
    const paginated = getPaginatedUsers(sampleUsers, 2, 2);
    expect(paginated.totalPages).toBe(2);
    expect(paginated.safeCurrentPage).toBe(2);
    expect(paginated.visibleUsers.map((user) => user.id)).toEqual([3]);
  });

  it('counts active filter fields', () => {
    expect(
      getActiveFilterCount({
        firstName: 'Alice',
        lastName: '',
        email: '',
        department: 'Engineering',
      }),
    ).toBe(2);
  });
});
