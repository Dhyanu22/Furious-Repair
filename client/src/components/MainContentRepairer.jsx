import { useNavigate } from "react-router-dom";
import boxBg from "../assets/box-bg.jpg";

const MainContentRepairer = () => {
  const navigate = useNavigate();

  return (
    <div className="relative custom-boxing heading m-1 py-6 px-4 min-h-screen text-center z-10">
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

      <div className="grid grid-cols-1 gap-6 mt-10 max-w-sm mx-auto text-left">
        {/* Claimed Issues box */}
        <div
          className="relative flex flex-col items-center justify-center text-orange-100 cursor-pointer hover:bg-red-900 transition rounded overflow-hidden mx-auto"
          onClick={() => navigate("/repairer/claimed")}
        >
          <img
            className="box-bg absolute w-full h-full"
            src={boxBg}
            alt="box"
          />
          <div className="relative flex flex-col items-center justify-center gap-2 z-10 h-full w-full py-2">
            <div className="flex items-center justify-center gap-2 mt-3 px-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 48 48"
                width={32}
                height={32}
              >
                <path
                  d="M24 4a20 20 0 1 0 20 20A20.023 20.023 0 0 0 24 4Zm0 36a16 16 0 1 1 16-16 16.019 16.019 0 0 1-16 16Zm-2-26h4v12h-4Zm0 14h4v4h-4Z"
                  fill="#912f16"
                />
              </svg>
              <div className="font-bold text-l secondary-text text-center">
                CLAIMED ISSUES
              </div>
            </div>
            <p className="text-sm text-center pb-4">
              See issues you have claimed
            </p>
          </div>
        </div>

        {/* MY ISSUES and SUPPORT side by side */}
        <div className="grid grid-cols-2 gap-2 mx-auto">
          <div
            className="relative flex flex-col items-center justify-center text-orange-100 cursor-pointer hover:bg-red-900 transition rounded overflow-hidden"
            onClick={() => navigate("/repairer/repairs")}
          >
            <img
              className="box-bg absolute w-full h-full"
              src={boxBg}
              alt="box"
            />
            <div className="relative flex flex-col items-center justify-center gap-2 z-10 h-full w-full p-3">
              <div className="flex items-center justify-center gap-2 mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  viewBox="0 0 48 48"
                  width={32}
                  height={32}
                >
                  <path
                    d="M9 21h30v3H9zm0-6h30v3H9zM39 0H9a9 9 0 0 0-9 9v30a9 9 0 0 0 9 9h30a9 9 0 0 0 9-9V9a9 9 0 0 0-9-9zm3 39c0 1.659-1.341 3-3 3H9a3 3 0 0 1-3-3V9c0-1.656 1.344-3 3-3h30a3 3 0 0 1 3 3v30zM9 9h30v3H9zm21 18a2.997 2.997 0 0 1 2.121 5.118l-6 6a2.995 2.995 0 0 1-4.242 0l-6-5.997a3.005 3.005 0 0 1-.651-3.27A2.997 2.997 0 0 1 18 27h12z"
                    fill="#912f16"
                  ></path>
                </svg>
                <div className="font-bold text-l secondary-text">MY ISSUES</div>
              </div>
              <p className="text-sm text-center pb-4">
                View and select issues to work on
              </p>
            </div>
          </div>
          <div
            className="relative flex flex-col items-center justify-center text-orange-100 cursor-pointer hover:bg-red-900 transition rounded overflow-hidden"
            onClick={() => navigate("/support")}
          >
            <img
              className="box-bg absolute w-full h-full"
              src={boxBg}
              alt="box"
            />
            <div className="relative flex flex-col items-center justify-center gap-2 z-10 h-full w-full py-2">
              <div className="flex items-center justify-center gap-2 mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  id="callcenter"
                  width={32}
                  height={32}
                >
                  <path
                    fill="#8d270d"
                    d="M10 34h-3c-2.209 0-4-1.791-4-4v-2c0-2.209 1.791-4 4-4h3s0 10 0 10zM38 34h3c2.209 0 4-1.791 4-4v-2c0-2.209-1.791-4-4-4h-3v10z"
                  ></path>
                  <path
                    fill="#6f1700"
                    d="M41 31h-3v3h3c2.209 0 4-1.791 4-4v-2c0-.171-.03-.334-.05-.5-.249 1.97-1.912 3.5-3.95 3.5zM7 31h3s0 3 0 3h-3c-2.209 0-4-1.791-4-4v-2c0-.171.03-.334.05-.5.249 1.97 1.912 3.5 3.95 3.5z"
                  ></path>
                  <rect
                    width="6"
                    height="14"
                    x="8"
                    y="22"
                    fill="#f23b0c"
                    rx="2"
                    ry="2"
                  ></rect>
                  <rect
                    width="6"
                    height="14"
                    x="34"
                    y="22"
                    fill="#f23b0c"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path
                    fill="#e23205"
                    d="M12 32h-2c-1.105 0-2-.895-2-2v4c0 1.105.895 2 2 2h2c1.105 0 2-.895 2-2v-4c0 1.105-.895 2-2 2zM38 32h-2c-1.105 0-2-.895-2-2v4c0 1.105.895 2 2 2h2c1.105 0 2-.895 2-2v-4c0 1.105-.895 2-2 2z"
                  ></path>
                  <rect
                    width="8"
                    height="4"
                    x="20"
                    y="39"
                    fill="#8d270d"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path
                    fill="#912f16"
                    d="m41,23v-1c0-9.374-7.626-17-17-17S7,12.626,7,22v1c-2.757,0-5,2.243-5,5v2c0,2.757,2.243,5,5,5h.184c.414,1.161,1.514,2 2.816,2h2c1.654,0,3-1.346,3-3v-10c0-1.654-1.346-3-3-3h-2c-.337,0-.655.068-.958.171.434-7.885,6.967-14.171,14.958-14.171s14.524,6.286,14.958,14.171c-.303-.103-.621-.171-.958-.171h-2c-1.654,0-3,1.346-3,3v10c0,1.654,1.346,3,3,3,0,1.654-1.346,3-3,3h-4.184c-.414-1.161-1.514-2-2.816-2h-4c-1.654,0-3,1.346-3,3s1.346,3,3,3h4c1.302,0,2.402-.839,2.816-2h4.184c2.757,0,5-2.243,5-5,1.302,0,2.402-.839,2.816-2h.184c2.757,0,5-2.243,5-5v-2c0-2.757-2.243-5-5-5ZM4,30v-2c0-1.654,1.346-3,3-3v8c-1.654,0-3-1.346-3-3Zm6-7h2c.551,0,1,.449,1,1v10c0,.551-.449,1-1,1h-2c-.551,0-1-.449-1-1v-10c0-.551.449-1,1-1Zm16,19h-4c-.551,0-1-.449-1-1s.449-1,1-1h4c.551,0,1,.449,1,1s-.449,1-1,1Zm12-7h-2c-.551,0-1-.449-1-1v-10c0-.551.449-1,1-1h2c.551,0,1,.449,1,1v10c0,.551-.449,1-1,1Zm6-5c0,1.654-1.346,3-3,3v-8c1.654,0,3,1.346,3,3v2Z"
                  ></path>
                </svg>
                <div className="font-bold text-l secondary-text text-center">
                  SUPPORT
                </div>
              </div>
              <p className="text-sm mt-0 text-center">
                Contact customer support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentRepairer;
