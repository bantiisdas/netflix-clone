import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

const BasicMenu = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div className='md:hidden'>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='!capitalize !text-white'
      >
        Browse
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className='menu'
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Link href="/">Home</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href="/tv-shows">TV Shows</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href="/movies">Movies</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href="/new-popular">New & Popular</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href="/mylist">My List</Link></MenuItem>
      </Menu>
    </div>
  )
}

export default BasicMenu