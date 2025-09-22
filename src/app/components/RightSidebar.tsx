import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';

const notifications = [
  {
    icon: <BugReportOutlinedIcon sx={{ color: '#222', fontSize: 32 }} />,
    bg: '#EAF7FF',
    text: 'You have a quote that nee...',
    time: 'Just now'
  },
  {
    icon: <PersonOutlineIcon sx={{ color: '#222', fontSize: 32 }} />,
    bg: '#EDF3F9',
    text: 'New quote received',
    time: '59 minutes ago'
  },
  {
    icon: <BugReportOutlinedIcon sx={{ color: '#222', fontSize: 32 }} />,
    bg: '#EAF7FF',
    text: 'You have a sample that ne...',
    time: '12 hours ago'
  },
  {
    icon: <WifiTetheringIcon sx={{ color: '#222', fontSize: 32 }} />,
    bg: '#EDF3F9',
    text: 'Andi Lane assigned a task...',
    time: 'Today, 11:59 AM'
  },
];


const activities = [
  { avatar: 'https://randomuser.me/api/portraits/men/11.jpg', text: 'You have a quote that nee...', time: 'Just now' },
  { avatar: 'https://randomuser.me/api/portraits/men/12.jpg', text: 'Released a new BOM', time: '59 minutes ago' },
  { avatar: 'https://randomuser.me/api/portraits/men/13.jpg', text: 'Submitted a quote', time: '12 hours ago' },
  { avatar: 'https://randomuser.me/api/portraits/men/14.jpg', text: 'Modified requirements in...', time: 'Today, 11:59 AM' },
  { avatar: 'https://randomuser.me/api/portraits/men/15.jpg', text: 'Deleted a page in Project X', time: 'Feb 2, 2023' },
];

const contacts = [
  { avatar: 'https://randomuser.me/api/portraits/women/11.jpg', name: 'Natali Craig' },
  { avatar: 'https://randomuser.me/api/portraits/men/16.jpg', name: 'Drew Cano' },
  { avatar: 'https://randomuser.me/api/portraits/men/17.jpg', name: 'Orlando Diggs' },
  { avatar: 'https://randomuser.me/api/portraits/women/12.jpg', name: 'Andi Lane' },
  { avatar: 'https://randomuser.me/api/portraits/women/13.jpg', name: 'Kate Morrison' },
  { avatar: 'https://randomuser.me/api/portraits/men/18.jpg', name: 'Koray Okumus' },
];

export function RightSidebar() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 64,
        right: 0,
        height: 'calc(100vh - 64px)',
        bgcolor: '#fff',
        borderLeft: '1px solid #eee',
        boxShadow: '0 0 16px rgba(0,0,0,0.04)',
        px: 3,
        py: 2,
        overflowY: 'auto',
        zIndex: 1200,
        display: { xs: 'none', lg: 'block' },
      }}
    >
      {/* Notifications */}
      <Typography fontWeight={700} fontSize={15} mb={1}>Notifications</Typography>
      <List dense disablePadding>
        {notifications.map((n, i) => (
          <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ fontSize: 24, mr: 1 }}>{n.icon}</Box>
            <Box>
              <Typography fontSize={15} fontWeight={500}>{n.text}</Typography>
              <Typography fontSize={13} color="text.secondary">{n.time}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Activities */}
      <Typography variant="h6" fontWeight="bold" mb={1.5}>Activities</Typography>
      <List dense disablePadding>
        {activities.map((a, i) => (
          <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start', mb: 1 }}>
            <ListItemAvatar>
              <Avatar src={a.avatar} sx={{ width: 28, height: 28, mr: 1 }} />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography fontSize={15} fontWeight={500}>{a.text}</Typography>}
              secondary={<Typography fontSize={13} color="text.secondary">{a.time}</Typography>}
              primaryTypographyProps={{ component: 'span' }}
              secondaryTypographyProps={{ component: 'span' }}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Contacts */}
      <Typography variant="h6" fontWeight="bold" mb={1.5}>Contacts</Typography>
      <List dense disablePadding>
        {contacts.map((c, i) => (
          <ListItem key={i} disableGutters sx={{ alignItems: 'center', mb: 1 }}>
            <Avatar src={c.avatar} sx={{ width: 28, height: 28, mr: 1 }} />
            <Typography fontSize={15}>{c.name}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

<Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    bgcolor: '#FAFBFC',
    minHeight: '100vh',
    overflowX: 'auto', // add this
  }}
>
  {/* ...dashboard content... */}
</Box>