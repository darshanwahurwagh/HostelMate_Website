import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    pendingFees: 0,
    paidFees: 0,
    totalRevenue: 0,
    complaintChart: [],
    feeChart: [],
    roomChart: [],
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch dashboard data");
    }
  };

  const cards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
    },
    {
      title: "Total Rooms",
      value: stats.totalRooms,
    },
    {
      title: "Available Rooms",
      value: stats.availableRooms,
    },
    {
      title: "Occupied Rooms",
      value: stats.occupiedRooms,
    },
    {
      title: "Pending Complaints",
      value: stats.pendingComplaints,
    },
    {
      title: "Resolved Complaints",
      value: stats.resolvedComplaints,
    },
    {
      title: "Pending Fees",
      value: stats.pendingFees,
    },
    {
      title: "Paid Fees",
      value: stats.paidFees,
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
    },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        HostelMate Dashboard
      </h1>

      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <h3>{card.title}</h3>
            <h2>{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="chart-grid">
        <div className="chart-box">
          <h2>Complaint Analytics</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.complaintChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Fee Analytics</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.feeChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Room Occupancy</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.roomChart}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {stats.roomChart.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      index === 0
                        ? "#22c55e"
                        : "#ef4444"
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;