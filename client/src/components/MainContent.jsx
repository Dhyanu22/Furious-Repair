import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [select, setSelect] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!select || select === "Select Type") {
      alert("Please select a type.");
      return;
    }

    // Store form data in localStorage for the next page
    const formData = {
      type: select,
      description,
      date,
    };
    localStorage.setItem("formData", JSON.stringify(formData));

    if (select === "Vehicle") {
      navigate("/vehicle-form");
    } else if (select === "Device") {
      navigate("/device-form");
    }
  };

  return (
    <div className="bg-red-800 py-6 px-4 min-h-screen text-center">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-orange-100 drop-shadow-md leading-tight">
        GET YOUR VEHICLE OR <br />
        <span className="text-orange-100">DEVICE FIXED</span>{" "}
        <span className="text-orange-100 font-bold text-xl">AT YOUR</span>
      </h1>

      <div className="mt-2 text-2xl sm:text-4xl md:text-5xl font-extrabold text-orange-100 drop-shadow-lg">
        DOORSTEP
      </div>

      <div className="mt-6 space-y-4 max-w-sm mx-auto">
        <select
          className="w-full p-3 rounded bg-orange-100 text-red-800 font-semibold"
          onChange={(e) => setSelect(e.target.value)}
          value={select}
        >
          <option>Select Type</option>
          <option>Vehicle</option>
          <option>Device</option>
        </select>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded bg-orange-100 text-red-800 font-semibold"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded bg-orange-100 text-red-800 font-semibold"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-red-900 text-white font-bold p-3 rounded hover:bg-red-950 transition"
        >
          Request Repair
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm mx-auto text-left">
        <div
          className="border border-orange-100 p-3 rounded text-white cursor-pointer hover:bg-red-900 transition"
          onClick={() => navigate("/repairs")}
        >
          <div className="font-bold text-orange-100">MY REPAIRS</div>
          <p className="text-sm">View the status of your repair requests</p>
        </div>

        <div
          className="border border-orange-100 p-3 rounded text-white cursor-pointer hover:bg-red-900 transition"
          onClick={() => navigate("/support")}
        >
          <div className="font-bold text-orange-100">SUPPORT</div>
          <p className="text-sm">Contact customer support</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
