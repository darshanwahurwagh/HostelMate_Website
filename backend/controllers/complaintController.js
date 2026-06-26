const Complaint = require("../models/Complaint");

// Create Complaint
const createComplaint = async (req, res) => {
try {
const complaint = await Complaint.create(req.body);

res.status(201).json(complaint);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Get All Complaints
const getComplaints = async (req, res) => {
try {
const complaints = await Complaint.find().sort({
createdAt: -1,
});


res.status(200).json(complaints);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Get Complaints By Student Name
const getStudentComplaints = async (req, res) => {
try {
const complaints = await Complaint.find({
studentName: req.params.studentName,
}).sort({
createdAt: -1,
});


res.status(200).json(complaints);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Update Complaint Status
const updateComplaintStatus = async (req, res) => {
try {
const complaint = await Complaint.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
}
);


if (!complaint) {
  return res.status(404).json({
    message: "Complaint not found",
  });
}

res.status(200).json(complaint);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
try {
const complaint = await Complaint.findByIdAndDelete(
req.params.id
);


if (!complaint) {
  return res.status(404).json({
    message: "Complaint not found",
  });
}

res.status(200).json({
  message: "Complaint deleted successfully",
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

module.exports = {
createComplaint,
getComplaints,
getStudentComplaints,
updateComplaintStatus,
deleteComplaint,
};
