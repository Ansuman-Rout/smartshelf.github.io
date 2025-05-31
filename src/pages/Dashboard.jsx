import React, { useEffect, useState } from "react";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

function Dashboard() {
  const [inventory, setInventory] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Real-time listener for inventory
    const unsubscribeInventory = onSnapshot(collection(db, "users"), (snapshot) => {
      const inventoryData = snapshot.docs.map(doc => doc.data());
      const groupedInventory = {};
      inventoryData.forEach(entry => {
        const location = entry.location || "Unknown";
        if (!groupedInventory[location]) groupedInventory[location] = [];
        groupedInventory[location].push(...entry.foodItems);
      });
      setInventory(groupedInventory);
    });

    // Real-time listener for requests
    const unsubscribeRequests = onSnapshot(collection(db, "distribution_requests"), (snapshot) => {
      const requestData = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(req => req.status !== "delivered");
      setRequests(requestData);
    });

    // Cleanup on unmount
    return () => {
      unsubscribeInventory();
      unsubscribeRequests();
    };
  }, []);

  const assignAgent = async (reqId, agentName) => {
    await updateDoc(doc(db, "distribution_requests", reqId), {
      pickupAgent: agentName,
      status: "assigned",
    });
  };

  const markDelivered = async (reqId) => {
    await updateDoc(doc(db, "distribution_requests", reqId), {
      status: "delivered",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="card my-3">
        <div className="card-header bg-primary text-white">📦 Food Inventory</div>
        <div className="card-body">
          {Object.entries(inventory).map(([loc, items], i) => (
            <p key={i}><strong>{loc}</strong>: {items.length} items</p>
          ))}
        </div>
      </div>

      <div className="card my-3">
        <div className="card-header bg-warning">📝 Pending Requests</div>
        <div className="card-body">
          {requests.filter(req => req.status === "pending").length === 0 ? (
            <p>No pending requests</p>
          ) : (
            <ul>
              {requests.filter(req => req.status === "pending").map((req) => (
                <li key={req.id}>
                  <strong>{req.name}</strong> ({req.location}) - Needs: {req.neededItems.join(", ")}
                  <div>
                    <input
                      type="text"
                      placeholder="Assign Pickup Agent"
                      onBlur={(e) => assignAgent(req.id, e.target.value)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card my-3">
        <div className="card-header bg-success text-white">🚚 Assigned Requests</div>
        <div className="card-body">
          {requests.filter(req => req.status === "assigned").length === 0 ? (
            <p>No assigned requests</p>
          ) : (
            <ul>
              {requests.filter(req => req.status === "assigned").map((req) => (
                <li key={req.id}>
                  <strong>{req.name}</strong> ({req.location}) - Assigned to: {req.pickupAgent} <br />
                  Needs: {req.neededItems.join(", ")} <br />
                  <button onClick={() => markDelivered(req.id)} className="btn btn-sm btn-success mt-2">
                    Mark as Delivered
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
