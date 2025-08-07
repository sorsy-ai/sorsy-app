import { Drawer, List, ListItem, ListItemText, Box, Typography, Button, IconButton, InputBase, Avatar, Badge } from '@mui/material';
import Link from 'next/link';
import SorsyLogoImg from './components/desktop/SorsyLogoImg';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sorsy',
  description: 'Sorsy - Your Project Management Solution'
}

const navItems = [
  { text: 'Dashboard', href: '/', icon: <HomeOutlinedIcon sx={{ color: '#222', mr: 2 }} /> },
];

const discoverItems = [
  { text: 'Projects', href: '/projects', icon: <FolderOutlinedIcon sx={{ color: '#222', mr: 2 }} /> },
  { text: 'Orders', href: '/orders', icon: <NotificationsNoneOutlinedIcon sx={{ color: '#222', mr: 2 }} /> },
  { text: 'Factories', href: '/factories', icon: <InsertChartOutlinedIcon  sx={{ color: '#222', mr: 2 }} /> },
];

const bottomItems = [
  { text: 'Settings', href: '/settings', icon: <SettingsIcon sx={{ color: '#888', mr: 2 }} /> },
  { text: 'Logout', href: '/logout', icon: <LogoutIcon sx={{ color: '#888', mr: 2 }} /> },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Top Navbar */}
        <Box
          sx={{
            width: '100%',
            height: 64,
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fff',
            zIndex: 1301,
            position: 'fixed',
            top: 0,
            left: 0,
            px: 3, 
            boxSizing: 'border-box'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <SorsyLogoImg style={{ width: 140, height: 40 }} />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, px: 2, py: 0.5, display: 'flex', alignItems: 'center', width: 350 }}>
              <SearchIcon sx={{ color: '#888', mr: 1 }} />
              <InputBase placeholder="Type to search" sx={{ width: '100%' }} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Badge badgeContent={2} color="error" sx={{ mr: 1 }}>
              <MailOutlineOutlinedIcon sx={{ color: '#8B2323', fontSize: 28 }} />
            </Badge>
            <IconButton>
              <NotificationsNoneOutlinedIcon sx={{ color: '#222', fontSize: 28 }} />
            </IconButton>
            <Avatar
              sx={{ width: 36, height: 36 }}
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
            />
          </Box>
        </Box>
        {/* Sidebar */}
        <Box display="flex">
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              width: 260,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 260,
                boxSizing: 'border-box',
                pt: 2,
                pb: 2,
                px: 2,
                bgcolor: '#fff',
                borderRight: '1px solid #eee',
                top: 64, 
                height: 'calc(100vh - 64px)',
              }
            }}
            PaperProps={{ elevation: 0 }}
          >
            <Box sx={{ height: 24 }} />
            <Button
              variant="contained"
              color="error"
              sx={{
                width: '100%',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                mb: 3,
                py: 1.2,
                fontSize: 16,
              }}
            >
              + Connect New Brand
            </Button>
            {/* Main Nav */}
            <List sx={{ mb: 2 }}>
              {navItems.map(({ text, href, icon }) => (
                <Link key={text} href={href} passHref legacyBehavior>
                  <ListItem component="a" sx={{ color: '#222', py: 1.2, borderRadius: 2 }}>
                    {icon}
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: 16,
                        color: '#222',
                      }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
            {/* Discover Section */}
            <Typography variant="caption" sx={{ color: '#888', pl: 2, mb: 1, letterSpacing: 1 }}>
              DISCOVER
            </Typography>
            <List sx={{ mb: 2 }}>
              {discoverItems.map(({ text, href, icon }) => (
                <Link key={text} href={href} passHref legacyBehavior>
                  <ListItem component="a" sx={{ color: '#222', py: 1.2, borderRadius: 2 }}>
                    {icon}
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: 16,
                        color: '#222',
                      }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            {/* Bottom Section */}
            <List>
              {bottomItems.map(({ text, href, icon }) => (
                <Link key={text} href={href} passHref legacyBehavior>
                  <ListItem component="a" sx={{ color: '#888', py: 1.2, borderRadius: 2 }}>
                    {icon}
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: 16,
                        color: '#888',
                      }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: '#fafbfc',
              minHeight: '100vh',
              pt: '64px',
              width: '100%',
              boxSizing: 'border-box',
              overflowX: 'auto',
            }}
          >
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
