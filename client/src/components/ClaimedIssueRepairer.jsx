import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClaimedIssueRepairer = () => {
  const [claimedIssues, setClaimedIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch claimed issues for the logged-in repairer
    const fetchClaimedIssues = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/repairer/claimed",
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          setClaimedIssues([]);
        } else {
          const data = await response.json();
          setClaimedIssues(data.issues || []);
        }
      } catch (err) {
        setClaimedIssues([]);
      }
      setLoading(false);
    };
    fetchClaimedIssues();
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const handleIssueClick = (issueId) => {
    navigate(`/repairer/claimed/${issueId}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 transition"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold text-orange-900 mb-6 text-center">
        Claimed Issues
      </h2>

      {loading ? (
        <div className="text-center text-gray-600 mt-8">Loading...</div>
      ) : claimedIssues.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          <p className="text-lg">No claimed issues yet.</p>
          <p>Claim issues to see them here!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {claimedIssues.map((issue) => (
            <div
              key={issue._id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-700 cursor-pointer hover:bg-orange-50 transition"
              onClick={() => handleIssueClick(issue._id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {issue.deviceType
                    ? "Device Repair"
                    : issue.vehicleType
                    ? "Vehicle Repair"
                    : "Repair"}
                </h3>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {issue.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>Type:</strong> {issue.vehicleType || issue.deviceType}
                </div>
                <div>
                  <strong>Estimated Price:</strong> {issue.estimatedPrice}
                </div>
                <div>
                  <strong>Requested Date:</strong>{" "}
                  {issue.dateReported
                    ? new Date(issue.dateReported).toLocaleDateString()
                    : ""}
                </div>
                <div>
                  <strong>User Name:</strong> {issue.user?.name || "Unknown"}
                </div>
              </div>

              {issue.description && (
                <div className="mt-3">
                  <strong className="text-gray-700">Problem Details:</strong>
                  <p className="text-gray-600 mt-1">{issue.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimedIssueRepairer;
