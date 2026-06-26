const QRCode = require("qrcode");

const generateQRCode = async (req, res) => {
  try {
    const qrData = JSON.stringify({
      type: "HOSTEL_ATTENDANCE",
      hostel: "HostelMate",
      purpose: "check-in-out",
      createdAt: new Date(),
    });

    const qrImage = await QRCode.toDataURL(qrData);

    res.status(200).json({
      success: true,
      qrImage,
      qrData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateQRCode,
};