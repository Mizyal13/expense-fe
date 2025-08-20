"use client";

// /app/dashboardAdmin/page.tsx
export default function DashboardAdminPage() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-4">📊 Expense Tracker</h2>
        <p>by: Mizyal Jillauzi</p>
      </div>
      <p>Selamat datang di dashboard admin. Silakan pilih menu di sidebar.</p>

      {/* Ringkasan dummy */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">👥 Total Karyawan</h3>
          <p className="text-2xl font-bold">25</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">💵 Pendapatan Hari Ini</h3>
          <p className="text-2xl font-bold">Rp 3.200.000</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">📅 Bulan Ini</h3>
          <p className="text-2xl font-bold">Rp 120.000.000</p>
        </div>
      </div>
    </div>
  );
}
