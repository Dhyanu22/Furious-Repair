import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VehicleForm from "./pages/VehicleForm";
import DeviceForm from "./pages/DeviceForm";
import AuthForm from "./pages/AuthForm";
import RepairsList from "./components/RepairsList";
import Support from "./components/Support";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/vehicle-form" element={<VehicleForm />} />
      <Route path="/device-form" element={<DeviceForm />} />
      <Route path="/repairs" element={<RepairsList />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}

export default App;
