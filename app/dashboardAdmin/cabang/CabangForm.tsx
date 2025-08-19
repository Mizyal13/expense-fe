"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cabang } from "@/entities/cabang";

interface Props {
  cabang?: Cabang | null;
  onSave: (c: Cabang) => void | Promise<void>;
  onCancel: () => void;
}

export default function CabangForm({ cabang, onSave, onCancel }: Props) {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");

  useEffect(() => {
    if (cabang) {
      setNama(cabang.nama);
      setAlamat(cabang.alamat);
    }
  }, [cabang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cabang) {
      // Update cabang (id pasti ada)
      onSave({ id: cabang.id, nama, alamat });
    } else {
      // Tambah cabang baru (jangan kirim id)
      onSave({ nama, alamat } as Cabang);
    }
    setNama("");
    setAlamat("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Nama Cabang"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />
      <Input
        placeholder="Alamat Cabang"
        value={alamat}
        onChange={(e) => setAlamat(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <Button type="submit">{cabang ? "Update" : "Tambah"} Cabang</Button>
        {cabang && (
          <Button variant="outline" type="button" onClick={onCancel}>
            Batal
          </Button>
        )}
      </div>
    </form>
  );
}
