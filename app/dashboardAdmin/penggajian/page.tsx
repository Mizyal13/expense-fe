"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import CabangSelector from "../cabang/CabangSelector";

export default function PenggajianPage() {
  const [selectedCabang, setSelectedCabang] = useState<string>("");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Laporan Penggajian
        </h1>
        <Button className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          Export Excel
        </Button>
      </div>

      {/* Filter Cabang */}
      <CabangSelector value={selectedCabang} onChange={setSelectedCabang} />

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Total Gaji Dibayarkan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Rp 500.000.000</p>
            <p className="text-sm text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Karyawan Digaji</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">120</p>
            <p className="text-sm text-muted-foreground">Semua cabang</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Lembur Dibayarkan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Rp 25.000.000</p>
            <p className="text-sm text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Grafik */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Grafik Penggajian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            📊 Grafik penggajian
            <br />
            <span className="text-xs text-muted-foreground">
              (Data cabang: {selectedCabang || "Semua Cabang"})
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
