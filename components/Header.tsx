"use client";

import useAuth from "@/hooks/useAuth";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect } from 'react';
import BasicMenu from "./BasicMenu";

const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const { logOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 0){
        setIsScrolled(true);
      }
      else{
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])
  

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
        <div className="flex items-center space-x-2 md:space-x-10">
          <Link href="/">
            <img
              src="https://rb.gy/ulxxee"
              alt="image"
              width={100}
              height={100}
              className="cursor-pointer object-contain"
            />
          </Link>

          <BasicMenu/>

          <ul className='hidden space-x-4 md:flex'>
              <li className='headerLink'><Link href="/">Home</Link></li>
              <li className='headerLink'><Link href="/tv-shows">TV Shows</Link></li>
              <li className='headerLink'><Link href="/movies">Movies</Link></li>
              <li className='headerLink'><Link href="/new-popular">New & Popular</Link></li>
              <li className='headerLink'><Link href="/mylist">My List</Link></li>
          </ul>
        </div>
        
        <div className="flex items-center space-x-4 text-sm font-light">
          <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline"/>
          <p className="hidden lg:inline">Kids</p>
          <BellIcon className="h-6 w-6"/>
          {/* <Link
            href="/account"
          > */}
            <img
            onClick={logOut}
              src="https://rb.gy/g1pwyx" 
              alt=""
              className="cursor-pointer rounded"
            />
          {/* </Link> */}
        </div>
    </header>
  )
}

export default Header
