import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminMessage, setAdminMessage] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch the welcome message + user list on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // 1. Fetch admin welcome message
        const resDashboard = await fetch('http://localhost:8080/api/admin/dashboard', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (resDashboard.ok) {
          const message = await resDashboard.text();
          setAdminMessage(message);
        } else {
          navigate('/login');
        }

        // 2. Fetch all users
        const resUsers = await fetch('http://localhost:8080/api/admin/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (resUsers.ok) {
          const data = await resUsers.json();
          setUsers(data);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
        navigate('/login');
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      } else {
        const errorData = await res.text();
        alert(`Error deleting user: ${errorData}`);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <p>{adminMessage}</p>

      <h3>User List</h3>
      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteUser(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
