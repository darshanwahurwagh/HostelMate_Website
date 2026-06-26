import { useEffect, useState } from "react";
import api from "../../services/api";

const RoomRequest = () => {
  const [rooms, setRooms] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchStudent();
    await fetchRooms();
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

  const fetchStudent = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      if (!studentId || studentId === "null") {
        alert("Student ID not found. Please logout and login again.");
        return;
      }

      const res = await api.get(`/students/${studentId}`);
      setStudent(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch student details");
    }
  };

  const applyForRoom = async (roomId) => {
    try {
      const studentId = localStorage.getItem("studentId");

      const res = await api.put(`/students/apply-room/${studentId}`, {
        roomId,
      });

      alert(res.data.message || "Room request submitted successfully");
      await loadData();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to apply for room");
    }
  };

  const allocatedRoomId = student?.room?._id;
  const requestStatus = student?.roomRequest?.status || "None";
  const requestedRoomId = student?.roomRequest?.requestedRoom?._id;

  return (
    <div>
      <h1>Room Request</h1>

      {student?.room && (
        <p>
          <strong>Allocated Room:</strong>{" "}
          {student.room.roomNumber}
        </p>
      )}

      {!student?.room &&
        requestStatus === "Pending" &&
        student?.roomRequest?.requestedRoom && (
          <p>
            <strong>Request Status:</strong> Pending for Room{" "}
            {student.roomRequest.requestedRoom.roomNumber}
          </p>
        )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => {
              const isAllocatedRoom = allocatedRoomId === room._id;

              const isRequestedRoom =
                requestStatus === "Pending" &&
                requestedRoomId === room._id;

              const hasAllocatedRoom = Boolean(allocatedRoomId);

              const hasPendingRequest =
                requestStatus === "Pending";

              const isFull =
                room.status === "Full" ||
                Number(room.occupied) >= Number(room.capacity);

              return (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.type}</td>
                  <td>{room.capacity}</td>
                  <td>
                    {room.occupied}/{room.capacity}
                  </td>
                  <td>{isFull ? "Full" : "Available"}</td>

                  <td>
                    {isAllocatedRoom ? (
                      <span>Allocated</span>
                    ) : hasAllocatedRoom ? (
                      <span>Cannot Apply</span>
                    ) : isRequestedRoom ? (
                      <span>Pending</span>
                    ) : hasPendingRequest ? (
                      <span>Another Request Pending</span>
                    ) : isFull ? (
                      <span>Full</span>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => applyForRoom(room._id)}
                      >
                        Apply
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {rooms.length === 0 && <p>No rooms available.</p>}
      </div>
    </div>
  );
};

export default RoomRequest;