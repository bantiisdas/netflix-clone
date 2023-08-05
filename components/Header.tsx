"use client";

import useAuth from "@/hooks/useAuth";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect } from 'react';
import BasicMenu from "./BasicMenu";
import { Box, LinearProgress } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';
import { usePathname } from "next/navigation";
// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';


// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

const Header = () => {

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { logOut } = useAuth();

  const selectedPage = document.getElementById(pathname);
  if(selectedPage)
  selectedPage.classList.add("selectedHeaderLink")

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
              <li className='headerLink' id="/"><Link href="/">Home</Link></li>
              <li className='headerLink' id="/tv-shows"><Link href="/tv-shows">TV Shows</Link></li>
              <li className='headerLink' id="/movies"><Link href="/movies">Movies</Link></li>
              <li className='headerLink' id="/new-popular"><Link href="/new-popular">New & Popular</Link></li>
              <li className='headerLink' id="/mylist"><Link href="/mylist">My List</Link></li>
          </ul>
        </div>
        
        <div className="flex items-center space-x-4 text-sm font-light">
          <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline"/>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              
            />
          </Search> */}
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
