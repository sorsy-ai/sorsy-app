'use client'

import { Box, Typography } from '@mui/material'
import { DashboardOverview } from './components/DashboardOverview'
import { RightSidebar } from './components/RightSidebar'

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', bgcolor: '#FAFBFC', minHeight: '100vh' }}>
      <Box
        sx={{
          flex: 1,
          px: { xs: 2, md: 3 }, // smaller, responsive horizontal padding
          maxWidth: 700,         // keeps content compact
        }}
      >
        <Box mb={3}>
          <Typography variant="h4" fontWeight={600} fontSize={24} mb={2}>
            Hi Mariana
          </Typography>
          <DashboardOverview />
        </Box>
      </Box>
      <RightSidebar />
    </Box>
  )
}
