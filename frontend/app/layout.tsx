import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const googleSansFlex = localFont({
  src: "./fonts/google-sans-flex/GoogleSansFlex-Variable.ttf",
  variable: "--font-google-sans-flex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hack The Path — 20–21 fev 2027 · João Pessoa",
  description:
    "Hackathon universitário do Nordeste. Dois dias construindo com IA ao lado de mentores e empresas. Aceite o desafio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={googleSansFlex.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
