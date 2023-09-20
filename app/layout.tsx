import ProviderToaster from "@/components/providers/tost-provider";
import { cn } from "@/lib/utils";
// import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Localize",
  // description: "",
  icons: {
    icon: "/logo.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full ">
      <body className={cn("h-full", inter)}>
        <ProviderToaster />
        {children}
      </body>
    </html>
  );
}
