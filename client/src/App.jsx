import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import HomeRepairer from "./pages/HomeRepairer"; // <-- Import the repairer home
import VehicleForm from "./pages/VehicleForm";
import DeviceForm from "./pages/DeviceForm";
import AuthForm from "./pages/AuthForm";
import RepairsList from "./components/RepairsList";
import Support from "./components/Support";
import RepairerRepairsList from "./components/RepairerRepairsList";
import SupportRepairer from "./components/SupportRepairer";
import ClaimedIssueRepairer from "./components/ClaimedIssueRepairer";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isRepairer = user.isRepairer;

  return (
    <Routes>
      <Route path="/" element={isRepairer ? <HomeRepairer /> : <Home />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/vehicle-form" element={<VehicleForm />} />
      <Route path="/device-form" element={<DeviceForm />} />
      <Route path="/repairs" element={<RepairsList />} />
      <Route
        path="/support"
        element={isRepairer ? <SupportRepairer /> : <Support />}
      />
      <Route
        path="/repairer/repairs"
        element={
          isRepairer ? <RepairerRepairsList /> : <Navigate to="/" replace />
        }
      />
      <Route path="/repairer/claimed" element=<ClaimedIssueRepairer /> />
    </Routes>
  );
}

export default App;
