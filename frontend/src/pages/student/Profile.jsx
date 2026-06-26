import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaUpload, FaTrash } from "react-icons/fa";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    education: "",
    city: "",
    permanentAddress: "",
    profilePicture: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      if (!studentId) {
        setLoading(false);
        return;
      }

      const res = await api.get(`/students/${studentId}`);
      setStudent(res.data);
      setFormData({
        name: res.data.name || "",
        phone: res.data.phone || "",
        education: res.data.education || "",
        city: res.data.city || "",
        permanentAddress: res.data.permanentAddress || "",
        profilePicture: res.data.profilePicture || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setFormData({ ...formData, profilePicture: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const studentId = localStorage.getItem("studentId");
      await api.put(`/students/${studentId}`, formData);
      alert("Profile updated successfully!");
      fetchProfile();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="profile-container">
        <h2>Student Profile Not Found</h2>
      </div>
    );
  }

  return (
    <div className="profile-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="dashboard-title">Edit Profile</h1>

      <div className="profile-card">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#e2e8f0",
              overflow: "hidden",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "4px solid white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {formData.profilePicture ? (
              <img src={formData.profilePicture} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "40px", color: "#94a3b8", fontWeight: "bold" }}>
                {formData.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <label className="btn" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              <FaUpload /> Upload Image
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
            </label>
            {formData.profilePicture && (
              <button type="button" className="btn btn-danger" onClick={removeProfilePicture} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaTrash /> Remove
              </button>
            )}
          </div>
        </div>

        <form className="form-grid" style={{ gridTemplateColumns: "1fr 1fr" }} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "#334155" }}>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "#334155" }}>Email (Read Only)</label>
            <input type="email" value={student.email} disabled style={{ backgroundColor: "#f1f5f9", cursor: "not-allowed" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "#334155" }}>Mobile Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "#334155" }}>Course (Read Only)</label>
            <input type="text" value={student.course} disabled style={{ backgroundColor: "#f1f5f9", cursor: "not-allowed" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "#334155" }}>Education</label>
            <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="e.g. B.Tech" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "#334155" }}>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Mumbai" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px", gridColumn: "1 / -1" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "#334155" }}>Permanent Address</label>
            <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Enter full address" rows="3"></textarea>
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <button type="submit" className="btn" disabled={saving} style={{ width: "150px" }}>
              {saving ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
