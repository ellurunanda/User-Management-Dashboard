import { useCallback, useEffect, useState } from 'react';
import { createUser, getUsers, removeUser, updateUser } from '../api/userService';
import { getNextUserId, mapApiUser, normalizeUserInput } from '../utils/helpers';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getUsers();
      const mappedUsers = response.data.map((user, index) => mapApiUser(user, index));
      setUsers(mappedUsers);
    } catch {
      setError('Unable to fetch users. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetching remote data on mount is intentional for initial dashboard hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [fetchUsers]);

  const addUser = useCallback(async (userInput) => {
    setSaving(true);
    setError('');

    try {
      const normalized = normalizeUserInput(userInput);
      const response = await createUser(normalized);

      setUsers((prevUsers) => {
        const createdUser = {
          ...normalized,
          id: response.data?.id || getNextUserId(prevUsers),
        };
        return [createdUser, ...prevUsers];
      });
    } catch (err) {
      setError('Could not add user right now. Please try again.');
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const editUser = useCallback(async (id, userInput) => {
    setSaving(true);
    setError('');

    try {
      const normalized = normalizeUserInput(userInput);
      await updateUser(id, normalized);

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, ...normalized } : user)),
      );
    } catch (err) {
      setError('Could not save changes. Please retry.');
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    setSaving(true);
    setError('');

    try {
      await removeUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError('Could not complete delete operation. Please try again.');
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    users,
    loading,
    saving,
    error,
    setError,
    fetchUsers,
    addUser,
    editUser,
    deleteUser,
  };
}
