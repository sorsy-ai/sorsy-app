import { Box, Card, CardContent, Typography, Chip, Button, List, ListItem, Avatar, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const projects = [
  { status: 'Completed', statusColor: 'success', name: 'Melina Sweater', collection: 'SS25', price: '$182.94', date: 'Jan 17, 2022', factory: 'Delta Weave Factory' },
  { status: 'Completed', statusColor: 'success', name: 'Sneaker', collection: 'SS25', price: '$99.00', date: 'Jan 17, 2022', factory: 'Atlas Garments' },
  { status: 'Sample Sent', statusColor: 'warning', name: 'Lifestyle Slide', collection: 'Ongoing', price: '$249.94', date: 'Jan 17, 2022', factory: 'Tori Fabric Co.' },
  { status: 'Canceled', statusColor: 'error', name: 'T-shirt, basic', collection: 'SS25', price: '$199.24', date: 'Jan 17, 2022', factory: 'Li Jiang  Co.' },
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
    <Grid container spacing={3}>
      <Grid >
        <Card variant="outlined">
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight="bold">Projects</Typography>
              <Button size="small" sx={{ color: '#E60012', fontWeight: 600, textTransform: 'none' }}>See All Projects &gt;</Button>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipis.
            </Typography>
            {projects.map((proj) => (
              <Box
                key={proj.name}
                display="flex"
                alignItems="center"
                py={1}
                borderBottom={proj !== projects[projects.length - 1] ? '1px solid #f0f0f0' : 'none'}
                sx={{ gap: 4 }} 
              >
                <Chip
                  label={proj.status}
                  size="small"
                  sx={{
                    bgcolor: proj.statusColor === 'success' ? '#E6F7EC' : proj.statusColor === 'warning' ? '#FFF7E0' : '#FDEAEA',
                    color: proj.statusColor === 'success' ? '#1DB06B' : proj.statusColor === 'warning' ? '#E6B800' : '#E60012',
                    fontWeight: 600,
                    mr: 2,
                    minWidth: 110,
                  }}
                />
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
      </Grid>

      <Grid>
        <Grid container spacing={3}>
          <Grid>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={1}>Tasks</Typography>
                <List disablePadding>
                  {tasks.map((task) => (
                    <ListItem key={task} disableGutters sx={{ mb: 1, px: 0 }}>
                      <CheckCircleOutlineIcon sx={{ color: '#E60012', mr: 1 }} />
                      <Typography>{task}</Typography>
                    </ListItem>
                  ))}
                </List>
                <Button size="small" sx={{ color: '#E60012', fontWeight: 600, textTransform: 'none', mt: 1 }}>View all Tasks &gt;</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={1}>Quotes</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>Lorem ipsum dolor sit ametis.</Typography>
                <List disablePadding>
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
                <Button size="small" sx={{ color: '#888', fontWeight: 600, textTransform: 'none', mt: 1 }}>SEE ALL QUOTES &gt;</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
