import { Box, Card, CardContent, Typography, Button, List, ListItem, Avatar } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Pill style map for dot and color
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
        px: 1.5,
        py: 0.25,
        borderRadius: '12px',
        bgcolor: bg,
        minWidth: 0,
      }}
    >
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: dot, mr: 0.5 }} />
      <Typography sx={{ color, fontWeight: 600, fontSize: 13, fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif' }}>
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
    <Box
      sx={{
        bgcolor: '#FAFBFC',
        minHeight: '100vh',
        p: 3,
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ width: 900, ml: 0 }}>
        {/* Projects Card */}
        <Card
          variant="outlined"
          sx={{
            borderRadius: 5,
            border: '1px solid #E4E4E7',
            bgcolor: '#FFF',
            mb: 3,
            boxShadow: 'none',
            width: '100%',
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight="bold">Projects</Typography>
              <Button size="small" sx={{ color: '#E60012', fontWeight: 600, textTransform: 'none' }}>See All Projects &gt;</Button>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipis.
            </Typography>
            {projects.map((proj, idx) => (
              <Box
                key={proj.name}
                display="flex"
                alignItems="center"
                py={1.5}
                borderBottom={idx !== projects.length - 1 ? '1px solid #f0f0f0' : 'none'}
                sx={{ gap: 4 }}
              >
                <Box sx={{ minWidth: 120 }}>
                  <StatusPill label={proj.status as keyof typeof pillStyles} />
                </Box>
                <Box flex={1} minWidth={180} mr={2}>
                  <Typography fontWeight="bold" fontSize={15}>{proj.name}</Typography>
                  <Typography variant="caption" color="text.secondary">Collection: {proj.collection}</Typography>
                </Box>
                <Box minWidth={110} mr={2}>
                  <Typography fontWeight="bold">{proj.price}</Typography>
                  <Typography variant="caption" color="text.secondary">{proj.date}</Typography>
                </Box>
                <Box minWidth={160}>
                  <Typography variant="body2" color="text.secondary">{proj.factory}</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
       {/* Tasks & Quotes side by side, both 50% width to match parent width */}
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
    gap: 3,
    width: '100%',
    m: 0,
  }}
>
  {/* Left column (Tasks) */}
  <Box sx={{ width: '100%', pl: 0 }}>
    <Card
      variant="outlined"
      sx={{
        borderRadius: 5,
        border: '1px solid #E4E4E7',
        bgcolor: '#FFF',
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'none',
        width: '100%',
      }}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>Tasks</Typography>
        <List disablePadding sx={{ flex: 1 }}>
          {tasks.map((task) => (
            <ListItem key={task} disableGutters sx={{ mb: 1, px: 0 }}>
              <CheckCircleOutlineIcon sx={{ color: '#E60012', mr: 1 }} />
              <Typography>{task}</Typography>
            </ListItem>
          ))}
        </List>
        <Button size="small" sx={{ color: '#E60012', fontWeight: 600, textTransform: 'none', mt: 1, alignSelf: 'flex-start' }}>
          View all Tasks &gt;
        </Button>
      </CardContent>
    </Card>
  </Box>

  {/* Right column (Quotes) */}
  <Box sx={{ width: '100%', pr: 0 }}>
    <Card
      variant="outlined"
      sx={{
        borderRadius: 5,
        border: '1px solid #E4E4E7',
        bgcolor: '#FFF',
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'none',
        width: '100%',
      }}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>Quotes</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>Lorem ipsum dolor sit ametis.</Typography>
        <List disablePadding sx={{ flex: 1 }}>
          {quotes.map((q) => (
            <ListItem key={q.name} disableGutters sx={{ mb: 1, px: 0 }}>
              <Avatar src={q.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
              <Box flex={1}>
                <Typography fontWeight="bold" fontSize={15}>{q.name}</Typography>
                <Typography variant="caption" color="text.secondary">{q.project}</Typography>
              </Box>
              <Box textAlign="right">
                <Typography fontWeight="bold">{q.amount}</Typography>
                <Typography variant="caption" color="text.secondary">{q.location}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        <Button size="small" sx={{ color: '#888', fontWeight: 600, textTransform: 'none', mt: 1, alignSelf: 'flex-start' }}>
          SEE ALL QUOTES &gt;
        </Button>
      </CardContent>
    </Card>
  </Box>
</Box>
      </Box>
    </Box>
  );
}
