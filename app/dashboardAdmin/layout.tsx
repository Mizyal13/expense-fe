"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menus = [
    { name: "Absen Karyawan", path: "/dashboardAdmin/absen" },
    { name: "Harian", path: "/dashboardAdmin/harian" },
    { name: "Bulanan", path: "/dashboardAdmin/bulanan" },
    { name: "Penggajian", path: "/dashboardAdmin/penggajian" },
    { name: "Total & Keuntungan", path: "/dashboardAdmin/total" },
    { name: "Manajemen Cabang", path: "/dashboardAdmin/cabang" },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold mb-4 flex">
            <img className="w-20" src="image2.png" alt="" /> Expense Tracker
          </h1>
          <p className="text-sm -mt-2 mb-3 ">by: Mizyal Jillauzi</p>
        </div>{" "}
        {menus.map((menu) => (
          <Link
            key={menu.path}
            href={menu.path}
            className={`p-2 rounded ${
              pathname === menu.path ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </aside>

      {/* Konten */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
