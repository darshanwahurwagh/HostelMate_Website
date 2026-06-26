import { useState } from "react";
import StudentSidebar from "../components/Sidebar/StudentSidebar";
import Navbar from "../components/Navbar/Navbar";

const StudentLayout = ({ children }) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="student-layout">
      <StudentSidebar toggled={toggled} setToggled={setToggled} />
      <div className="main-content">
        <Navbar 
          title="HostelMate Student Panel" 
          onToggleSidebar={() => setToggled(!toggled)} 
        />
        {children}
      </div>
    </div>
  );
};

export default StudentLayout;
