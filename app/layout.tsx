import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "SASTEK - منصة الأعمال الذكية",
  description: "منصة متكاملة تجمع أدوات الذكاء الاصطناعي لتطوير وأتمتة أعمالك",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ar">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </head>
        <body style={{ margin: 0, padding: 0, fontFamily: "'Cairo', sans-serif" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}