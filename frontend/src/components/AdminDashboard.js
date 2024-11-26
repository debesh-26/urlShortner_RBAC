import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const loggedInUserId = parseJwt(token).id;

      const response = await axios.get(
        "https://urlshortner-rbac.onrender.com/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const filteredUsers = response.data.filter(
        (user) => user._id !== loggedInUserId
      );
      setUsers(filteredUsers);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://urlshortner-rbac.onrender.com/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user", err);
    }
  };

  const updateUrl = async (urlId, newShortid, newRedirectUrl) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://urlshortner-rbac.onrender.com/admin/urls/${urlId}`,
        { shortid: newShortid, redirectUrl: newRedirectUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("URL updated successfully");
      fetchUsers();
    } catch (err) {
      alert("Failed to update URL", err);
    }
  };

  const deleteUrl = async (urlId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://urlshortner-rbac.onrender.com/admin/urls/delete/${urlId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("URL deleted successfully");
      fetchUsers();
    } catch (error) {
      alert("Failed to deleted URL", error);
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="loader"></div>
      </div>
    );
  }
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="users-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="mailhead">Email: {user.email}</div>
            <div className="mailhead">Role: {user.role}</div>
            <button
              className="delete-button"
              onClick={() => deleteUser(user._id)}
            >
              Delete User
            </button>
            <h2>All URL :</h2>
            <div className="urls-container">
              {user.urls.map((url) => (
                <div key={url._id} className="url-card">
                  <p>
                    <strong>Short ID:</strong> {url.shortid}
                  </p>
                  <p>
                    <strong>Redirect:</strong> {url.redirectUrl}
                  </p>
                  <p>
                    <strong>Clicks:</strong> {url.visitedHistory.length}
                  </p>
                  <button
                    onClick={() => {
                      const newShortid = prompt(
                        "Enter new Short ID:",
                        url.shortid
                      );
                      const newRedirectUrl = prompt(
                        "Enter new redirect URL:",
                        url.redirectUrl
                      );

                      if (newRedirectUrl && newShortid) {
                        updateUrl(url._id, newShortid, newRedirectUrl);
                      }
                    }}
                    className="update-button"
                  >
                    Update URL
                  </button>
                  <button
                    className="deleteurl"
                    onClick={() => {
                      deleteUrl(url._id);
                    }}
                  >
                    Delete URL
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
