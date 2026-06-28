# User Management Dashboard

A responsive React dashboard for user administration using JSONPlaceholder API with complete CRUD flows, search, filtering, sorting, pagination, validation, and friendly error handling.

## Project Overview

This application provides administrators a single interface to:

- View users in a structured table
- Search users in real time
- Filter by first name, last name, email, and department
- Sort by ID, first name, last name, email, and department
- Add and edit users with validation
- Delete users with confirmation
- Paginate results with dynamic page size controls
- Register and login with frontend-only mock auth
- Protect dashboard route behind authenticated session

## Installation

1. Install Node.js 18+.
2. Install dependencies:

```bash
npm install
```

## Run The Project

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Run helper verification script:

```bash
npm run verify:helpers
```

Run unit tests:

```bash
npm test
```

## Libraries Used

- React
- Axios
- React Router DOM
- Vite

## Folder Structure

```text
user-management-dashboard/
├── public/
├── scripts/
│   └── verify-helpers.mjs
├── src/
│   ├── api/
│   │   └── userService.js
│   ├── auth/
│   │   ├── authContextObject.js
│   │   ├── AuthContext.jsx
│   │   ├── authService.js
│   │   └── useAuth.js
│   ├── components/
│   │   ├── ConfirmDelete.jsx
│   │   ├── DashboardPanel.jsx
│   │   ├── FilterPopup.jsx
│   │   ├── Header.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── PublicOnlyRoute.jsx
│   │   ├── SearchBar.jsx
│   │   ├── UserForm.jsx
│   │   ├── UserRow.jsx
│   │   └── UserTable.jsx
│   ├── hooks/
│   │   ├── useUsers.js
│   │   └── useUserTableState.js
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── styles/
│   │   ├── auth.css
│   │   └── dashboard.css
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── userTable.js
│   │   └── validators.js
│   ├── App.jsx
│   ├── App.css
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   └── main.jsx
├── package.json
└── README.md
```

## Engineering Assumptions

JSONPlaceholder user schema does not directly include assignment fields for first name, last name, and department. The application applies these assumptions:

- First and last names are derived by splitting the API `name` value by the first space.
- Department is assigned from a rotating default department list during initialization.
- JSONPlaceholder is non-persistent, so create/update/delete are reflected in local UI state after successful API calls.
- Authentication is mock/frontend-only and persisted using `localStorage` (not secure for production).
- Search/filter/sort/pagination logic is centralized in `src/utils/userTable.js`.
- Auth field validation is centralized in `src/utils/validators.js`.
- Utility behavior is covered with unit tests in `src/utils/*.test.js`.

## Auth Flow (Frontend-Only Mock Auth)

1. New users create an account from `/register`.
2. Registration data is stored in `localStorage` (`umd_registered_users`).
3. On successful register/login, session user is stored in `localStorage` (`umd_auth_user`).
4. Protected routes redirect unauthenticated users to `/login`.
5. Public-only routes (`/login`, `/register`) redirect authenticated users to `/`.
6. Logout clears `umd_auth_user` and returns user to authenticated-entry flow.

## Challenges Faced

- JSONPlaceholder does not persist mutations across requests.
- Solution: state-first UI updates after successful POST/PUT/DELETE calls.
- API data shape mismatch with assignment columns.
- Solution: transformation helper layer in `helpers.js`.

## Future Improvements

- Add server-side pagination and sorting with a real backend
- Add role-based authentication and route protection
- Add unit tests for helpers, validation, and filtering logic
- Add toast notification system and retry queue for failed API actions
