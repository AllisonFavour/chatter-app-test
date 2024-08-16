import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import NavBar from "./(components)/NavBar";
import NavBar2 from "./(components)/NavBar2";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatter App",
  description: "A safe space for book lovers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <div>{session ? <NavBar2 /> : <NavBar />}</div>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { SessionProvider } from "next-auth/react";
// import { getServerSession } from "next-auth";
// import NavBar from "./(components)/NavBar";
// import NavBar2 from "./(components)/NavBar2";
// import { authOptions } from "./api/auth/[...nextauth]/route";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Chatter App",
//   description: "A safe space for book lovers",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const session = await getServerSession(authOptions);

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <SessionProvider session={session}>
//           <div>
//             {session ? <NavBar2 /> : <NavBar />}
//           </div>
//           {children}
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }
