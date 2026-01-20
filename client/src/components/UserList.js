import React from 'react';
import './UserList.css';

const UserList = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👤</div>
        <p>No users found. Add a user to get started!</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <div className="user-card-content">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              {user.createdAt && (
                <span className="user-date">
                  Added: {new Date(user.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="user-id">#{user.id}</div>
          </div>
          <div className="user-actions">
            <button
              className="edit-button"
              onClick={() => onEdit(user)}
              title="Edit user"
            >
              ✏️ Edit
            </button>
            <button
              className="delete-button"
              onClick={() => onDelete(user.id)}
              title="Delete user"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
