import { useEffect, useState } from "react";
import api from "../../services/api";

const QRCode = () => {
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    fetchQR();
  }, []);

  const fetchQR = async () => {
    try {
      const res = await api.get("/qr/generate");
      setQrImage(res.data.qrImage);
    } catch (error) {
      console.log(error);
      alert("Failed to generate QR code");
    }
  };

  return (
    <div>
      <h1>Hostel Attendance QR Code</h1>

      <button className="btn" onClick={fetchQR}>
        Generate New QR
      </button>

      <div style={{ marginTop: "20px" }}>
        {qrImage ? (
          <img src={qrImage} alt="Hostel QR Code" width="300" />
        ) : (
          <p>No QR code generated.</p>
        )}
      </div>
    </div>
  );
};

export default QRCode;