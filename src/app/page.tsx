'use client'

import { Box, Typography, Container, Grid } from '@mui/material'
import { DashboardOverview } from './components/DashboardOverview'

export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight="medium" mb={4}>
       Dashboard
      </Typography>

      <Box mb={6}>
        <DashboardOverview />
      </Box>
    </Container>
  )
}
