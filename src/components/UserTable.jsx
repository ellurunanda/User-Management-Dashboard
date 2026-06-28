import UserRow from './UserRow';

const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
];

function UserTable({ users, sortField, sortOrder, onSort, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.sortable ? (
                  <button type="button" className="sort-btn" onClick={() => onSort(column.key)}>
                    {column.label}
                    {sortField === column.key ? (
                      <span aria-hidden="true">{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                    ) : null}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((user) => <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />)
          ) : (
            <tr>
              <td colSpan={6} className="empty-state">
                No users matched your current search and filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
