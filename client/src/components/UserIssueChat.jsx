import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserIssueChat = () => {
  const { issueId } = useParams();
  const [issue, setIssue] = useState(null);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Fetch issue details
    const fetchIssue = async () => {
      const res = await fetch(
        `http://localhost:3001/api/users/issues/${issueId}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setIssue(data.issue);
    };
    fetchIssue();
  }, [issueId]);

  const fetchChat = async () => {
    const res = await fetch(
      `http://localhost:3001/api/users/issues/${issueId}/chat`,
      { credentials: "include" }
    );
    const data = await res.json();
    setChat(data.chat);
    setLoading(false);
  };

  useEffect(() => {
    fetchChat();
    // Optionally, you can poll for new messages every few seconds:
    // const interval = setInterval(fetchChat, 5000);
    // return () => clearInterval(interval);
  }, [issueId]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const handleSend = async () => {
    if (input.trim()) {
      await fetch(
        `http://localhost:3001/api/users/issues/${issueId}/chat/message`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input, sender: "user" }),
        }
      );
      setInput("");
      await fetchChat(); // <-- Refetch chat after sending
    }
  };

  const handleBack = () => {
    navigate("/repairs");
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading issue details...</div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-red-600">Issue not found.</div>
        <button
          onClick={handleBack}
          className="ml-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 transition"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 transition"
      >
        ← Back to My Repairs
      </button>

      <h2 className="text-2xl font-bold text-orange-900 mb-4">Issue Details</h2>
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-700 mb-4 max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
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
            <strong>Repairer:</strong> {issue.repairer?.name || "Not assigned"}
          </div>
        </div>
        {issue.description && (
          <div className="mt-2">
            <strong className="text-gray-700">Problem Details:</strong>
            <p className="text-gray-600 mt-1">{issue.description}</p>
          </div>
        )}
      </div>

      {/* Chat UI */}
      {chat && Array.isArray(chat.messages) ? (
        <div
          className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-700 mb-6 max-w-2xl mx-auto flex flex-col"
          style={{ height: "400px" }}
        >
          <h3 className="text-lg font-bold text-blue-900 mb-2">Chat</h3>
          <div
            className="flex-1 overflow-y-auto mb-2"
            style={{ maxHeight: "300px" }}
          >
            {chat.messages.length === 0 ? (
              <div className="text-gray-400 text-center mt-8">
                No messages yet.
              </div>
            ) : (
              chat.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded ${
                      msg.sender === "user"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.message}
                  </span>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
          <div
            className="flex items-center"
            style={{
              position: "sticky",
              bottom: 0,
              background: "white",
              paddingTop: "8px",
            }}
          >
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2 mr-2"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-orange-700 text-white rounded hover:bg-orange-800 transition"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-center mt-8">Loading chat...</div>
      )}
    </div>
  );
};

export default UserIssueChat;
