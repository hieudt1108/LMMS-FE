// next
import React, {useEffect, useState} from 'react';
import {useSettingsContext} from '../../../components/settings';
import {Box, Container, Stack,} from '@mui/material';
import DashboardLayout from '../../../layouts/dashboard';
import Head from 'next/head';
import {useDispatch} from 'react-redux';
import ProgramSliderCards from "../../../sections/@dashboard/program/ProgramSliderCards";
import {getAllProgram} from "../../../dataProvider/agent";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";

Program.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


export default function Program() {
    const dispatch = useDispatch();
    const {themeStretch} = useSettingsContext();
    const [listPrograms, setListPrograms] = useState([]);

    useEffect(() => {
        fetchPrograms();
    }, []);

    async function fetchPrograms() {
        const res = await getAllProgram({pageIndex : 1,pageSize: 100});
        if (res.status < 400) {
            setListPrograms(res.data.data);
        } else {
            console.log('error');
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title> Hệ thống quản lý học liệu</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <CustomBreadcrumbs
                    heading="Chương trình học"
                    links={[
                        {
                            name: 'Trang chủ',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Chương trình học',
                            href: PATH_DASHBOARD.program.choose,
                        },
                    ]}
                />
                <Box
                    gap={3}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    }}
                >
                    {listPrograms.map((item) => (
                        <ProgramSliderCards
                            title={item.name}
                            description={item.description}
                            img="/assets/illustrations/characters/character_11.png"
                        />
                    ))}
                </Box>

            </Container>
        </React.Fragment>
    );
}

