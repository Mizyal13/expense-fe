"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CabangTable from "./CabangTable";
import CabangForm from "./CabangForm";
import KaryawanTable from "../karyawan/KaryawanTable";
import KaryawanForm from "../karyawan/KaryawanForm";

interface Cabang {
  id: number;
  nama: string;
  alamat: string;
}

interface Karyawan {
  id: number;
  nama: string;
  jabatan: string;
  cabangId: number;
}

export default function CabangPage() {
  const [cabangs, setCabangs] = useState<Cabang[]>([]);
  const [loadingCabang, setLoadingCabang] = useState(true);
  const [openCabangForm, setOpenCabangForm] = useState(false);
  const [editingCabang, setEditingCabang] = useState<Cabang | null>(null);

  const [karyawans, setKaryawans] = useState<Karyawan[]>([]);
  const [loadingKaryawan, setLoadingKaryawan] = useState(true);
  const [openKaryawanForm, setOpenKaryawanForm] = useState(false);
  const [editingKaryawan, setEditingKaryawan] = useState<Karyawan | null>(null);

  useEffect(() => {
    fetch("/api/cabang")
      .then((res) => res.json())
      .then((data) => setCabangs(data))
      .finally(() => setLoadingCabang(false));

    fetch("/api/karyawan")
      .then((res) => res.json())
      .then((data) => setKaryawans(data))
      .finally(() => setLoadingKaryawan(false));
  }, []);

  const handleSaveCabang = async (cabang: Cabang) => {
    if (cabang.id) {
      await fetch(`/api/cabang/${cabang.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cabang),
      });
    } else {
      await fetch("/api/cabang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cabang),
      });
    }
    location.reload();
  };

  const handleDeleteCabang = async (id: number) => {
    await fetch(`/api/cabang/${id}`, { method: "DELETE" });
    setCabangs(cabangs.filter((c) => c.id !== id));
  };

  const handleSaveKaryawan = async (karyawan: Karyawan) => {
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

  const handleDeleteKaryawan = async (id: number) => {
    await fetch(`/api/karyawan/${id}`, { method: "DELETE" });
    setKaryawans(karyawans.filter((k) => k.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Manajemen Cabang</h1>
          <Button
            onClick={() => {
              setEditingCabang(null);
              setOpenCabangForm(true);
            }}
          >
            Tambah Cabang
          </Button>
        </div>

        {loadingCabang ? (
          <p>Loading...</p>
        ) : (
          <CabangTable
            cabangs={cabangs}
            onEdit={(c) => {
              setEditingCabang(c);
              setOpenCabangForm(true);
            }}
            onDelete={handleDeleteCabang}
          />
        )}

        {openCabangForm && (
          <CabangForm
            cabang={editingCabang}
            onSave={handleSaveCabang}
            onClose={() => setOpenCabangForm(false)}
          />
        )}
      </div>

      {/* === KARYAWAN SECTION === */}
      <div>
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Manajemen Karyawan</h1>
          <Button
            onClick={() => {
              setEditingKaryawan(null);
              setOpenKaryawanForm(true);
            }}
          >
            Tambah Karyawan
          </Button>
        </div>

        {loadingKaryawan ? (
          <p>Loading...</p>
        ) : (
          <KaryawanTable
            karyawans={karyawans}
            cabangs={cabangs} 
            onEdit={(k) => {
              setEditingKaryawan(k);
              setOpenKaryawanForm(true);
            }}
            onDelete={handleDeleteKaryawan}
          />
        )}

        {openKaryawanForm && (
          <KaryawanForm
            karyawan={editingKaryawan}
            cabangs={cabangs}
            onSave={handleSaveKaryawan}
            onClose={() => setOpenKaryawanForm(false)}
          />
        )}
      </div>
    </div>
  );
}
