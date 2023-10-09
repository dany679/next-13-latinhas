import { Indent, Store } from "lucide-react";
export const BASE_HTTP = "http://localhost:8080";
export const toolsObjects = {
  demands: {
    icon: Indent,

    href: "/",
    label: "Demandas",
    color: " text-orange-700",
    colorDark: " text-orange-700",
    bgColor: "bg-orange-500/10",
  },
  products: {
    icon: Store,

    href: "/produtos",
    label: "Produtos",
    color: " text-sky-700",
    colorDark: " text-sky-700",
    bgColor: "bg-sky-500/10",
  },
};
