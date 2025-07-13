import { useNavigate } from "react-router-dom";

const MainContentRepairer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-red-800 py-6 px-4 min-h-screen text-center">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-orange-100 drop-shadow-md leading-tight">
        REPAIRER DASHBOARD <br />
        <span className="text-orange-100">MANAGE YOUR</span>{" "}
        <span className="text-orange-100 font-bold text-xl">
          ASSIGNED ISSUES
        </span>
      </h1>

      <div className="mt-2 text-2xl sm:text-4xl md:text-5xl font-extrabold text-orange-100 drop-shadow-lg">
        AT YOUR DOORSTEP
      </div>

      <div className="grid grid-cols-1 gap-4 mt-10 max-w-sm mx-auto text-left">
        {/* Claimed Issues box takes full width */}
        <div
          className="border border-orange-100 p-4 rounded text-white cursor-pointer hover:bg-red-900 transition text-center"
          onClick={() => navigate("/repairer/claimed")}
        >
          <div className="font-bold text-orange-100 text-lg">
            CLAIMED ISSUES
          </div>
          <p className="text-sm">See issues you have claimed</p>
        </div>
        {/* MY ISSUES and SUPPORT take half width each */}
        <div className="grid grid-cols-2 gap-4  text-center">
          <div
            className="border border-orange-100 p-3 rounded text-white cursor-pointer hover:bg-red-900 transition"
            onClick={() => navigate("/repairer/repairs")}
          >
            <div className="font-bold text-orange-100">MY ISSUES</div>
            <p className="text-sm">View and select issues to work on</p>
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
    </div>
  );
};

export default MainContentRepairer;
