// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// const Navbar = ({ title }) => {
//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);

//   const handleLogout = () => {
//     const confirmLogout = window.confirm(
//       "Are you sure you want to logout?"
//     );

//     if (!confirmLogout) return;

//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="navbar">
//       <div>
//         <h3>{title}</h3>
//         <p className="navbar-subtitle">
//           Welcome, {user?.name || "User"}
//         </p>
//       </div>

//       <div className="navbar-right">
//         <span className="navbar-role">
//           {user?.role}
//         </span>

//         <button
//           className="logout-btn"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaBars, FaQrcode, FaUserCircle } from "react-icons/fa";
import api from "../../services/api";

const Navbar = ({ title, onToggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (user?.role === "Student") {
      const studentId = localStorage.getItem("studentId");
      if (studentId) {
        api.get(`/students/${studentId}`).then(res => {
          if (res.data.profilePicture) {
            setProfilePic(res.data.profilePicture);
          }
        }).catch(err => console.error(err));
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="premium-navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="navbar-toggle-btn"
            style={{
              background: "none",
              border: "none",
              color: "#0f172a",
              cursor: "pointer",
              fontSize: "22px",
              display: "none", // Visible only on mobile via index.css
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              borderRadius: "8px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(15, 23, 42, 0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <FaBars />
          </button>
        )}
        <div>
          <h2>{title}</h2>
          <p>Welcome, {user?.name || "User"}</p>
        </div>
      </div>

      <div className="premium-navbar-right">
        {user?.role === "Student" && (
          <div 
            onClick={() => navigate("/student/profile")}
            style={{ 
              display: "flex", alignItems: "center", gap: "10px", cursor: "pointer",
              padding: "5px 12px", borderRadius: "30px", background: "rgba(255,255,255,0.1)",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            title="Edit Profile"
          >
            {profilePic ? (
              <img src={profilePic} alt="Profile" style={{ width: "35px", height: "35px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }} />
            ) : (
              <FaUserCircle style={{ fontSize: "35px", color: "white" }} />
            )}
            <span style={{ fontWeight: "600", fontSize: "14px", color: "white", display: "none" }} className="navbar-username">{user?.name}</span>
          </div>
        )}

        {user?.role === "Student" && (
          <button
            onClick={() => navigate("/student/scan-qr")}
            className="navbar-scan-btn"
            style={{
              border: "none",
              padding: "10px 16px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              color: "white",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)",
              marginRight: "8px",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <FaQrcode style={{ fontSize: "16px" }} />
            <span>Scan QR</span>
          </button>
        )}

        {user?.role !== "Student" && (
          <span className="role-badge">{user?.role}</span>
        )}

        {user?.role !== "Student" && (
          <button className="logout-premium" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

    </nav>
  );
};

export default Navbar;