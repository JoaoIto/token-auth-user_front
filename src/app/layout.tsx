"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PrivateRoute from "@/app/routes";
import {checkPublicRoute} from "@/app/functions/checkPublicRoute/checkPublicRoute";
import {usePathname} from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const isPublicPage = checkPublicRoute(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
      {!isPublicPage && (
          <PrivateRoute>
            {children}
          </PrivateRoute>
      )}</body>
    </html>
  );
}
