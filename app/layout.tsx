import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import NavBar from "./(components)/NavBar";
import NavBar2 from "./(components)/NavBar2";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          {!!session && <NavBar2 />}

          {!session && <NavBar />}
        </nav>

        {children}
      </body>
    </html>
  );
}
