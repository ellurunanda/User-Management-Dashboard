function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.department}</td>
      <td>
        <div className="row-actions">
          <button type="button" className="btn btn-outline" onClick={() => onEdit(user)}>
            Edit
          </button>
          <button type="button" className="btn btn-danger" onClick={() => onDelete(user)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;
