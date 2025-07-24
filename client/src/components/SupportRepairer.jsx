import { useNavigate } from "react-router-dom";

const SupportRepairer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="p-6 bg-blue-50">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 transition"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Repairer Support
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Contact Admin
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-20">Phone:</span>
              <span className="text-gray-700">+91 9876543210</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-20">Email:</span>
              <span className="text-gray-700">admin@repairservice.com</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-20">Hours:</span>
              <span className="text-gray-700">Mon-Sat: 9 AM - 8 PM</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Repairer FAQ</h3>
          <div className="space-y-4 text-left">
            <div>
              <h4 className="font-semibold text-blue-700">
                How do I claim a new issue?
              </h4>
              <p className="text-gray-600">
                Go to "My Issues" and click "Claim & Start Working" on any
                available issue.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700">
                How do I contact support for technical help?
              </h4>
              <p className="text-gray-600">
                Use the contact details above or email admin@repairservice.com
                for urgent queries.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700">
                How do I update my expertise or availability?
              </h4>
              <p className="text-gray-600">
                Contact admin to update your profile information.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700">
                How are payments processed?
              </h4>
              <p className="text-gray-600">
                Payments are processed monthly via your registered account
                details.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700">
                What if I can't resolve an issue?
              </h4>
              <p className="text-gray-600">
                Contact support immediately for escalation or reassignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportRepairer;
