export const emptyUserFilters = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

export function getActiveFilterCount(filters) {
  return Object.values(filters).filter((value) => value.trim() !== '').length;
}

export function filterUsers(users, searchQuery, filters) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const normalizedFirstNameFilter = filters.firstName.trim().toLowerCase();
  const normalizedLastNameFilter = filters.lastName.trim().toLowerCase();
  const normalizedEmailFilter = filters.email.trim().toLowerCase();
  const normalizedDepartmentFilter = filters.department.trim().toLowerCase();

  return users.filter((user) => {
    const searchMatch =
      !normalizedQuery ||
      user.firstName.toLowerCase().includes(normalizedQuery) ||
      user.lastName.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery);

    const firstNameMatch =
      !normalizedFirstNameFilter ||
      user.firstName.toLowerCase().includes(normalizedFirstNameFilter);

    const lastNameMatch =
      !normalizedLastNameFilter || user.lastName.toLowerCase().includes(normalizedLastNameFilter);

    const emailMatch = !normalizedEmailFilter || user.email.toLowerCase().includes(normalizedEmailFilter);

    const departmentMatch =
      !normalizedDepartmentFilter ||
      user.department.toLowerCase() === normalizedDepartmentFilter;

    return searchMatch && firstNameMatch && lastNameMatch && emailMatch && departmentMatch;
  });
}

export function sortUsers(users, sortField, sortOrder) {
  return [...users].sort((left, right) => {
    if (sortField === 'id') {
      return sortOrder === 'asc' ? left.id - right.id : right.id - left.id;
    }

    const leftValue = String(left[sortField] ?? '').toLowerCase();
    const rightValue = String(right[sortField] ?? '').toLowerCase();

    return sortOrder === 'asc'
      ? leftValue.localeCompare(rightValue)
      : rightValue.localeCompare(leftValue);
  });
}

export function getPaginatedUsers(users, currentPage, pageSize) {
  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const visibleUsers = users.slice(startIndex, startIndex + pageSize);

  return {
    totalPages,
    safeCurrentPage,
    visibleUsers,
  };
}
