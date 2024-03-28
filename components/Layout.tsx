import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBarSecondary from "./NavBarSecondary";
import { StateContextProvider } from "@/context/StateContext";
import Cart from "./Cart";
import Overlay from "./ui/Overlay";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  const router = useRouter();

  return (
    <StateContextProvider>
      <Head>
        <title>ToyZZ</title>
        <link rel="icon" href="/assets/hero/gundam-icon.png" />
      </Head>

      {router.pathname === "/" ? (
        <div className="max-w-[1420px] mx-auto">
          <Navbar />
        </div>
      ) : (
        <NavBarSecondary />
      )}

      <Cart />
      <Overlay />
      <Toaster />
      <main className="max-w-[1420px] mx-auto overflow-hidden">{children}</main>
      <Footer />
    </StateContextProvider>
  );
}

export default Layout;
