import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import AdminSidebar from "../components/Sidebar/AdminSidebar";

const AdminLayout = ({ children }) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar toggled={toggled} setToggled={setToggled} />
      <div className="main-content">
        <Navbar title="HostelMate Admin Panel" onToggleSidebar={() => setToggled(!toggled)} />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;