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
  { text: 'Dashboard', href: '/', icon: <HomeOutlinedIcon sx={{ color: '#222', mr: 1, fontSize: 22 }} /> },
];

const discoverItems = [
  { text: 'Projects', href: '/projects', icon: <FolderOutlinedIcon sx={{ color: '#222', mr: 1, fontSize: 22 }} /> },
  { text: 'Orders', href: '/orders', icon: <NotificationsNoneOutlinedIcon sx={{ color: '#222', mr: 1, fontSize: 22 }} /> },
  { text: 'Factories', href: '/factories', icon: <InsertChartOutlinedIcon  sx={{ color: '#222', mr: 1, fontSize: 22 }} /> },
];

const bottomItems = [
  { text: 'Settings', href: '/settings', icon: <SettingsIcon sx={{ color: '#888', mr: 1, fontSize: 20 }} /> },
  { text: 'Logout', href: '/logout', icon: <LogoutIcon sx={{ color: '#888', mr: 1, fontSize: 20 }} /> },
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
            height: 56,
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fff',
            zIndex: 1301,
            position: 'fixed',
            top: 0,
            left: 0,
            px: 2,
            boxSizing: 'border-box'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <SorsyLogoImg style={{ width: 120, height: 32 }} />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, px: 1.5, py: 0.25, display: 'flex', alignItems: 'center', width: 240 }}>
              <SearchIcon sx={{ color: '#888', mr: 1, fontSize: 20 }} />
              <InputBase placeholder="Type to search" sx={{ width: '100%', fontSize: 14 }} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Badge badgeContent={2} color="error" sx={{ mr: 0.5 }}>
              <MailOutlineOutlinedIcon sx={{ color: '#8B2323', fontSize: 22 }} />
            </Badge>
            <IconButton>
              <NotificationsNoneOutlinedIcon sx={{ color: '#222', fontSize: 22 }} />
            </IconButton>
            <Avatar
              sx={{ width: 30, height: 30 }}
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
              width: 250,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 250,
                boxSizing: 'border-box',
                pt: 1.5,
                pb: 1.5,
                px: 3, // increased from 1 to add more padding on either side
                bgcolor: '#fff',
                borderRight: '1px solid #eee',
                top: 56,
                height: 'calc(100vh - 56px)',
              }
            }}
            PaperProps={{ elevation: 0 }}
          >
            <Box sx={{ height: 16 }} />
            <Button
              variant="contained"
              color="error"
              sx={{
                width: '100%',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                mb: 2,
                py: 0.7,
                fontSize: 13,
              }}
            >
              + Connect New Brand
            </Button>
            {/* Main Nav */}
            <List sx={{ mb: 1 }}>
              {navItems.map(({ text, href, icon }) => (
                <Link key={text} href={href} passHref legacyBehavior>
                  <ListItem component="a" sx={{ color: '#222', py: 0.7, borderRadius: 2 }}>
                    {icon}
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: 14, 
                        color: '#222',
                      }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
            {/* Discover Section */}
            <Typography variant="caption" sx={{ color: '#888', pl: 1, mb: 0.5, letterSpacing: 1, fontSize: 12 }}>
              DISCOVER
            </Typography>
            <List sx={{ mb: 1 }}>
              {discoverItems.map(({ text, href, icon }) => (
                <Link key={text} href={href} passHref legacyBehavior>
                  <ListItem component="a" sx={{ color: '#222', py: 0.7, borderRadius: 2 }}>
                    {icon}
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: 14,
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
                  <ListItem component="a" sx={{ color: '#888', py: 0.7, borderRadius: 2 }}>
                    {icon}
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: 13,
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
              pt: '56px', 
              width: '100%',
              boxSizing: 'border-box',
              overflowX: 'auto',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 700,
                px: { xs: 1, sm: 2, md: 2 },
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
