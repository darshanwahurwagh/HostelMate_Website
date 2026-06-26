import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../services/api";

const QRScanner = () => {
  const scannerRef = useRef(null);
  const scannedRef = useRef(false);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );

    scannerRef.current.render(
      async (decodedText) => {
        if (scannedRef.current) return;

        scannedRef.current = true;

        try {
          const studentId = localStorage.getItem("studentId");

          const res = await api.post("/scan/attendance", {
            studentId,
            qrData: decodedText,
          });

          alert(res.data.message);

          scannerRef.current.clear();
        } catch (error) {
          console.log(error);
          alert(error.response?.data?.message || "QR scan failed");
          scannedRef.current = false;
        }
      },
      () => {}
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  return (
    <div>
      <h1>Scan QR for Attendance</h1>

      <div
        id="qr-reader"
        style={{
          width: "350px",
          marginTop: "20px",
        }}
      ></div>
    </div>
  );
};

export default QRScanner;