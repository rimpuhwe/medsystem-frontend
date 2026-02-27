"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeCameraScanConfig } from "html5-qrcode";
import { QrCode, Pencil } from "lucide-react";

export default function ScanPrescriptionPage() {
  const qrRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [scanning, setScanning] = useState(false);
  const [manualId, setManualId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [prescription, setPrescription] = useState<any>(null);

  const startScanning = async () => {
    if (!qrRef.current || scanning) return;

    setScanning(true);
    setMessage("");

    const html5QrCode = new Html5Qrcode("qr-reader");
    scannerRef.current = html5QrCode;

    const config: Html5QrcodeCameraScanConfig = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    try {
      await html5QrCode.start(
        { facingMode: "environment" }, // 1️⃣ camera config
        config,                        // 2️⃣ scan config
        async (decodedText) => {        // 3️⃣ success callback
          await handleRetrieve(decodedText);
          await stopScanner();
        },
        (errorMessage) => {             // 4️⃣ error callback (REQUIRED)
          // This fires continuously while scanning
          console.warn("QR Scan error:", errorMessage);
        }
      );
    } catch (error) {
      setMessage("Camera unavailable or permission denied.");
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (err) {
        console.error("Failed to stop scanner:", err);
      }
      scannerRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const handleRetrieve = async (id: string) => {
    if (!id) return;

    try {
      setLoading(true);
      setMessage("");
      setPrescription(null);

      const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
      const found = prescriptions.find((p: any) => p.id === id || p.referenceId === id);

      if (found) {
        setPrescription(found);
        setMessage("Prescription retrieved successfully ✅");
      } else {
        setMessage("Prescription not found ❌");
      }
    } catch {
      setMessage("Failed to retrieve prescription ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <div className="max-w-5xl mx-auto p-8 space-y-6">

        {/* ================= Scan QR Section ================= */}
        <SectionCard
          icon={<QrCode size={18} className="text-blue-600" />}
          title="Scan Prescription QR Code"
        >
          <div
            id="qr-reader"
            ref={qrRef}
            className="border-2 border-dashed border-gray-300 rounded-lg h-72 flex items-center justify-center text-gray-400 text-sm mb-6"
          >
            {!scanning && "Position QR code within the frame"}
          </div>

          <button
            onClick={startScanning}
            disabled={scanning}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition disabled:opacity-50"
          >
            {scanning ? "Scanning..." : "Start Scanning"}
          </button>
        </SectionCard>

        {/* ================= Manual Entry Section ================= */}
        <SectionCard
          icon={<Pencil size={18} className="text-green-600" />}
          title="Manual Entry"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Prescription Reference ID
              </label>
              <input
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                placeholder="Enter prescription reference ID..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              onClick={() => handleRetrieve(manualId)}
              disabled={!manualId || loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition disabled:opacity-50"
            >
              {loading ? "Retrieving..." : "Retrieve Prescription"}
            </button>

            {message && (
              <p className="text-sm text-gray-600">{message}</p>
            )}
            
            {prescription && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Prescription Details</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Patient:</strong> {prescription.patientName}</p>
                  <p><strong>Doctor:</strong> {prescription.doctorName}</p>
                  <p><strong>Medicine:</strong> {prescription.medicineName}</p>
                  <p><strong>Dosage:</strong> {prescription.dosage}</p>
                  <p><strong>Frequency:</strong> {prescription.frequency}</p>
                  <p><strong>Duration:</strong> {prescription.duration}</p>
                  {prescription.instructions && <p><strong>Instructions:</strong> {prescription.instructions}</p>}
                </div>
                <button
                  onClick={() => {
                    const dispensed = JSON.parse(localStorage.getItem('dispensedPrescriptions') || '[]');
                    dispensed.push({ ...prescription, dispensedAt: new Date().toISOString() });
                    localStorage.setItem('dispensedPrescriptions', JSON.stringify(dispensed));
                    setMessage("Prescription dispensed successfully ✅");
                    setPrescription(null);
                    setManualId("");
                  }}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm transition"
                >
                  Dispense Medicine
                </button>
              </div>
            )}
          </div>
        </SectionCard>

      </div>
    </div>
  );
}

/* ================= Reusable Section Card ================= */

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 className="text-sm font-semibold text-gray-700">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}