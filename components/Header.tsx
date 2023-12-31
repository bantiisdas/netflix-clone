"use client";

import {
  BellIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect } from "react";
import BasicMenu from "./BasicMenu";
import { Box, LinearProgress } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchComponent from "./SearchComponent";
import { SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const selectedPage = document.getElementById(pathname);
  if (selectedPage) selectedPage.classList.add("selectedHeaderLink");
  // console.log(searchParams);

  const handleClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div
        className={`${
          showSearchBar && "hidden sm:flex"
        } flex items-center space-x-2 md:space-x-10`}
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
        <div
          className={`flex ${
            showSearchBar && "w-[90vw] sm:w-auto"
          } space-x-2 items-center justify-center`}
        >
          {showSearchBar && (
            <SearchComponent handleClickFunction={handleClick} />
          )}
          {!showSearchBar ? (
            <MagnifyingGlassIcon
              className="h-6 w-6 sm:inline cursor-pointer"
              onClick={handleClick}
            />
          ) : (
            <XMarkIcon
              className="h-6 w-6 sm:inline cursor-pointer"
              onClick={handleClick}
            />
          )}
        </div>

        {/* <SearchComponent/> */}

        {/* <p className="hidden lg:inline">Kids</p> */}
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
              className={`${
                showSearchBar && "hidden sm:flex"
              } cursor-pointer rounded`}
            />
          </Link>
        </SignedOut>
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;
