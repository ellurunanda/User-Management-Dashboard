export function validateEmail(email) {
  // Lightweight email guard for client-side UX before submit; server-side validation is still required in real apps.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function normalizeEmail(email = '') {
  return email.trim().toLowerCase();
}

export function validateUserForm(formData) {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.department.trim()) {
    errors.department = 'Department is required.';
  }

  return errors;
}

export function validateLoginForm(formData) {
  const errors = {};

  if (!normalizeEmail(formData.email)) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export function validateRegisterForm(formData) {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!normalizeEmail(formData.email)) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.password) {
    errors.password = 'Password is required.';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}
