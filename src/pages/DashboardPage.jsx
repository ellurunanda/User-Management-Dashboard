import { useState } from 'react';
import ConfirmDelete from '../components/ConfirmDelete';
import DashboardPanel from '../components/DashboardPanel';
import FilterPopup from '../components/FilterPopup';
import Header from '../components/Header';
import UserForm from '../components/UserForm';
import { useUserTableState } from '../hooks/useUserTableState';
import { useUsers } from '../hooks/useUsers';
import '../styles/dashboard.css';
import { DEPARTMENTS } from '../utils/constants';
import { useAuth } from '../auth/useAuth';

function DashboardPage() {
  const { users, loading, saving, error, setError, addUser, editUser, deleteUser } = useUsers();
  const { currentUser, logout } = useAuth();

  const [formState, setFormState] = useState({
    isOpen: false,
    mode: 'add',
    user: null,
  });

  const [deleteTarget, setDeleteTarget] = useState(null);

  const {
    searchQuery,
    setSearchQuery,
    filters,
    isFilterOpen,
    setIsFilterOpen,
    sortField,
    sortOrder,
    currentPage,
    pageSize,
    totalPages,
    visibleUsers,
    filteredTotal,
    activeFilterCount,
    handleSort,
    applyFilters,
    resetFilters,
    handlePageChange,
    handlePageSizeChange,
  } = useUserTableState(users);

  async function handleFormSubmit(values) {
    if (formState.mode === 'edit' && formState.user) {
      await editUser(formState.user.id, values);
      return;
    }

    await addUser(values);
  }

  async function confirmDelete() {
    if (!deleteTarget) {
      return;
    }

    await deleteUser(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <main className="app-shell">
      <Header
        totalUsers={users.length}
        onAddClick={() => setFormState({ isOpen: true, mode: 'add', user: null })}
        onOpenFilters={() => setIsFilterOpen(true)}
        activeFilterCount={activeFilterCount}
        currentUserName={currentUser?.fullName || currentUser?.email}
        onLogout={logout}
      />
      <DashboardPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        error={error}
        onDismissError={() => setError('')}
        loading={loading}
        users={visibleUsers}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        onEditUser={(user) => setFormState({ isOpen: true, mode: 'edit', user })}
        onDeleteUser={(user) => setDeleteTarget(user)}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        totalItems={filteredTotal}
      />

      <FilterPopup
        key={`${isFilterOpen ? 'open' : 'closed'}-${filters.firstName}-${filters.lastName}-${filters.email}-${filters.department}`}
        isOpen={isFilterOpen}
        initialFilters={filters}
        onApply={applyFilters}
        onReset={resetFilters}
        onClose={() => setIsFilterOpen(false)}
        departments={DEPARTMENTS}
      />

      <UserForm
        key={`${formState.mode}-${formState.user?.id ?? 'new'}-${formState.isOpen ? 'open' : 'closed'}`}
        isOpen={formState.isOpen}
        mode={formState.mode}
        initialUser={formState.user}
        onClose={() => setFormState({ isOpen: false, mode: 'add', user: null })}
        onSubmit={handleFormSubmit}
        isSubmitting={saving}
        departments={DEPARTMENTS}
      />

      <ConfirmDelete
        isOpen={Boolean(deleteTarget)}
        user={deleteTarget}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={saving}
      />
    </main>
  );
}

export default DashboardPage;
