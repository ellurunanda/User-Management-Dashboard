import Pagination from './Pagination';
import SearchBar from './SearchBar';
import UserTable from './UserTable';
import { PAGE_SIZE_OPTIONS } from '../utils/constants';

function DashboardPanel({
  searchQuery,
  onSearchChange,
  error,
  onDismissError,
  loading,
  users,
  sortField,
  sortOrder,
  onSort,
  onEditUser,
  onDeleteUser,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalItems,
}) {
  return (
    <section className="panel">
      <SearchBar value={searchQuery} onChange={onSearchChange} onClear={() => onSearchChange('')} />

      {error ? (
        <div className="alert" role="alert">
          <span>{error}</span>
          <button type="button" className="btn btn-ghost" onClick={onDismissError}>
            Dismiss
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="loader" role="status" aria-live="polite">
          Loading users...
        </div>
      ) : (
        <>
          <UserTable
            users={users}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
            onEdit={onEditUser}
            onDelete={onDeleteUser}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            totalItems={totalItems}
            visibleCount={users.length}
          />
        </>
      )}
    </section>
  );
}

export default DashboardPanel;
