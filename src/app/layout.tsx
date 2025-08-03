
import { Drawer, List, ListItem, ListItemText, Box, Divider } from '@mui/material'
import Link from 'next/link'
import SorsyLogoImg from './components/desktop/SorsyLogoImg';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import PublicIcon from '@mui/icons-material/Public';
import DescriptionIcon from '@mui/icons-material/Description';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sorsy',
  description: 'Sorsy - Your Project Management Solution'
}
const navItems = [
  { text: 'Dashboard', href: '/', icon: <HomeIcon sx={{ color: '#fff', mr: 2 }} />,  },
  { text: 'Projects', href: '/projects', icon: <DescriptionIcon sx={{ color: '#fff', mr: 2 }} /> },
  { text: 'Factories', href: '/factories', icon: <PublicIcon sx={{ color: '#fff', mr: 2 }} /> },
  { text: 'Reports', href: '/orders', icon: <FolderIcon sx={{ color: '#fff', mr: 2 }} /> },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
      >
    <Box display="flex">
      <Drawer
        color="red"
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            padding: 3,
            backgroundColor: '#CD1C18'
          }
        }}
      >
        <SorsyLogoImg style={{ width: 120, height: 32 }} />
       
        <Divider sx={{ mb: 2 }} />
        <List>
          {navItems.map(({ text, href, icon }) => (
            <Link key={text} href={href} passHref legacyBehavior>
              <ListItem component="a" sx={{ color: '#fff', py: 2 }}>
                {icon}
                <ListItemText 
                  primary={text} 
                  sx={{ 
                    color: '#fff', 
                    fontWeight: 400, 
                    fontSize: '1.15rem', 
                    letterSpacing: 1.5, 
                    textTransform: 'none' 
                  }} 
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>{children}</Box>
    </Box>
          </body>
              </html>

  )
}
