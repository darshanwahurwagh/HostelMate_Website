import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaThLarge,
  FaBed,
  FaFileAlt,
  FaCreditCard,
  FaCalendarCheck,
  FaQrcode,
  FaHistory,
  FaReceipt,
  FaClipboardList,
  FaUtensils,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const StudentSidebar = ({ toggled = false, setToggled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/student/dashboard",
      icon: <FaThLarge />,
    },
    {
      title: "Room Request",
      path: "/student/room-request",
      icon: <FaBed />,
    },
    {
      title: "Complaints",
      path: "/student/complaints",
      icon: <FaFileAlt />,
    },
    {
      title: "Payments",
      path: "/student/payments",
      icon: <FaCreditCard />,
    },
    {
      title: "Attendance",
      path: "/student/attendance",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Attendance History",
      path: "/student/attendance-history",
      icon: <FaHistory />,
    },
    {
      title: "Fee History",
      path: "/student/fee-history",
      icon: <FaReceipt />,
    },
    {
      title: "Complaint History",
      path: "/student/complaint-history",
      icon: <FaClipboardList />,
    },
    {
      title: "Mess Bills",
      path: "/student/mess-bills",
      icon: <FaUtensils />,
    },
  ];

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled && setToggled(false)}
      breakPoint="sm"
      rootStyles={{
        height: "100vh",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderRight: "1px solid rgba(226, 232, 240, 0.1)",
        backgroundColor: "#0f172a",
        background: "linear-gradient(180deg, #0f172a, #111827)",
        boxShadow: "8px 0 30px rgba(15, 23, 42, 0.18)",
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
        [`.ps-sidebar-container`]: {
          background: "linear-gradient(180deg, #0f172a, #111827)",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: "24px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {!collapsed && (
          <h2
            className="sidebar-logo"
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HostelMate
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none",
            border: "none",
            color: "#cbd5e1",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            borderRadius: "8px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 0" }}>
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: "transparent",
              color: active ? "#ffffff" : "#cbd5e1",
              borderRadius: "12px",
              margin: "4px 16px",
              padding: "10px 14px",
              height: "46px",
              fontWeight: active ? "700" : "600",
              fontSize: "14px",
              transition: "all 0.25s ease",
              background: active ? "linear-gradient(135deg, #2563eb, #7c3aed)" : "transparent",
              boxShadow: active ? "0 8px 16px rgba(37, 99, 235, 0.25)" : "none",
              "&:hover": {
                background: active
                  ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                  : "rgba(59, 130, 246, 0.12)",
                color: "#ffffff",
                transform: "translateX(4px)",
              },
            }),
            icon: ({ active }) => ({
              color: active ? "#ffffff" : "#60a5fa",
              fontSize: "18px",
              marginRight: "6px",
              transition: "color 0.25s ease",
            }),
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              component={<Link to={item.path} />}
              active={location.pathname === item.path}
              onClick={() => setToggled && setToggled(false)}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <div style={{ padding: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: "10px",
            padding: "12px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          title="Logout"
        >
          <FaSignOutAlt style={{ fontSize: "18px" }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </Sidebar>
  );
};

export default StudentSidebar;
