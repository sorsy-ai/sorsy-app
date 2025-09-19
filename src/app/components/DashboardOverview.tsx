import { Box, Card, CardContent, Typography, Button, List, ListItem, Avatar } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const pillStyles: Record<string, { bg: string; color: string; dot: string }> = {
  Completed: { bg: '#ECFDF3', color: '#027A48', dot: '#12B76A' },
  'Sample Sent': { bg: '#FEF9C3', color: '#B54708', dot: '#FACC15' },
  Canceled: { bg: '#FEE4E2', color: '#B42318', dot: '#F04438' }
};

function StatusPill({ label }: { label: keyof typeof pillStyles }) {
  const { bg, color, dot } = pillStyles[label] || pillStyles.Completed;
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 1,
        py: 0.25,
        borderRadius: '10px',
        bgcolor: bg,
        minWidth: 0,
      }}
    >
      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: dot, mr: 0.5 }} />
      <Typography sx={{ color, fontWeight: 500, fontSize: 12, fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif' }}>
        {label}
      </Typography>
    </Box>
  );
}

const projects = [
  { status: 'Completed', name: 'Melina Sweater', collection: 'SS25', price: '$182.94', date: 'Jan 17, 2022', factory: 'Delta Weave Factory' },
  { status: 'Completed', name: 'Sneaker', collection: 'SS25', price: '$99.00', date: 'Jan 17, 2022', factory: 'Atlas Garments' },
  { status: 'Sample Sent', name: 'Lifestyle Slide', collection: 'Ongoing', price: '$249.94', date: 'Jan 17, 2022', factory: 'Tori Fabric Co.' },
  { status: 'Canceled', name: 'T-shirt, basic', collection: 'SS25', price: '$199.24', date: 'Jan 17, 2022', factory: 'Li Jiang  Co.' },
];

const tasks = [
  'Review fabric samples',
  'Approve purchase order for Style 1033',
  'Confirm shipment address',
  'Update costing sheets',
];

const quotes = [
  { name: 'Li Ming Factory', project: 'Melina Sweater', location: 'Da Nang, Vietnam', amount: '$11,234', avatar: 'https://randomuser.me/api/portraits/men/31.jpg' },
  { name: 'Jameson Lane', project: 'Melina Sweater', location: 'Da Nang, Vietnam', amount: '$11,159', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Affix Apparel', project: 'Melina Sweater', location: 'Ho Chi Minh, Vietnam', amount: '$10,483', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
];

export function DashboardOverview() {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Projects Card */}
      <Card sx={{ borderRadius: 2, mb: 2, boxShadow: 'none', border: '1px solid #E4E4E7' }}>
        <CardContent sx={{ p: 2 }}>
          <Typography fontWeight={700} fontSize={17} mb={0.5}>Projects</Typography>
          <Typography fontSize={13} color="text.secondary" mb={1}>
            Lorem ipsum dolor sit amet, consectetur adipis.
          </Typography>
          {projects.map((proj, idx) => (
            <Box
              key={proj.name}
              display="flex"
              alignItems="center"
              py={1}
              borderBottom={idx !== projects.length - 1 ? '1px solid #f0f0f0' : 'none'}
              sx={{ gap: 2 }}
            >
              <Box sx={{ minWidth: 100 }}>
                <StatusPill label={proj.status as keyof typeof pillStyles} />
              </Box>
              <Box flex={1} minWidth={120} mr={1}>
                <Typography fontWeight={600} fontSize={14}>{proj.name}</Typography>
                <Typography fontSize={12} color="text.secondary">Collection: {proj.collection}</Typography>
              </Box>
              <Box minWidth={80} mr={1}>
                <Typography fontWeight={600} fontSize={14}>{proj.price}</Typography>
                <Typography fontSize={12} color="text.secondary">{proj.date}</Typography>
              </Box>
              <Box minWidth={100}>
                <Typography fontSize={13} color="text.secondary">{proj.factory}</Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
      {/* Responsive grid for Tasks and Quotes */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
        }}
      >
        {/* Tasks Card */}
        <Card sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid #E4E4E7' }}>
          <CardContent sx={{ p: 2 }}>
            <Typography fontWeight={700} fontSize={16} mb={1}>Tasks</Typography>
            <List disablePadding>
              {tasks.map((task) => (
                
                <ListItem key={task} disableGutters sx={{ mb: 0.5, px: 0 }}>
                   <CheckCircleOutlineIcon sx={{ color: '#E60012', mr: 1 }} />
                  <Typography fontSize={13}>{task}</Typography>
                </ListItem>
              ))}
            </List>
            <Button sx={{ fontSize: 12, mt: 1, textTransform: 'none', color: '#E60012', fontWeight: 500 }}>
              View all Tasks &gt;
            </Button>
          </CardContent>
        </Card>
        {/* Quotes Card */}
        <Card sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid #E4E4E7' }}>
          <CardContent sx={{ p: 2 }}>
            <Typography fontWeight={700} fontSize={16} mb={1}>Quotes</Typography>
            <Typography fontSize={12} color="text.secondary" mb={1}>Lorem ipsum dolor sit ametis.</Typography>
            <List disablePadding>
              {quotes.map((q) => (
                <ListItem key={q.name} disableGutters sx={{ mb: 0.5, px: 0 }}>
                  <Avatar src={q.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                  <Box flex={1}>
                    <Typography fontWeight={600} fontSize={13}>{q.name}</Typography>
                    <Typography fontSize={11} color="text.secondary">{q.project}</Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography fontWeight={600} fontSize={13}>{q.amount}</Typography>
                    <Typography fontSize={11} color="text.secondary">{q.location}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Button sx={{ fontSize: 12, mt: 1, textTransform: 'none', color: '#888', fontWeight: 500 }}>
              SEE ALL QUOTES &gt;
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
