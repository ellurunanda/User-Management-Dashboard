function Pagination({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  totalItems,
  visibleCount,
}) {
  return (
    <section className="pagination-bar" aria-label="Pagination Controls">
      <div className="pagination-meta">
        <p>
          Showing <strong>{visibleCount}</strong> of <strong>{totalItems}</strong> users
        </p>
      </div>

      <div className="pagination-controls">
        <label>
          Page Size
          <select value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>

        <span className="page-indicator">
          Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
        </span>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Pagination;
