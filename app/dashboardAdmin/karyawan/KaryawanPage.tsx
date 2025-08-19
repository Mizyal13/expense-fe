"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import KaryawanTable from "./KaryawanTable";
import KaryawanForm from "./KaryawanForm";

interface Karyawan {
  id: number;
  nama: string;
  jabatan: string;
  email: string;
  cabangId: number; // relasi ke cabang
}

export default function KaryawanPage() {
  const [karyawans, setKaryawans] = useState<Karyawan[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingKaryawan, setEditingKaryawan] = useState<Karyawan | null>(null);

  useEffect(() => {
    fetch("/api/karyawan") // 🚀 sesuaikan dengan backend kamu
      .then((res) => res.json())
      .then((data) => setKaryawans(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (karyawan: Karyawan) => {
    if (karyawan.id) {
      await fetch(`/api/karyawan/${karyawan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(karyawan),
      });
    } else {
      await fetch("/api/karyawan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(karyawan),
      });
    }
    location.reload();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/karyawan/${id}`, { method: "DELETE" });
    setKaryawans(karyawans.filter((k) => k.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Manajemen Karyawan</h1>
        <Button
          onClick={() => {
            setEditingKaryawan(null);
            setOpenForm(true);
          }}
        >
          Tambah Karyawan
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <KaryawanTable
          karyawans={karyawans}
          onEdit={(k) => {
            setEditingKaryawan(k);
            setOpenForm(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {openForm && (
        <KaryawanForm
          karyawan={editingKaryawan}
          onSave={handleSave}
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
}
