import { geminiModel } from "../infrastructure/geminiClient";
import { Product } from "../entities/product";

export async function analyzeProducts(products: Product[], query?: string) {
  const productData = products
    .map(
      (p, i) => `
${i + 1}. **${p.name}** 💻  
   - 💰 Harga normal: Rp${p.price.toLocaleString("id-ID")}  
   - 💸 Harga spesial (beli ≥6): Rp${
     p.price_bulk?.toLocaleString("id-ID") || p.price.toLocaleString("id-ID")
   }  
   - 📦 Stok tersedia: ${p.stock} unit  
   - 🏷️ Kategori: ${p.category || "Tanpa kategori"}  
   - 📝 Deskripsi: ${p.description || "-"}  
   - ✨ Tip: Cocok untuk ${p.category?.toLowerCase() || "penggunaan umum"}!
`
    )
    .join("\n");

  const basePrompt = `
Kamu adalah asisten AI profesional, pintar, dan ramah.  
Tugasmu adalah membuat informasi produk **menjadi menarik, mudah dibaca, dan engaging untuk pengguna**.  
Gunakan **markdown**, list bernomor, emoji, dan gaya bahasa ringan yang membuat pengguna tertarik membeli.  
Jangan menambahkan opini yang salah atau informasi yang tidak ada di data.

### 📌 Data Produk
${productData}
`;

  const finalPrompt = query
    ? `${basePrompt}

### ❓ Pertanyaan Pengguna
"${query}"

### 📝 Instruksi
- Jawab hanya berdasarkan data produk di atas.  
- Tampilkan jawaban dengan bahasa yang ramah dan engaging.  
- Sertakan semua detail penting (harga normal, harga bulk, stok, kategori, deskripsi).  
- Gunakan markdown dan emoji untuk mempermudah pembacaan.  
`
    : `${basePrompt}

### 📊 Ringkasan Produk
- Buat ringkasan yang menarik dan mudah dibaca.  
- Sertakan harga normal & harga bulk.  
- Sertakan deskripsi dengan bahasa marketing ringan.  
`;

  const result = await geminiModel.generateContent(finalPrompt);
  return result.response.text();
}
