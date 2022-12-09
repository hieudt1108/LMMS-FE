import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// next
import { useRouter } from 'next/router';
// @mui
import { Link, Typography, Autocomplete, InputAdornment, Avatar } from '@mui/material';
// utils
// routes
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import { CustomTextField } from '../../../components/custom-input';
import SearchNotFound from '../../../components/search-not-found';
import { getAllUsers } from 'src/dataProvider/agent';
import { dispatch } from 'src/redux/store';
import { handleSearchUserRedux } from 'src/redux/slices/document';

// ----------------------------------------------------------------------

export default function FolderUserSearch() {
  const [searchProducts, setSearchProducts] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = async (value) => {
    try {
      setSearchProducts(value);
      if (value) {
        const response = await getAllUsers({
          pageIndex: 1,
          pageSize: 5,
          searchByName: value,
        });
        console.log('handleChangeSearch', value, response.data.data);
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGotoProduct = (user) => {
    console.log('handleGotoProduct', user);
    dispatch(handleSearchUserRedux(user));
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleGotoProduct(searchProducts);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(user) => `${user.firstName} ${user.lastName}`}
      noOptionsText={<SearchNotFound query={searchProducts} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      componentsProps={{
        popper: {
          sx: {
            width: `280px !important`,
          },
        },
        paper: {
          sx: {
            '& .MuiAutocomplete-option': {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          width={220}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, user, { inputValue }) => {
        const { cover, gender, id, firstName, lastName } = user;
        const matches = match(`${firstName} ${lastName}`, inputValue);
        const parts = parse(`${firstName} ${lastName}`, matches);

        return (
          <li {...props}>
            <Avatar
              src={`http://lmms.site:7070/assets/images/avatars/avatar_${(1 - gender) * 10 + (id % 10) + 1}.jpg`}
            />

            <Link underline="none" onClick={() => handleGotoProduct(user)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
