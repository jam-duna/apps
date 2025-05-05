// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

'use client';

import type { PiEntry, PiItem } from '../../../types/index.js';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableViewIcon from '@mui/icons-material/TableView';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';

// Helper to sum an array of PiEntry values.
function sumEntries (entries: PiEntry[]): PiEntry {
  if (!entries) {
    return {
      assurances: 0,
      blocks: 0,
      guarantees: 0,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 0
    };
  }

  return entries.reduce(
    (acc, entry) => ({
      assurances: acc.assurances + entry.assurances,
      blocks: acc.blocks + entry.blocks,
      guarantees: acc.guarantees + entry.guarantees,
      pre_images: acc.pre_images + entry.pre_images,
      pre_images_size: acc.pre_images_size + entry.pre_images_size,
      tickets: acc.tickets + entry.tickets
    }),
    {
      assurances: 0,
      blocks: 0,
      guarantees: 0,
      pre_images: 0,
      pre_images_size: 0,
      tickets: 0
    }
  );
}

// Renders a small table for aggregated totals.
function renderTotalsTable (totals: PiEntry) {
  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Blocks</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Tickets</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Pre Images</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Pre Images Size</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Guarantees</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Assurances</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{totals.blocks}</TableCell>
          <TableCell>{totals.tickets}</TableCell>
          <TableCell>{totals.pre_images}</TableCell>
          <TableCell>{totals.pre_images_size}</TableCell>
          <TableCell>{totals.guarantees}</TableCell>
          <TableCell>{totals.assurances}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

// Renders detailed table of entries.
const renderPiEntries = (entries: PiEntry[], title: string) => {
  if (!entries || entries.length === 0) {
    return <Typography>No {title} entries available.</Typography>;
  }

  return (
    <Box sx={{ my: 2 }}>
      <Typography
        sx={{ mb: 2 }}
        variant='h6'
      >
        {title}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 300 }}
      >
        <Table
          size='small'
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Blocks</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tickets</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Pre Images</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Pre Images Size</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Guarantees</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Assurances</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, idx) => (
              <TableRow
                hover
                key={idx}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{idx}</TableCell>
                <TableCell>{entry.blocks}</TableCell>
                <TableCell>{entry.tickets}</TableCell>
                <TableCell>{entry.pre_images}</TableCell>
                <TableCell>{entry.pre_images_size}</TableCell>
                <TableCell>{entry.guarantees}</TableCell>
                <TableCell>{entry.assurances}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Renders a comparison summary table between current and last.
function renderComparisonTable (currentTotals: PiEntry, lastTotals: PiEntry) {
  const metrics = [
    { key: 'blocks', label: 'Blocks' },
    { key: 'tickets', label: 'Tickets' },
    { key: 'pre_images', label: 'Pre Images' },
    { key: 'pre_images_size', label: 'Pre Images Size' },
    { key: 'guarantees', label: 'Guarantees' },
    { key: 'assurances', label: 'Assurances' }
  ];

  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Metric</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Comparison to Last</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {metrics.map((metric) => {
          const curValue = currentTotals[metric.key as keyof PiEntry];
          const lastValue = lastTotals[metric.key as keyof PiEntry];
          const diffValue = curValue - lastValue;
          let compText = '';

          if (diffValue > 0) {
            compText = `${diffValue} more`;
          } else if (diffValue < 0) {
            compText = `${Math.abs(diffValue)} fewer`;
          } else {
            compText = 'No change';
          }

          return (
            <TableRow key={metric.key}>
              <TableCell>{metric.label}</TableCell>
              <TableCell>{compText}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// A simple helper to truncate a very long hash string.
export const truncateHash = (hash: string, maxLength = 10): string => {
  if (!hash) {
    return '';
  }

  if (hash.length <= maxLength * 2) {
    return hash;
  }

  return `${hash.slice(0, maxLength)}...${hash.slice(-maxLength)}`;
};

interface PiTableProps {
  data: PiItem;
  isHomePage?: boolean;
}

export default function PiTable ({ data, isHomePage = false }: PiTableProps) {
  // Aggregate totals for current and last arrays.
  const currentTotals = sumEntries(data.vals_current);
  const lastTotals = sumEntries(data.vals_last);
  const [openComparison, setOpenComparison] = useState(false);

  const handleOpenComparison = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setOpenComparison(true);
  }, []);

  const handleCloseComparison = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setOpenComparison(false);
  }, []);

  return (
    <Box sx={{ my: 4 }}>
      {isHomePage && (
        <Box
          alignItems='center'
          display='flex'
          sx={{ mb: 3 }}
        >
          <Typography variant='h5'>Validator statistics</Typography>
          <IconButton
            onClick={handleOpenComparison}
            sx={{ border: '1px solid #ddd', ml: 3 }}
          >
            <TableViewIcon />
          </IconButton>
          <Dialog
            fullWidth
            maxWidth='md'
            onClose={handleCloseComparison}
            open={openComparison}
          >
            <DialogTitle>Comparison</DialogTitle>
            <DialogContent>
              {renderComparisonTable(currentTotals, lastTotals)}
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button onClick={handleCloseComparison}>Close</Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      )}
      {/* Accordion for Current Data */}
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{ mb: 2 }}
              variant='h6'
            >
              Current
            </Typography>
            <TableContainer>{renderTotalsTable(currentTotals)}</TableContainer>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {renderPiEntries(data.vals_current, 'Current Details')}
        </AccordionDetails>
      </Accordion>
      {/* Accordion for Last Data */}
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{ mb: 2 }}
              variant='h6'
            >
              Last
            </Typography>
            <TableContainer>{renderTotalsTable(lastTotals)}</TableContainer>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {renderPiEntries(data.vals_last, 'Last Details')}
        </AccordionDetails>
      </Accordion>
      {!isHomePage && renderComparisonTable(currentTotals, lastTotals)}
    </Box>
  );
}
