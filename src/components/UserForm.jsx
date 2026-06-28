import { useState } from 'react';
import { validateUserForm } from '../utils/validators';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

function getInitialFormData(initialUser, departments) {
  if (initialUser) {
    return {
      firstName: initialUser.firstName || '',
      lastName: initialUser.lastName || '',
      email: initialUser.email || '',
      department: initialUser.department || departments[0] || '',
    };
  }

  return { ...initialState, department: departments[0] || '' };
}

function UserForm({ isOpen, mode, initialUser, onClose, onSubmit, isSubmitting, departments }) {
  const [formData, setFormData] = useState(() => getInitialFormData(initialUser, departments));
  const [errors, setErrors] = useState({});

  if (!isOpen) {
    return null;
  }

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
    } catch {
      return;
    }

    onClose();
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h2>{mode === 'edit' ? 'Edit User' : 'Add User'}</h2>

        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          <label>
            First Name
            <input
              type="text"
              value={formData.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              aria-invalid={Boolean(errors.firstName)}
            />
            {errors.firstName ? <span className="form-error">{errors.firstName}</span> : null}
          </label>

          <label>
            Last Name
            <input
              type="text"
              value={formData.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
              aria-invalid={Boolean(errors.lastName)}
            />
            {errors.lastName ? <span className="form-error">{errors.lastName}</span> : null}
          </label>

          <label>
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(event) => updateField('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <span className="form-error">{errors.email}</span> : null}
          </label>

          <label>
            Department
            <select
              value={formData.department}
              onChange={(event) => updateField('department', event.target.value)}
              aria-invalid={Boolean(errors.department)}
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            {errors.department ? <span className="form-error">{errors.department}</span> : null}
          </label>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
