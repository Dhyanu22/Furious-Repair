import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const RepairerRepairsList = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRepairer, setIsRepairer] = useState(false);
  const [expertise, setExpertise] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check with backend if user is a repairer and get expertise
    const checkRepairer = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/repairer/me", {
          credentials: "include",
        });
        if (!res.ok) {
          setIsRepairer(false);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setIsRepairer(data.isRepairer);
        setExpertise(data.expertise || []);
        fetchRepairs();
      } catch {
        setIsRepairer(false);
        setLoading(false);
      }
    };

    const fetchRepairs = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/repairer/issues",
          {
            credentials: "include",
          }
        );
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

    checkRepairer();
    // eslint-disable-next-line
  }, []);

  const handleBack = () => navigate("/");

  // Function to claim an issue
  const handleClaimIssue = async (issueId) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/repairer/issues/${issueId}/claim`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        // Optionally, re-fetch the repairs list for updated status
        // Or update the status locally:
        setRepairs((prev) =>
          prev.map((issue) =>
            issue._id === issueId ? { ...issue, status: "working" } : issue
          )
        );
      } else {
        alert("Failed to claim issue.");
      }
    } catch {
      alert("Error claiming issue.");
    }
  };

  if (!isRepairer && !loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Access Denied</h2>
        <p className="text-gray-700">
          You must be logged in as a repairer to view this page.
        </p>
        <button
          onClick={handleBack}
          className="mt-6 px-4 py-2 bg-orange-700 text-white rounded hover:bg-orange-800 transition"
        >
          ← Back to Main
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-orange-700 text-white rounded hover:bg-orange-800 transition"
      >
        ← Back to Main
      </button>

      <h2 className="text-3xl font-bold text-orange-900 mb-6 text-center">
        Repairs Matching Your Expertise
      </h2>

      {loading ? (
        <div className="text-center text-gray-600 mt-8">Loading...</div>
      ) : repairs.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          <p className="text-lg">No matching repair requests yet.</p>
          <p>Repairs matching your expertise will appear here!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {repairs.map((repair) => (
            <div
              key={repair._id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-700"
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
                  <strong>User Name:</strong> {repair.user?.name || "Unknown"}
                </div>
              </div>

              {repair.description && (
                <div className="mt-3">
                  <strong className="text-gray-700">Problem Details:</strong>
                  <p className="text-gray-600 mt-1">{repair.description}</p>
                </div>
              )}

              {/* Claim Issue Button */}
              {repair.status === "pending" && (
                <button
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={() => handleClaimIssue(repair._id)}
                >
                  Claim & Start Working
                </button>
              )}
              {repair.status === "working" && (
                <span className="mt-4 inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded">
                  You are working on this issue
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepairerRepairsList;
