import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const apiLimitCount = await getApiLimitCount();
  // const isPro = await checkSubscription();

  return (
    <div className=" h-full relative ">
      <div className=" bg-gray-900 h-full md:flex md:flex-col  hidden md:fixed md:inset-y-0 z-50 md:w-72">
        <Sidebar />
      </div>
      <main className="md:pl-72  ">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
