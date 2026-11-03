import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Shirt,
  Factory,
  Boxes,
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react";

export const menu = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Buyers", path: "/buyers", icon: Users },
  { label: "Orders", path: "/orders", icon: ShoppingBag },
  { label: "Styles", path: "/styles", icon: Shirt },
  { label: "Production", path: "/production", icon: Factory },
  { label: "Inventory", path: "/inventory", icon: Boxes },
  { label: "Accounts", path: "/accounts", icon: Wallet },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];
