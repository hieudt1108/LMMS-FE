import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// form
import {useFormContext} from 'react-hook-form';
// @mui
import {Button, Divider, Stack, Typography} from '@mui/material';
// hooks
// _mock
// components
//
import SlotListDialog from './SlotListDialog';
import {getAllSlot} from "../../../dataProvider/agent";
import useResponsive from "../../../hooks/useResponsive";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export default function SubjectNewEditSlot() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { invoiceFrom, invoiceTo } = values;

  const [openFrom, setOpenFrom] = useState(false);

  const [openTo, setOpenTo] = useState(false);

  const [listSlots, setListSlots] = useState([]);

  const handleOpenFrom = () => {
    setOpenFrom(true);
  };

  const handleCloseFrom = () => {
    setOpenFrom(false);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  async function fetchSlots() {
    const res = await getAllSlot({pageIndex: 1, pageSize: 100});
    console.log(res.data.data)
    if (res.status < 400) {
      setListSlots(res.data.data);
    } else {
      console.log('error');
    }
  }


  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation={upMd ? 'vertical' : 'horizontal'} sx={{ borderStyle: 'dashed' }} />}

    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{color: 'text.disabled', mb: 1}}>
            Tiết học:
          </Typography>

          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={handleOpenFrom}>
            Thêm/Thay đổi
          </Button>

          <SlotListDialog
            open={openFrom}
            onClose={handleCloseFrom}
            data={listSlots}
          />
        </Stack>


      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

SlotInfo.propTypes = {
  name: PropTypes.string,
};

function SlotInfo({ name}) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
    </>
  );
}
