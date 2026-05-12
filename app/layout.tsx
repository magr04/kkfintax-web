import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KKFintax — Bc. Kateřina Kerplová | Účetní služby Praha",
  description: "Certifikovaná účetní s více než 8 lety praxe. Vedení účetnictví, daňová evidence, DPH a mzdové účetnictví pro OSVČ i s.r.o. Praha a celá ČR online.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
