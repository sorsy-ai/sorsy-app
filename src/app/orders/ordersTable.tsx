'use client';

import * as React from 'react';
import {
  Stack,
  Toolbar,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Avatar,
  Typography,
  TableContainer,
  Box,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const StatusDot = ({ color }: { color: string }) => (
  <Box component="span" sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color, display: 'inline-block' }} />
);

type Row = {
  selected: boolean;
  quoteId: string;
  brand: { name: string; avatar: string | null };
  project: string;
  factory: { name: string; avatar: string | null };
  units: string;
  quote: string;
  quoteColor: string;
  dueDate: string;
  status: string;
  statusColor: string;
  statusDotColor: string;
  highlighted?: boolean;
};

const initialRows: Row[] = [
  { selected:false, quoteId:'#CM9801', brand:{name:'437', avatar:null}, project:'Running shoe', factory:{name:'Everline Textiles', avatar:null}, units:'10,000', quote:'$6.50', quoteColor:'#34C759', dueDate:'Feb 2, 2023', status:'Submitted', statusColor:'#8A8CD9', statusDotColor:'#95A4FC' },
  { selected:false, quoteId:'#CM9802', brand:{name:'437', avatar:null}, project:'Running shoe', factory:{name:'NOVA Knitwear', avatar:null}, units:'2,100', quote:'$6.50', quoteColor:'#34C759', dueDate:'Feb 2, 2023', status:'Approved', statusColor:'#4AA785', statusDotColor:'#A1E3CB' },
  { selected:false, quoteId:'#CM9803', brand:{name:'437', avatar:null}, project:'Running shoe', factory:{name:'Thread & Form', avatar:null}, units:'3,000', quote:'$6.50', quoteColor:'#34C759', dueDate:'Feb 2, 2023', status:'Counter Offer', statusColor:'#59A8D4', statusDotColor:'#B1E3FF' },
  { selected:true,  quoteId:'#CM9804', brand:{name:'437', avatar:null}, project:'Running shoe', factory:{name:'Pacific Edge2', avatar:null}, units:'3,000', quote:'$6.50', quoteColor:'#34C759', dueDate:'Feb 2, 2023', status:'Approved', statusColor:'#4AA785', statusDotColor:'#34C759' },
  { selected:false, quoteId:'#CM9805', brand:{name:'437', avatar:null}, project:'Heavyweight Crewneck', factory:{name:'Atlas Apparel G...', avatar:null}, units:'10,000', quote:'$10.42', quoteColor:'#FF8D28', dueDate:'Feb 2, 2023', status:'Submitted', statusColor:'#8A8CD9', statusDotColor:'#8A8CD9', highlighted:true },
  { selected:false, quoteId:'#CM9806', brand:{name:'lululemon', avatar:null}, project:'Menswear Edit', factory:{name:'Blue Peak Sour...', avatar:null}, units:'50,000', quote:'$11.29', quoteColor:'#FF383C', dueDate:'Feb 2, 2023', status:'Submitted', statusColor:'#8A8CD9', statusDotColor:'#95A4FC' },
  { selected:false, quoteId:'#CM9807', brand:{name:'lululemon', avatar:null}, project:'Menswear Edit', factory:{name:'Sunfield', avatar:null}, units:'150,000', quote:'$11.31', quoteColor:'#FF383C', dueDate:'Feb 2, 2023', status:'Approved', statusColor:'#4AA785', statusDotColor:'#A1E3CB' },
  { selected:false, quoteId:'#CM9808', brand:{name:'lululemon', avatar:null}, project:'Menswear Edit', factory:{name:'Coreflex Footw...', avatar:null}, units:'10,000', quote:'$11.00', quoteColor:'#34C759', dueDate:'Feb 2, 2023', status:'Submitted', statusColor:'#8A8CD9', statusDotColor:'#95A4FC' },
  { selected:false, quoteId:'#CM9809', brand:{name:'lululemon', avatar:null}, project:'Menswear Edit', factory:{name:'Unionwear', avatar:null}, units:'1,000', quote:'$10.80', status:'Submitted', quoteColor:'#34C759', dueDate:'Feb 2, 2023', statusColor:'#8A8CD9', statusDotColor:'#B1E3FF' },
  { selected:false, quoteId:'#CM9810', brand:{name:'lululemon', avatar:null}, project:'Menswear Edit', factory:{name:'Loomline Tex...', avatar:null}, units:'1,000', quote:'$10.99', status:'Submitted', dueDate:'Feb 2, 2023', quoteColor:'#34C759', statusColor:'#8A8CD9', statusDotColor:'#8A8CD9' },
];

export default function OrdersTable({ openQuote }: { openQuote: boolean }) {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const [query, setQuery] = React.useState('');

  const isArchived = !openQuote;

  // Filter rows by query (case-insensitive)
  const filteredRows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const hay = [
        r.quoteId,
        r.brand.name,
        r.project,
        r.factory.name,
        r.units,
        r.quote,
        r.dueDate,
        r.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query]);

  // Select-all applies to the filtered subset only
  const allChecked = filteredRows.length > 0 && filteredRows.every((r) => r.selected);
  const someChecked = filteredRows.some((r) => r.selected) && !allChecked;

  const toggleAll = () => {
    const next = !allChecked;
    setRows((prev) =>
      prev.map((r) =>
        filteredRows.find((f) => f.quoteId === r.quoteId) ? { ...r, selected: next } : r
      )
    );
  };

  const toggleRowById = (quoteId: string) => {
    setRows((prev) => prev.map((r) => (r.quoteId === quoteId ? { ...r, selected: !r.selected } : r)));
  };

  // Archived status mapping
  const archivedView = (row: Row) => {
    // rule: Approved -> Expired; everything else -> Rejected
    const text = row.status === 'Approved' ? 'Expired' : 'Rejected';
    const color = '#FF5A5F'; // or (theme) => theme.palette.error.main
    return { text, color, dot: color };
  };

  const columns = [
    { key: 'id', label: 'Quote ID', width: 90, align: 'left' as const },
    { key: 'brand', label: 'Brand', width: 120, align: 'left' as const },
    { key: 'project', label: 'Project', width: 160, align: 'left' as const },
    { key: 'factory', label: 'Factory', width: 190, align: 'left' as const },
    { key: 'units', label: 'Units', width: 90, align: 'right' as const },
    { key: 'quote', label: 'Quote', width: 90, align: 'right' as const },
    { key: 'due', label: 'Due Date', width: 130, align: 'left' as const },
    { key: 'status', label: 'Status', width: 120, align: 'left' as const },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Title */}
      <Box sx={{ pt: 3 }}>
        <Typography variant="h5" fontWeight="medium">
          {openQuote ? 'Open Quotes' : 'Archived Quotes'}
        </Typography>
      </Box>

      {/* Toolbar */}
      <Paper elevation={0} sx={{ backgroundColor: '#F7F9FB', borderRadius: 2, mb: 2, px: 1 }}>
        <Toolbar disableGutters sx={{ px: 1, minHeight: 44, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" spacing={1}>
              <IconButton size="small" aria-label="add"><AddIcon fontSize="small" /></IconButton>
              <IconButton size="small" aria-label="filter"><FilterListIcon fontSize="small" /></IconButton>
              <IconButton size="small" aria-label="sort"><SortIcon fontSize="small" /></IconButton>
            </Stack>

            <TextField
              size="small"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: 220,
                '& .MuiOutlinedInput-root': { backgroundColor: 'rgba(255,255,255,0.4)' },
              }}
            />
          </Stack>
        </Toolbar>
      </Paper>

      {/* Table */}
      <TableContainer component={Box} sx={{ width: '100%', bgcolor: 'transparent', boxShadow: 'none' }}>
        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: 44, px: 1, borderBottom: '1px solid rgba(28,28,28,0.2)' }}>
                <Checkbox
                  indeterminate={someChecked}
                  checked={allChecked}
                  onChange={toggleAll}
                  inputProps={{ 'aria-label': 'select all rows' }}
                  size="small"
                />
              </TableCell>

              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align}
                  sx={{ width: col.width, px: 1, borderBottom: '1px solid rgba(28,28,28,0.2)' }}
                >
                  <Typography variant="caption" sx={{ color: 'rgba(28,28,28,0.4)' }}>
                    {col.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.map((row) => {
              const cellBg = row.highlighted ? '#F7F9FB' : 'transparent';
              const border = '1px solid rgba(28,28,28,0.05)';

              const arch = isArchived ? archivedView(row) : null;
              const statusText = arch ? arch.text : row.status;
              const statusColor = arch ? arch.color : row.statusColor;
              const statusDot = arch ? arch.dot : row.statusDotColor;

              return (
                <TableRow key={row.quoteId} hover selected={row.selected}>
                  {/* Checkbox */}
                  <TableCell align="center" sx={{ width: 44, px: 1, backgroundColor: cellBg, borderBottom: border }}>
                    <Checkbox
                      checked={row.selected}
                      onChange={() => toggleRowById(row.quoteId)}
                      inputProps={{ 'aria-label': `select ${row.quoteId}` }}
                      size="small"
                    />
                  </TableCell>

                  {/* Quote ID */}
                  <TableCell sx={{ px: 1, backgroundColor: cellBg, borderBottom: border }}>
                    <Typography sx={{ fontSize: 12, color: '#1C1C1C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {row.quoteId}
                    </Typography>
                  </TableCell>

                  {/* Brand */}
                  <TableCell sx={{ px: 1, backgroundColor: cellBg, borderBottom: border }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                      {row.brand.avatar && <Avatar src={row.brand.avatar} sx={{ width: 20, height: 20 }} />}
                      <Typography sx={{ fontSize: 12, color: '#1C1C1C' }} noWrap>
                        {row.brand.name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Project */}
                  <TableCell sx={{ px: 1, backgroundColor: cellBg, borderBottom: border }}>
                    <Typography sx={{ fontSize: 12, color: '#1C1C1C' }} noWrap>
                      {row.project}
                    </Typography>
                  </TableCell>

                  {/* Factory */}
                  <TableCell sx={{ px: 1, backgroundColor: cellBg, borderBottom: border }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                      <Avatar src={row.factory.avatar ?? undefined} sx={{ width: 20, height: 20 }} />
                      <Typography sx={{ fontSize: 12, color: '#1C1C1C' }} noWrap>
                        {row.factory.name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Units */}
                  <TableCell align="right" sx={{ px: 1, backgroundColor: cellBg, borderBottom: border }}>
                    <Typography sx={{ fontSize: 12, color: '#1C1C1C' }}>{row.units}</Typography>
                  </TableCell>

                  {/* Quote */}
                  <TableCell align="right" sx={{ px: 1, backgroundColor: cellBg, borderBottom: border }}>
                    <Typography sx={{ fontSize: 12, color: row.quoteColor }}>{row.quote}</Typography>
                  </TableCell>

                  {/* Due Date */}
                  <TableCell sx={{ px: 1, backgroundColor: cellBg, borderBottom: border }}>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ minWidth: 0 }}>
                      <CalendarMonthIcon sx={{ fontSize: 16 }} />
                      <Typography sx={{ fontSize: 12, color: '#1C1C1C' }} noWrap>
                        {row.dueDate}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ px: 1, backgroundColor: cellBg, borderBottom: border }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                      <StatusDot color={statusDot} />
                      <Typography sx={{ fontSize: 12, color: statusColor }} noWrap>
                        {statusText}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
