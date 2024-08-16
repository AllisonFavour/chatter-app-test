"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import openMenu from "../../public/assets/openMenu1.png";
import closeMenu from "../../public/assets/close_menu.png";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <nav className="bg-white shadow-[-1px_-10px_20px_#7c3aed] fixed w-full z-10 top-0">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="font-bold text-violet-600 text-2xl">
            <Link href="/">Chatter📚</Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 focus:outline-none"
            >
              {!isOpen ? (
                <Image src={openMenu} alt="open menu" width={20} />
              ) : (
                <Image src={closeMenu} alt="open menu" width={20} />
              )}
            </button>
          </div>

          <div
            className={`md:flex items-center ${
              isOpen ? "block" : "hidden"
            } md:block`}
          >
            <Link
              href="/login"
              className="block mt-2 md:mt-0 md:ml-4 text-violet-600 hover:text-gray-700"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="block mt-2 md:mt-0 md:ml-4 text-violet-600 hover:text-gray-700"
            >
              Register
            </Link>
            <Link
              href="/posts"
              className="block mt-2 md:mt-0 md:ml-4 text-violet-600 hover:text-gray-700"
            >
              Blog Posts
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
