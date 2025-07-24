import { useNavigate } from "react-router-dom";

const Support = () => {
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
        ← Back to Main
      </button>

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Customer Support
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-20">Phone:</span>
              <span className="text-gray-700">+91 9876543210</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-20">Email:</span>
              <span className="text-gray-700">support@repairservice.com</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-20">Hours:</span>
              <span className="text-gray-700">Mon-Sat: 9 AM - 8 PM</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">FAQ</h3>
          <div className="space-y-4 text-left">
            <div>
              <h4 className="font-semibold text-blue-700">
                How long does a repair take?
              </h4>
              <p className="text-gray-600">
                Most repairs are completed within 24-48 hours.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700">
                Do you provide warranty?
              </h4>
              <p className="text-gray-600">
                Yes, we provide 30-day warranty on all repairs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700">
                What areas do you cover?
              </h4>
              <p className="text-gray-600">
                We provide services across Delhi NCR, including Delhi, Gurgaon,
                Noida, and Faridabad.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept cash, UPI, credit/debit cards, and online payments.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700">
                Do you offer emergency services?
              </h4>
              <p className="text-gray-600">
                Yes, we provide 24/7 emergency repair services with additional
                charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
