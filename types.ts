export type Level = "PAUD / TK" | "SD / MI" | "SMP / MTS" | "SMA / SMK";
export type FileType = "Modul Ajar / RPP" | "Lembar Kerja (LKPD)" | "Asesmen (Excel)" | "Slide Presentasi";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  level: Level;
  fileType: FileType;
  image: string;
  isPromo?: boolean;
  isBestSeller?: boolean;
  fileFormat: "XLS" | "PDF" | "PPT" | "DOC";
  tags: string[];
}

export interface FilterState {
  levels: Level[];
  fileTypes: FileType[];
  priceRange: { min: number; max: number };
}
