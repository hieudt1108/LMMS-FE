import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemText, ListItem } from '@mui/material';

// project import


// utils


// assets
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from "@mui/material/IconButton";
import React from "react";

// ==============================|| MULTI UPLOAD - PREVIEW ||============================== //

export default function FilesPreview({ showList = false, files, onRemove }) {
  const theme = useTheme();
  const hasFile = files.length > 0;

  return (
    <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
      {files.map((file, index) => {
        if (showList) {
          return (
            <ListItem
              sx={{
                p: 0,
                m: 0.5,
                width: 80,
                height: 80,
                borderRadius: 1.25,
                position: 'relative',
                display: 'inline-flex',
                verticalAlign: 'text-top',
                border: `solid 1px ${theme.palette.divider}`
              }}
            >

              {onRemove && (
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => onRemove(file)}
                  sx={{
                    top: -10,
                    right: -10,
                    position: 'absolute'
                  }}
                >
                  <CancelOutlinedIcon style={{ fontSize: '1.15rem' }} />
                </IconButton>
              )}
            </ListItem>
          );
        }

        return (
          <ListItem
            sx={{
              my: 1,
              px: 2,
              py: 0.75,
              borderRadius: 0.75,
              border: (theme) => `solid 1px ${theme.palette.divider}`
            }}
          >
            <FileCopyIcon style={{ width: '30px', height: '30px', fontSize: '1.15rem', marginRight: 4 }} />

            <ListItemText
              primary={typeof file === 'string'}
              secondary={typeof file === 'string'}
              primaryTypographyProps={{ variant: 'subtitle2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />

            {onRemove && (
              <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
                <CancelOutlinedIcon style={{ fontSize: '1.15rem' }} />
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}

FilesPreview.propTypes = {
  showList: PropTypes.bool,
  files: PropTypes.array,
  onRemove: PropTypes.func
};
