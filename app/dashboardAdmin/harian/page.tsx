"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import CabangSelector from "../cabang/CabangSelector";

export default function HarianPage() {
  const [selectedCabang, setSelectedCabang] = useState<string>("");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Laporan Harian</h1>
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
            <CardTitle>Total Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,250</p>
            <p className="text-sm text-muted-foreground">Hari ini</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Rp 45.000.000</p>
            <p className="text-sm text-muted-foreground">+2% dari kemarin</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Total Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Rp 20.000.000</p>
            <p className="text-sm text-muted-foreground">Stabil</p>
          </CardContent>
        </Card>
      </div>

      {/* Grafik */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Grafik Transaksi Harian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            📊 Grafik harian
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
