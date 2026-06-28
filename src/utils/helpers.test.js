import { describe, expect, it } from 'vitest';
import { getNextUserId, mapApiUser, normalizeUserInput, splitName } from './helpers';

describe('helpers', () => {
  it('splits api name into first and last names', () => {
    expect(splitName('John Doe')).toEqual({ firstName: 'John', lastName: 'Doe' });
    expect(splitName('SingleName')).toEqual({ firstName: 'SingleName', lastName: '' });
  });

  it('maps API user shape to dashboard user shape', () => {
    const mapped = mapApiUser(
      {
        id: 11,
        name: 'Mia Ray',
        email: 'mia@example.com',
      },
      0,
    );

    expect(mapped).toMatchObject({
      id: 11,
      firstName: 'Mia',
      lastName: 'Ray',
      email: 'mia@example.com',
    });
    expect(typeof mapped.department).toBe('string');
    expect(mapped.department.length).toBeGreaterThan(0);
  });

  it('normalizes user input and computes next user id', () => {
    expect(
      normalizeUserInput({
        firstName: '  Jane ',
        lastName: ' Doe ',
        email: ' jane@example.com ',
        department: ' Engineering ',
      }),
    ).toEqual({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      department: 'Engineering',
    });

    expect(getNextUserId([{ id: 1 }, { id: 4 }, { id: 2 }])).toBe(5);
  });
});
