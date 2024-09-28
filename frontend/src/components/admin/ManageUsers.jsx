import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";


const url = "https://mern-ecommerce-techproject.onrender.com";
const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [editingUser, setEditingUser] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/user/all`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/user/delete/${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle starting to edit a user
  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUserData(user);
  };

  // Handle saving edited user
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${url}/user/${editingUser._id}`,
        newUserData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const updatedUsers = users.map((user) =>
        user._id === editingUser._id ? response.data : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle input changes during editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h2 style={{ marginLeft: "10px", fontFamily: "sans-serif" }}>
        Manage Users
      </h2>
      <table
        className="table table-bordered border-primary"
        style={{ margin: "7px", width: "1520px" }}
      >
        <thead className="text-center">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>

              <td>
                <button
                  onClick={() => handleEdit(user)}
                  className="btn btn-primary mx-3"
                >
                  <MdEdit
                    style={{ color: "white", height: "15px", width: "35px" }}
                  />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={{
                    backgroundColor: "red",
                    borderRadius: "5px",
                    color: "white",
                    border: "none",
                    fontWeight: "700",
                    fontSize: "13px",
                    height: "30px",
                    width: "50px",
                  }}
                >
                  <RiDeleteBin6Line
                    style={{ color: "white", marginBottom: "2px" }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div
          className="container edit-user-form my-1"
          style={{
            backgroundColor: "white",
            width: "400px",
            height: "230px",
            borderRadius: "30px",
            padding: "10px 10px 20px,20px",
          }}
        >
          <h4 className="text-center">Edit User</h4>
          <form onSubmit={(e) => e.preventDefault()} className="offset-2 my-3">
            <div className="form-group">
              <label>
                <b>Name</b>
              </label>
              <input
                type="text"
                name="userName"
                value={newUserData.userName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>
                <b>Email</b>
              </label>
              <input
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <button onClick={handleSave} className="btn btn-success my-4 mx-3">
              Save
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
