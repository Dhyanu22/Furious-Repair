import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VehicleForm = () => {
  const [formData, setFormData] = useState({});
  const [vehicleType, setVehicleType] = useState("");
  const [problemDetails, setProblemDetails] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("₹1000 - ₹3000");
  const navigate = useNavigate();

  useEffect(() => {
    // Get form data from localStorage
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const data = JSON.parse(savedFormData);
      setFormData(data);
      setProblemDetails(data.description || "");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleType) {
      alert("Please select a vehicle type.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/users/issue", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleType,
          description: problemDetails,
          estimatedPrice,
          date: formData.date,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Failed to submit issue");
        return;
      }

      alert("Vehicle repair request submitted!");
      navigate("/");
    } catch (err) {
      alert("Error submitting issue");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="p-6 text-center bg-orange-50 min-h-screen">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
      >
        ← Back to Main
      </button>

      <h2 className="text-3xl font-bold text-orange-900 mb-4">
        Vehicle Repair Form
      </h2>
      <p className="text-gray-700 mb-6">
        Fill in your vehicle repair details below.
      </p>

      <div className="max-w-md mx-auto space-y-4 text-left">
        <div>
          <label className="block font-semibold text-orange-900 mb-1">
            Select Vehicle Type
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full p-3 rounded border border-orange-300 bg-white text-orange-800 font-medium"
          >
            <option value="">-- Select Vehicle Type --</option>
            <option>Car</option>
            <option>Bike</option>
            <option>Scooter</option>
            <option>Truck</option>
            <option>Electric Vehicle (EV)</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-orange-900 mb-1">
            Problem Details
          </label>
          <textarea
            rows="3"
            value={problemDetails}
            onChange={(e) => setProblemDetails(e.target.value)}
            className="w-full p-3 rounded border border-orange-300 bg-white text-orange-800 font-medium"
          />
        </div>

        <div>
          <label className="block font-semibold text-orange-900 mb-1">
            Estimated Price
          </label>
          <select
            value={estimatedPrice}
            onChange={(e) => setEstimatedPrice(e.target.value)}
            className="w-full p-3 rounded border border-orange-300 bg-white text-orange-800 font-medium"
          >
            <option>₹1000 - ₹3000</option>
            <option>₹3000 - ₹5000</option>
            <option>₹5000 - ₹10000</option>
            <option>₹10000 - ₹20000</option>
            <option>Above ₹20000</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-orange-900 mb-1">
            Requested Date
          </label>
          <input
            type="text"
            value={formData.date || ""}
            readOnly
            className="w-full p-3 rounded border border-orange-300 bg-gray-100 text-orange-800 font-medium"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded transition"
        >
          Submit Repair Request
        </button>
      </div>
    </div>
  );
};

export default VehicleForm;
