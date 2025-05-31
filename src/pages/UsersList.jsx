import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          fullName: doc.data().fullName || "No Name",
          email: doc.data().email || "No Email",
          location: doc.data().location || "Unknown",
          foodItems: Array.isArray(doc.data().foodItems) ? doc.data().foodItems : [],
          ...doc.data()
        }));
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔍 Filtered Users with multiple search criteria
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) 
      // user.location.toLowerCase().includes(searchLower)
    );
  });

  // 📄 Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 🎯 Render helpers
  const renderFoodItems = (items) => {
    if (!items || items.length === 0) return "None";
    return items.join(", ");
  };

  if (loading) return <div className="text-center py-5">Loading users...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registered Users</h2>

      {/* Search Input */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="badge bg-primary">
            Showing {currentUsers.length} of {filteredUsers.length} users
          </span>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Food Items</th>
            </tr>
          </thead>
          <tbody>
  {currentUsers.length > 0 ? (
    currentUsers.map((user) => (
      <tr key={user.id}>
        <td>{user.fullName || "N/A"}</td>
        <td>{user.email || "N/A"}</td>
        <td>
          {user.location
            ? `${user.location._lat}, ${user.location._long}`
            : "No location"}
        </td>
        <td>
          {user.foodItems && user.foodItems.length > 0
            ? user.foodItems.join(", ")
            : "No food items"}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center">
        No users found.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="User pagination">
          <ul className="pagination justify-content-center">
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            >
              <button className="page-link">Previous</button>
            </li>

            {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else if (currentPage <= 3) {
                pageNum = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx;
              } else {
                pageNum = currentPage - 2 + idx;
              }

              return (
                <li
                  key={pageNum}
                  className={`page-item ${currentPage === pageNum ? "active" : ""}`}
                  onClick={() => paginate(pageNum)}
                >
                  <button className="page-link">{pageNum}</button>
                </li>
              );
            })}

            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            >
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default UsersList;