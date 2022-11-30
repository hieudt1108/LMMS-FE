import React from 'react';
import { Box, Card, CardHeader, Typography } from '@mui/material';

export default function LevelSecond({ title }) {
  return (
    <Box sx={{ p: 3, cursor: 'pointer' }} gap={3} display="grid" gridTemplateColumns="repeat(2, 1fr)">
      {[...Array(4)].map((_, index) => (
        <Card key={index}>
          <CardHeader title={`Lớp ${index + 6}`} subheader="Proin viverra ligula" />

          <Typography sx={{ p: 3, color: 'text.secondary' }}>
            Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. In enim justo, rhoncus ut, imperdiet a,
            venenatis vitae, justo. Vestibulum fringilla pede sit amet augue.
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
