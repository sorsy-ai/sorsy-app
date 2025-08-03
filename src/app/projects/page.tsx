import { DashboardOverview } from './DashboardOverview'
import { ProjectTimeline } from './ProjectTimeline'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function ProjectsPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight="medium" mb={4}>
       Projects
      </Typography>
    </Container>
  );
}
