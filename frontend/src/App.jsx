import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MandiPrice from "./pages/MandiPrice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" replace />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/MandiPrice" element={<MandiPrice />} />
    </Routes>
  );
}

export default App;
