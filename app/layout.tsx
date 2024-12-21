import React from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
