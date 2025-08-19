"use client";

import { Button } from "@/components/ui/button";

interface Karyawan {
  id: number;
  nama: string;
  jabatan: string;
  email: string;
  cabangId: number;
}

interface Props {
  karyawans: Karyawan[];
  onEdit: (k: Karyawan) => void;
  onDelete: (id: number) => void;
}

export default function KaryawanTable({ karyawans, onEdit, onDelete }: Props) {
  return (
    <table className="w-full bg-white shadow rounded overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Nama</th>
          <th className="p-3">Jabatan</th>
          <th className="p-3">Email</th>
          <th className="p-3">Cabang</th>
          <th className="p-3">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {karyawans.map((k) => (
          <tr key={k.id} className="border-t">
            <td className="p-3">{k.nama}</td>
            <td className="p-3">{k.jabatan}</td>
            <td className="p-3">{k.email}</td>
            <td className="p-3">{k.cabangId}</td>
            <td className="p-3 space-x-2">
              <Button variant="outline" onClick={() => onEdit(k)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => onDelete(k.id)}>
                Hapus
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
