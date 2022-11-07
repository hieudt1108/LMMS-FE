import { Button, Stack, Typography } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

const MemberHeader = ({ title, numberMember, titleAction }) => {
  return (
    <React.Fragment>
      <Typography variant='h5' gutterBottom>
        <Stack
          spacing={2}
          justifyContent='space-between'
          direction='row'
          alignItems='center'
        >
          {`${title}(${numberMember})`}
          <Button variant='contained' disableElevation size='small'>
            <AddIcon></AddIcon> {titleAction}
          </Button>
        </Stack>
      </Typography>
    </React.Fragment>
  );
};

export default MemberHeader;