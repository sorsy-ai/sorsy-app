'use client';

import * as React from 'react';
import OrdersTable from './ordersTable';
import { Box } from '@mui/system';

export default function OrdersPage() {
 
  return (
   <>
  <OrdersTable openQuote={true} />
  <Box mt={4}>
    <OrdersTable openQuote={false} />
  </Box>
</>

  );
}
