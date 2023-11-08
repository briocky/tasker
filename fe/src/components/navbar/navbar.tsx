'use client';
import * as React from 'react';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/global-store';
import Link from 'next/link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InvitationDialog from '@/components/notification-dialog/invitationDialog';
import { useEffect } from 'react';
import { Invitation, InvitationStatus } from '@/types/invitation/invitation-types';
import { getInvitations, respondToInvitation } from '@/services/invitation-service';

const pages = [
  {
    name: 'My Categories',
    url: '/categories/my-categories',
  },
  {
    name: 'Favourite',
    url: '/tasks/favourite',
  },
  {
    name: 'Contact',
    url: '/contact',
  },
];
const settings = [
  {
    name: 'Profile',
    url: '/profile',
  },
  {
    name: 'Account',
    url: '/account',
  },
  {
    name: 'Dashboard',
    url: 'dashboard',
  },
  {
    name: 'Logout',
    url: '/logout',
  },
];

function Navbar() {
  const [invitations, setInvitations] = React.useState<Invitation[] | null>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openNotifications, setOpenNotifications] = React.useState(false);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleInvitationResponse = (id: number, status: InvitationStatus) => {
    respondToInvitation(id, status);
  };

  const handleOpenNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenNotifications(true);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setOpenNotifications(false);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getInvitations().then((invitations) => {
        console.log(invitations);
        setInvitations(invitations);
      });
    }
  }, [isAuthenticated]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={'/'} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box component={'div'} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <Image src="/logo.svg" alt="me" width="64" height="64" />
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Tasker
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link style={{ textDecoration: 'none' }} href={page.url}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>

            <Link
              href={'/'}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Box component={'div'} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                <Image src="/logo.svg" alt="me" width="64" height="64" />
              </Box>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Tasker
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link style={{ textDecoration: 'none' }} key={page.name} href={page.url}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} display={isAuthenticated ? 'flex' : 'none'}>
            <Tooltip title="Notifications">
              <IconButton onClick={handleOpenNotificationMenu} size={'medium'} sx={{ mr: 2, p: 0, color: 'white' }}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            {invitations && (
              <InvitationDialog
                invitations={invitations}
                handleClose={handleCloseNotificationMenu}
                open={openNotifications}
                handleInvitationResponse={handleInvitationResponse}
              />
            )}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Link href={setting.url}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box display={isAuthenticated ? 'none' : 'flex'} gap={1}>
            <Link href={'/auth/login'}>
              <Button variant="contained" sx={{ my: 2 }} color={'secondary'}>
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
