import React, { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { fetchUsers, createUser, updateUser, deleteUser } from './services/userService';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      setError(null);
      setSuccess(null);
      const newUser = await createUser(userData);
      setUsers([...users, newUser]);
      setSuccess('User added successfully!');
      return true;
    } catch (err) {
      setError(err.message || 'Failed to add user. Please try again.');
      return false;
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      setError(null);
      setSuccess(null);
      const updatedUser = await updateUser(editingUser.id, userData);
      setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
      setEditingUser(null);
      setSuccess('User updated successfully!');
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update user. Please try again.');
      return false;
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      setSuccess('User deleted successfully!');
    } catch (err) {
      setError(err.message || 'Failed to delete user. Please try again.');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setError(null);
    setSuccess(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setError(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>User Management System</h1>
          <p>Manage your users with ease</p>
        </header>

        {error && (
          <div className="alert alert-error" role="alert">
            <span className="alert-icon">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            <span className="alert-icon">✓</span>
            {success}
          </div>
        )}

        <div className="content">
          <div className="form-section">
            <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <UserForm 
              onSubmit={editingUser ? handleUpdateUser : handleAddUser}
              initialData={editingUser}
              onCancel={editingUser ? handleCancelEdit : null}
            />
          </div>

          <div className="list-section">
            <div className="list-header">
              <h2>Users List ({users.length})</h2>
            </div>
            {loading ? (
              <div className="loading">Loading users...</div>
            ) : (
              <UserList 
                users={users} 
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
