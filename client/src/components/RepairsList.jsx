import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RepairsList = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's issues from backend
    const fetchRepairs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users/issues", {
          credentials: "include",
        });
        if (!response.ok) {
          setRepairs([]);
        } else {
          const data = await response.json();
          setRepairs(data.issues || []);
        }
      } catch (err) {
        setRepairs([]);
      }
      setLoading(false);
    };
    fetchRepairs();
  }, []);

  const handleIssueClick = (issueId) => {
    console.log("clicked");
    navigate(`/repairs/${issueId}`); // <-- Change this line
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 transition"
      >
        ← Back to Main
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Repair Requests
      </h2>

      {loading ? (
        <div className="text-center text-gray-600 mt-8">Loading...</div>
      ) : repairs.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          <p className="text-lg">No repair requests yet.</p>
          <p>Submit a repair request to see it here!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {repairs.map((repair) => (
            <div
              key={repair._id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500"
              onClick={() => handleIssueClick(repair._id)} // <-- FIXED HERE
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {repair.deviceType
                    ? "Device Repair"
                    : repair.vehicleType
                    ? "Vehicle Repair"
                    : "Repair"}
                </h3>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {repair.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>Type:</strong>{" "}
                  {repair.vehicleType || repair.deviceType}
                </div>
                <div>
                  <strong>Estimated Price:</strong> {repair.estimatedPrice}
                </div>
                <div>
                  <strong>Requested Date:</strong>{" "}
                  {repair.dateReported
                    ? new Date(repair.dateReported).toLocaleDateString()
                    : ""}
                </div>
                <div>
                  <strong>Repairer:</strong>{" "}
                  {repair.repairer?.name || "Not assigned"}
                </div>
              </div>

              {repair.description && (
                <div className="mt-3">
                  <strong className="text-gray-700">Problem Details:</strong>
                  <p className="text-gray-600 mt-1">{repair.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepairsList;
