import { useMemo, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';
import {
  emptyUserFilters,
  filterUsers,
  getActiveFilterCount,
  getPaginatedUsers,
  sortUsers,
} from '../utils/userTable';

export function useUserTableState(users) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(emptyUserFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortField, setSortField] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const activeFilterCount = useMemo(() => getActiveFilterCount(filters), [filters]);
  const filteredUsers = useMemo(() => filterUsers(users, searchQuery, filters), [users, searchQuery, filters]);
  const sortedUsers = useMemo(
    () => sortUsers(filteredUsers, sortField, sortOrder),
    [filteredUsers, sortField, sortOrder],
  );

  const { totalPages, safeCurrentPage, visibleUsers } = useMemo(
    () => getPaginatedUsers(sortedUsers, currentPage, pageSize),
    [sortedUsers, currentPage, pageSize],
  );

  function handleSort(field) {
    setCurrentPage(1);

    if (field === sortField) {
      setSortOrder((previousOrder) => (previousOrder === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortField(field);
    setSortOrder('asc');
  }

  function applyFilters(nextFilters) {
    setFilters(nextFilters);
    setCurrentPage(1);
    setIsFilterOpen(false);
  }

  function resetFilters(nextFilters) {
    setFilters(nextFilters);
    setCurrentPage(1);
  }

  function handlePageChange(nextPage) {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  function handlePageSizeChange(nextPageSize) {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  }

  return {
    searchQuery,
    setSearchQuery,
    filters,
    isFilterOpen,
    setIsFilterOpen,
    sortField,
    sortOrder,
    currentPage: safeCurrentPage,
    pageSize,
    totalPages,
    visibleUsers,
    filteredTotal: sortedUsers.length,
    activeFilterCount,
    handleSort,
    applyFilters,
    resetFilters,
    handlePageChange,
    handlePageSizeChange,
  };
}
