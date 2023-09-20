import {
  CloudSun,
  LayoutDashboard,
  MapPin,
  SearchCode,
  Settings,
} from "lucide-react";
export const MAX_FREE_COUNTS = 5;
export const toolsObjects = {
  wealth: {
    icon: CloudSun,
    href: "/",
    label: "Clima",
    color: " text-orange-700",
    colorDark: " text-orange-700",
    bgColor: "bg-orange-500/10",
  },
  location: {
    icon: MapPin,
    href: "/cep",
    label: "Cep",
    color: " text-sky-700",
    colorDark: " text-sky-700",
    bgColor: "bg-sky-500/10",
  },
  contact: {
    icon: SearchCode,
    href: "/contact",
    label: "Contato",
    color: " text-rose-600",
    colorDark: " text-rose-900",
    bgColor: "bg-rose-500/10",
  },
};

export const routesObjects = {
  dashboard: {
    icon: LayoutDashboard,
    href: "/dashboard",
    label: "Dashboard",
    color: " text-sky-500",
  },
  ...toolsObjects,

  settings: {
    icon: Settings,
    href: "/settings",
    label: "settings",
    color: " text-white-500",
    bgColor: "bg-gray-700/10",
  },
};
