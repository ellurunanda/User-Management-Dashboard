function ConfirmDelete({ isOpen, user, onConfirm, onCancel, isDeleting }) {
  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onCancel}>
      <div className="modal modal-sm" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h2>Delete User</h2>
        <p>
          Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>? This action
          cannot be undone in this session.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
