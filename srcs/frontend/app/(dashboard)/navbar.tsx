"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import icon1 from "@/public/icon1.svg";

const NavTop = () => {
  return (
    <Link className="hidden font-mono text-4xl sm:block" href="/test">
      <span className="hidden lg:block">ft_transcendence</span>
      <span className="block lg:hidden">trascen</span>
    </Link>
  );
};

const NavSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            />
          ) : (
            <path
              fill="currentColor"
              d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
            />
          )}
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-20 w-full bg-neutral-800 p-4">
          <div className="flex flex-col gap-2 text-xl">
            <Link className="hover:opacity-75" href="/friends">
              Friends
            </Link>
            <Link className="hover:opacity-75" href="/dm">
              DM
            </Link>
            <Link className="hover:opacity-75" href="/game">
              Game
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

const NavItems = () => {
  return (
    <>
      <div className="hidden grow place-items-end justify-end gap-x-6 text-3xl sm:flex">
        <Link href="/friends">
          <p>Friends</p>
        </Link>
        <Link href="/dm">
          <p>DM</p>
        </Link>
        <Link href="/game">
          <p>Game</p>
        </Link>
      </div>
      <div className="w-4 sm:hidden">
        <NavSidebar />
      </div>
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 h-20 w-full bg-neutral-800">
        <div className="container mx-auto h-full px-8 py-4">
          <div className="flex h-full items-center justify-between gap-x-8">
            <NavTop />
            <NavItems />
            <Image src={icon1} alt="profile icon" width={45} height={45} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
