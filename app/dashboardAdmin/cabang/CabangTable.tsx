"use client";

import { Button } from "@/components/ui/button";

interface Cabang {
  id: number;
  nama: string;
  alamat: string;
}

interface Props {
  cabangs: Cabang[];
  onEdit: (cabang: Cabang) => void;
  onDelete: (id: number) => void;
}

export default function CabangTable({ cabangs, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Nama Cabang</th>
            <th className="px-4 py-2">Alamat</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {cabangs.map((cabang) => (
            <tr key={cabang.id} className="border-t">
              <td className="px-4 py-2">{cabang.nama}</td>
              <td className="px-4 py-2">{cabang.alamat}</td>
              <td className="px-4 py-2 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(cabang)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(cabang.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}

          {cabangs.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                Belum ada data cabang
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
