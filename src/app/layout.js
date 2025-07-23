import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prime",
  description: "spark new ideas on prime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="container">
          <AuthProvider>
             {children}
          </AuthProvider>
       
        </div>
      </body>
    </html>
  );
}
