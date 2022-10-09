import { Stack } from '@material-ui/core';
import React from 'react'
import { useTranslation } from 'react-i18next';
import AdminAppBar from '../components/AdminAppBar'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AdminToolbar from '../components/AdminToolbar';

interface LinkTabProps {
    label?: string;
    href?: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}


const ClassDetail = () => {
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>

            <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                mt={2}

            >

                <Box sx={{
                    width: '100%',
                    height: 186,
                    backgroundColor: 'primary.dark',
                }}
                    className="rounded"
                >
                    <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" centered>
                        <LinkTab label="Page One" href="/drafts" />
                        <LinkTab label="Page Two" href="/trash" />
                        <LinkTab label="Page Three" href="/spam" />
                    </Tabs>
                </Box>
            </Stack >


        </React.Fragment >
    )
}

export default ClassDetail