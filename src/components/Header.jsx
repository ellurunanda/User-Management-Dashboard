function Header({ totalUsers, onAddClick, onOpenFilters, activeFilterCount, currentUserName, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Admin Workspace</p>
        <h1>User Management Dashboard</h1>
        <p className="subtext">Manage your organization records from one responsive panel.</p>
      </div>

      <div className="header-actions">
        <button type="button" className="btn btn-outline" onClick={onOpenFilters}>
          Filters
          {activeFilterCount > 0 ? <span className="pill">{activeFilterCount}</span> : null}
        </button>
        <button type="button" className="btn btn-primary" onClick={onAddClick}>
          Add User
        </button>
        <button type="button" className="btn btn-ghost" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="stats-card" role="status" aria-live="polite">
        <span className="stats-label">
          Total Users {currentUserName ? `• Signed in as ${currentUserName}` : ''}
        </span>
        <strong>{totalUsers}</strong>
      </div>
    </header>
  );
}

export default Header;
