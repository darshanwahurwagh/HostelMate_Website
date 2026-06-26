import { useEffect, useState } from "react";
import api from "../../services/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [selectedRoom, setSelectedRoom] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null); // For viewing student details

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch students");
    }
  };

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

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      await api.post("/students", formData);

      alert("Student added successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
      });

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add student");
    }
  };

  const allocateRoom = async (studentId, roomIdFromRequest = null) => {
    const roomId = roomIdFromRequest || selectedRoom[studentId];

    if (!roomId) {
      alert("Please select a room first");
      return;
    }

    try {
      const res = await api.put(`/students/allocate/${studentId}`, {
        roomId,
      });

      alert(res.data.message || "Room allocated successfully");

      fetchStudents();
      fetchRooms();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to allocate room");
    }
  };

  const rejectRoomRequest = async (studentId) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this room request?"
    );

    if (!confirmReject) return;

    try {
      const res = await api.put(`/students/reject-room/${studentId}`);

      alert(res.data.message || "Room request rejected");

      fetchStudents();
      fetchRooms();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to reject request");
    }
  };

  const getAvailableRooms = () => {
    return rooms.filter(
      (room) => room.status !== "Full" && room.occupied < room.capacity
    );
  };

  return (
    <div>
      <h1>Student Management</h1>

      <form className="form-grid" onSubmit={addStudent}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Student Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <button className="btn" type="submit">
          Add Student
        </button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Allocated Room</th>
              <th>Room Request</th>
              <th>Manual Allocation</th>
              <th>Profile</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => {
              const requestedRoom = student.roomRequest?.requestedRoom;
              const requestStatus = student.roomRequest?.status || "None";

              return (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>

                  <td>
                    {student.room ? student.room.roomNumber : "Not Allocated"}
                  </td>

                  <td>
                    {requestStatus === "Pending" && requestedRoom ? (
                      <span>
                        Pending: {requestedRoom.roomNumber}
                      </span>
                    ) : requestStatus === "Approved" && requestedRoom ? (
                      <span>
                        Approved: {requestedRoom.roomNumber}
                      </span>
                    ) : requestStatus === "Rejected" && requestedRoom ? (
                      <span>
                        Rejected: {requestedRoom.roomNumber}
                      </span>
                    ) : (
                      <span>No Request</span>
                    )}
                  </td>

                  <td>
                    <select
                      value={selectedRoom[student._id] || ""}
                      onChange={(e) =>
                        setSelectedRoom({
                          ...selectedRoom,
                          [student._id]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Room</option>

                      {getAvailableRooms().map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.roomNumber} - {room.type} ({room.occupied}/
                          {room.capacity})
                        </option>
                      ))}
                    </select>

                    <button
                      className="btn"
                      onClick={() => allocateRoom(student._id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Allocate
                    </button>
                  </td>

                  <td>
                    <button className="btn" onClick={() => setSelectedStudent(student)} style={{ background: "#475569" }}>
                      View
                    </button>
                  </td>

                  <td>
                    {requestStatus === "Pending" && requestedRoom ? (
                      <>
                        <button
                          className="btn"
                          onClick={() =>
                            allocateRoom(student._id, requestedRoom._id)
                          }
                          style={{ marginRight: "10px" }}
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => rejectRoomRequest(student._id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>No Action</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {students.length === 0 && <p>No students found.</p>}
      </div>

      {/* Student Details Modal Placeholder */}
      {selectedStudent && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div className="profile-card" style={{ width: "90%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <button onClick={() => setSelectedStudent(null)} style={{ position: "absolute", top: "15px", right: "20px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>&times;</button>
            <h2 style={{ marginBottom: "20px", color: "#0f172a" }}>Student Profile</h2>
            
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#e2e8f0", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                {selectedStudent.profilePicture ? (
                  <img src={selectedStudent.profilePicture} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "28px", color: "#94a3b8", fontWeight: "bold" }}>{selectedStudent.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div>
                <h3 style={{ margin: 0, color: "#1e293b", fontSize: "20px" }}>{selectedStudent.name}</h3>
                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>{selectedStudent.course}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px", fontWeight: "600" }}>Email</p>
                <p style={{ margin: 0, color: "#1e293b", fontSize: "15px", wordBreak: "break-all" }}>{selectedStudent.email}</p>
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px", fontWeight: "600" }}>Phone</p>
                <p style={{ margin: 0, color: "#1e293b", fontSize: "15px" }}>{selectedStudent.phone}</p>
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px", fontWeight: "600" }}>Education</p>
                <p style={{ margin: 0, color: "#1e293b", fontSize: "15px" }}>{selectedStudent.education || "N/A"}</p>
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px", fontWeight: "600" }}>City</p>
                <p style={{ margin: 0, color: "#1e293b", fontSize: "15px" }}>{selectedStudent.city || "N/A"}</p>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px", fontWeight: "600" }}>Permanent Address</p>
                <p style={{ margin: 0, color: "#1e293b", fontSize: "15px" }}>{selectedStudent.permanentAddress || "N/A"}</p>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px", fontWeight: "600" }}>Allocated Room</p>
                <p style={{ margin: 0, color: "#1e293b", fontSize: "15px" }}>{selectedStudent.room ? selectedStudent.room.roomNumber : "Not Allocated"}</p>
              </div>
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <button className="btn" onClick={() => setSelectedStudent(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;