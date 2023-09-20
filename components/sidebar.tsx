"use client";

import { cn } from "@/lib/utils";
import { toolsObjects } from "@/utils/constants";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col bg-blackPrimary-800 space-y-4 p-4 h-full  text-white">
      <div className="px-3 py-2 flex-1 ">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image
              fill
              src={"/logo.png"}
              alt="logo"
              priority
              quality={80}
              sizes="100%"
            />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Localize
          </h1>
        </Link>
        <div className="space-y-1">
          {Object.entries(toolsObjects).map((routeArr) => {
            const route = routeArr[1];
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex w-full p-3 justify-start font-medium cursor-pointer  hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathName === route.href
                    ? "text-white hover:bg-white/10 "
                    : "text-zinc-400"
                )}
              >
                <div className={cn("flex items-center flex-1")}>
                  <route.icon className={cn("h-5 w-5 mr-3  ", route.color)} />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
