import { describe, expect, it } from 'vitest';
import {
  normalizeEmail,
  validateEmail,
  validateLoginForm,
  validateRegisterForm,
  validateUserForm,
} from './validators';

describe('validators', () => {
  it('validates and normalizes email values', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(normalizeEmail('  Team@Example.COM  ')).toBe('team@example.com');
  });

  it('validates dashboard user form', () => {
    const errors = validateUserForm({
      firstName: '',
      lastName: '',
      email: 'wrong',
      department: '',
    });

    expect(errors.firstName).toBe('First name is required.');
    expect(errors.lastName).toBe('Last name is required.');
    expect(errors.email).toBe('Please enter a valid email address.');
    expect(errors.department).toBe('Department is required.');
  });

  it('validates login form', () => {
    expect(validateLoginForm({ email: '', password: '' })).toEqual({
      email: 'Email is required.',
      password: 'Password is required.',
    });

    expect(validateLoginForm({ email: 'wrong', password: 'secret123' })).toEqual({
      email: 'Please enter a valid email address.',
    });
  });

  it('validates register form', () => {
    const errors = validateRegisterForm({
      fullName: '',
      email: 'wrong',
      password: '123',
      confirmPassword: '456',
    });

    expect(errors.fullName).toBe('Full name is required.');
    expect(errors.email).toBe('Please enter a valid email address.');
    expect(errors.password).toBe('Password must be at least 6 characters.');
    expect(errors.confirmPassword).toBe('Passwords do not match.');
  });
});
