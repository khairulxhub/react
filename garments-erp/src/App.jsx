import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Buyers from "./pages/Buyers";
import Orders from "./pages/Orders";
import Styles from "./pages/Styles";
import Production from "./pages/Production";
import Inventory from "./pages/Inventory";
import Accounts from "./pages/Accounts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/styles" element={<Styles />} />
          <Route path="/production" element={<Production />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
