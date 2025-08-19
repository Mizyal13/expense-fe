"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Karyawan {
  id?: number;
  nama: string;
  jabatan: string;
  email: string;
  cabangId: number;
}

interface Props {
  karyawan: Karyawan | null;
  onSave: (k: Karyawan) => void;
  onClose: () => void;
}

export default function KaryawanForm({ karyawan, onSave, onClose }: Props) {
  const [form, setForm] = useState<Karyawan>(
    karyawan || { nama: "", jabatan: "", email: "", cabangId: 0 }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-lg font-bold mb-4">
          {karyawan ? "Edit Karyawan" : "Tambah Karyawan"}
        </h2>

        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama"
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          name="jabatan"
          value={form.jabatan}
          onChange={handleChange}
          placeholder="Jabatan"
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          name="cabangId"
          type="number"
          value={form.cabangId}
          onChange={handleChange}
          placeholder="ID Cabang"
          className="w-full p-2 border mb-4 rounded"
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </div>
      </div>
    </div>
  );
}
