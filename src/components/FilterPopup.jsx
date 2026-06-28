import { useState } from 'react';

const emptyFilters = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

function FilterPopup({ isOpen, initialFilters, onApply, onClose, onReset, departments }) {
  const [localFilters, setLocalFilters] = useState(initialFilters || emptyFilters);

  if (!isOpen) {
    return null;
  }

  function updateField(field, value) {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  }

  function handleApply(event) {
    event.preventDefault();
    onApply(localFilters);
  }

  function handleReset() {
    const resetValue = { ...emptyFilters };
    setLocalFilters(resetValue);
    onReset(resetValue);
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal modal-sm" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h2>Filter Users</h2>
        <form className="form-grid" onSubmit={handleApply}>
          <label>
            First Name
            <input
              type="text"
              value={localFilters.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              value={localFilters.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              value={localFilters.email}
              onChange={(event) => updateField('email', event.target.value)}
            />
          </label>
          <label>
            Department
            <select
              value={localFilters.department}
              onChange={(event) => updateField('department', event.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={handleReset}>
              Reset
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterPopup;
