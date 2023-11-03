import { UserButton, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import BasicMenu from "./BasicMenu";

const Headers = () => {
  return (
    <header className={`${"bg-[#141414]"}`}>
      <div
        className={`${" sm:flex"} flex items-center space-x-2 md:space-x-10`}
      >
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="image"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink" id="/">
            <Link href="/">Home</Link>
          </li>
          <li className="headerLink" id="/tv-shows">
            <Link href="/tv-shows">TV Shows</Link>
          </li>
          <li className="headerLink" id="/movies">
            <Link href="/movies">Movies</Link>
          </li>
          <li className="headerLink" id="/new-popular">
            <Link href="/new-popular">New & Popular</Link>
          </li>
          <li className="headerLink" id="/mylist">
            <Link href="/mylist">My List</Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        {/* <SearchComponent/> */}

        <p className="hidden lg:inline">Kids</p>
        {/* <BellIcon className={`${showSearchBar && "hidden sm:flex"} h-6 w-6`}/> */}
        {/* <Link
        href="/account"
      > */}
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <Link href="sign-in">
            <img
              src="https://rb.gy/g1pwyx"
              alt=""
              className={`${" sm:flex"} cursor-pointer rounded`}
            />
          </Link>
        </SignedOut>
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Headers;
