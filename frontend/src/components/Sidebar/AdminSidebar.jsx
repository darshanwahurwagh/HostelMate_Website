import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaThLarge,
  FaBed,
  FaUserGraduate,
  FaFileAlt,
  FaCreditCard,
  FaQrcode,
  FaCalendarCheck,
  FaUtensils,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const AdminSidebar = ({ toggled = false, setToggled }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaThLarge />,
    },
    {
      title: "Rooms",
      path: "/rooms",
      icon: <FaBed />,
    },
    {
      title: "Students",
      path: "/students",
      icon: <FaUserGraduate />,
    },
    {
      title: "Complaints",
      path: "/complaints",
      icon: <FaFileAlt />,
    },
    {
      title: "Fees",
      path: "/fees",
      icon: <FaCreditCard />,
    },
    {
      title: "QR Code",
      path: "/admin/qr",
      icon: <FaQrcode />,
    },
    {
      title: "Attendance",
      path: "/admin/attendance",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Mess Bills",
      path: "/admin/mess-bills",
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
    </Sidebar>
  );
};

export default AdminSidebar;