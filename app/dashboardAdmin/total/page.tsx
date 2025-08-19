"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function TotalPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">
        Laporan Total Keseluruhan
      </h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Total Karyawan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">150</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Rp 12 M</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Total Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Rp 4 M</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Laba Bersih</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">Rp 8 M</p>
          </CardContent>
        </Card>
      </div>

      {/* Grafik */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Grafik Keuangan Tahunan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            📈 Grafik Total Tahunan
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
