import React, { useState, useEffect } from "react";
import axios from "../services/api"; // Import the Axios instance

function UserManagement() {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [newUser, setNewUser] = useState(""); // State for new user name
  const [email, setEmail] = useState(""); // State for new user email
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [editUser, setEditUser] = useState(null); // State for user being edited

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API
  const fetchUsers = (searchQuery = "") => {
    const url = searchQuery 
      ? `/users/?search=${encodeURIComponent(searchQuery)}`
      : '/users/';
    
    axios.get(url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        alert("Error: " + (error.response?.data?.message || "Failed to fetch users. Is the backend running?"));
      });
  };

  // Handle the form submission to add or update a user
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newUser.trim() === "") {
      alert("User name cannot be empty!");
      return;
    }
    if (email.trim() === "") {
      alert("Email cannot be empty!");
      return;
    }

    const userData = { name: newUser, email: email, is_librarian: false };

    if (editUser) {
      // Update existing user
      axios
        .put(`/users/${editUser.id}/`, userData)
        .then(() => {
          fetchUsers(searchTerm); // Re-fetch with current search
          setNewUser("");
          setEmail("");
          setEditUser(null);
          alert("User updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating the user:", error);
          alert("Failed to update user. Please try again.");
        });
    } else {
      // Add new user
      axios
        .post("/users/", userData)
        .then((response) => {
          fetchUsers(searchTerm); // Re-fetch to show new user
          setNewUser("");
          setEmail("");
          alert("User added successfully!");
        })
        .catch((error) => {
          console.error("Error adding the user:", error);
          alert("Failed to add user. Please try again.");
        });
    }
  };

  // Function to delete a user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`/users/${id}/`)
        .then(() => {
          fetchUsers(searchTerm); // Re-fetch with current search
          alert("User deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting the user:", error);
          alert("Failed to delete user. Please try again.");
        });
    }
  };

  // Function to handle editing a user
  const handleEdit = (user) => {
    setNewUser(user.name);
    setEmail(user.email);
    setEditUser(user);
  };

  // Function to clear/cancel edit mode
  const handleCancelEdit = () => {
    setNewUser("");
    setEmail("");
    setEditUser(null);
  };

  // Handle search
  const handleSearch = () => {
    fetchUsers(searchTerm);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    fetchUsers("");
  };

  return (
    <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        User Management
      </h2>

      {/* Form to add or update a user */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Enter user name"
          style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#4CAF50", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {editUser ? "Update User" : "Add User"}
        </button>
        {editUser && (
          <button 
            type="button"
            onClick={handleCancelEdit}
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#f44336", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search users by name or email"
          style={{ 
            flex: 1, 
            padding: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "4px" 
          }}
        />
        <button 
          onClick={handleSearch}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#2196F3", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
        <button 
          onClick={handleClearSearch}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#9E9E9E", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Clear
        </button>
      </div>

      {/* User List as a Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ border: "1px solid #ddd", padding: "20px", textAlign: "center", color: "#999" }}>
                No users found. {searchTerm && "Try a different search term or "}Add a new user to get started.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} style={{ backgroundColor: editUser?.id === user.id ? "#fffde7" : "white" }}>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>{user.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>{user.email}</td>
                <td style={{ border: "1px solid #ddd", padding: "12px", textAlign: "center" }}>
                  <button 
                    onClick={() => handleEdit(user)} 
                    style={{ 
                      marginRight: "10px", 
                      padding: "6px 12px",
                      backgroundColor: "#FF9800",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    style={{ 
                      padding: "6px 12px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
