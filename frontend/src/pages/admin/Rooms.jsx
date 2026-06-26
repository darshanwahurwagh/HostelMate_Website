import { useEffect, useState } from "react";
import api from "../../services/api";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    roomNumber: "",
    capacity: "",
    type: "Single",
    status: "Available",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch rooms");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/rooms/${editId}`, formData);
        alert("Room updated successfully");
      } else {
        await api.post("/rooms", formData);
        alert("Room added successfully");
      }

      setFormData({
        roomNumber: "",
        capacity: "",
        type: "Single",
        status: "Available",
      });

      setEditId(null);
      fetchRooms();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (room) => {
    setEditId(room._id);

    setFormData({
      roomNumber: room.roomNumber,
      capacity: room.capacity,
      type: room.type,
      status: room.status,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/rooms/${id}`);
      alert("Room deleted successfully");
      fetchRooms();
    } catch (error) {
      console.log(error);
      alert("Failed to delete room");
    }
  };

  return (
    <div>
      <h1>Room Management</h1>

      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={formData.roomNumber}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Available">Available</option>
          <option value="Full">Full</option>
        </select>

        <button className="btn" type="submit">
          {editId ? "Update Room" : "Add Room"}
        </button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Capacity</th>
              <th>Type</th>
              <th>Status</th>
              <th>Occupied</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.roomNumber}</td>
                <td>{room.capacity}</td>
                <td>{room.type}</td>
                <td>{room.status}</td>
                <td>{room.occupied}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleEdit(room)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(room._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rooms.length === 0 && <p>No rooms found.</p>}
      </div>
    </div>
  );
};

export default Rooms;