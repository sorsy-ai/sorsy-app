import { Grid, Paper, Typography } from '@mui/material'

const data = [
  { title: 'Active Projects', value: 3 },
  { title: 'In-Progress POs', value: 2 },
  { title: 'Messages', value: 7 }
]

export function DashboardOverview() {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} sm={4} key={item.title}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="h4">{item.value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
