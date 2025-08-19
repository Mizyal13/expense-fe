"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cabang } from "@/entities/cabang";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

export default function CabangSelector({ value, onChange }: Props) {
  const [cabangs, setCabangs] = useState<Cabang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCabang = async () => {
      try {
        const res = await fetch("/api/cabang"); // ganti sesuai endpoint
        const data: Cabang[] = await res.json(); // ✅ kasih type di sini
        setCabangs(data);
      } catch (error) {
        console.error("Gagal ambil data cabang:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCabang();
  }, []);

  if (loading) return <p>Loading cabang...</p>;

  return (
    <div className="w-64">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Cabang" />
        </SelectTrigger>
        <SelectContent>
          {cabangs.map((c: Cabang) => (
            <SelectItem key={c.id} value={c.id.toString()}>
              {c.nama}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
