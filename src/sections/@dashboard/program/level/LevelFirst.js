import { Box, Card, CardHeader, Typography } from '@mui/material';
import React from 'react';
//
import { useRouter } from 'next/router';
//
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function Level() {
  const {
    query: { title },
  } = useRouter();
  const router = useRouter();
  const { push } = useRouter();

  const handlerRedirect = (id) => {
    router.push(PATH_DASHBOARD.program.gradeSub(title, id));
    console.log('clicked: ', id + 1);
  };
  return (
    <Box sx={{ p: 3, cursor: 'pointer' }} gap={3} display="grid" gridTemplateColumns="repeat(2, 1fr)">
      {[...Array(5)].map((_, index) => (
        <Card key={index} onClick={() => handlerRedirect(index)}>
          <CardHeader title={`Lớp ${index + 1}`} subheader="Proin viverra ligula" />

          <Typography sx={{ p: 3, color: 'text.secondary' }}>
            Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. In enim justo, rhoncus ut, imperdiet a,
            venenatis vitae, justo. Vestibulum fringilla pede sit amet augue.
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
