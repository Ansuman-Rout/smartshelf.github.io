import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

function FoodInventory() {
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    const fetchInventory = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map(doc => doc.data());

      const grouped = {};

      data.forEach(entry => {
        const location = entry.location || "Unknown";
        if (!grouped[location]) {
          grouped[location] = [];
        }
        grouped[location].push(...entry.foodItems);
      });

      setInventory(grouped);
    };

    fetchInventory();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Organized Food Inventory</h2>
      {Object.keys(inventory).length === 0 ? (
        <p>No food data found.</p>
      ) : (
        Object.entries(inventory).map(([location, items], index) => (
          <div key={index} className="card my-3">
            <div className="card-header bg-primary text-white">
              📍 Location: {location}
            </div>
            <div className="card-body">
              <ul className="list-group">
                {items.map((item, i) => (
                  <li key={i} className="list-group-item">
                    🍽️ {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FoodInventory;
