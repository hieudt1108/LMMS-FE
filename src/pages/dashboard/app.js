// next
import Head from 'next/head';
// @mui
import {alpha, styled, useTheme} from '@mui/material/styles';
import {Container, Grid, Stack, Button, Typography} from '@mui/material';
// auth
import {useAuthContext} from '../../auth/useAuthContext';
// layouts
import { m } from 'framer-motion';
import DashboardLayout from '../../layouts/dashboard';
// _mock_
import {_appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices} from '../../_mock/arrays';
// components
import {useSettingsContext} from '../../components/settings';
// sections
import {
    AppWidget,
    AppWelcome,
    AppFeatured,
    AppNewInvoice,
    AppTopAuthors,
    AppTopRelated,
    AppAreaInstalled,
    AppWidgetSummary,
    AppCurrentDownload,
    AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import {MotivationIllustration, SeoIllustration} from '../../assets/illustrations';
import Image from "../../components/image";
import AppInformation from "../../sections/@dashboard/general/app/AppInformation";
import {MotionContainer, varFade} from "../../components/animate";
import useResponsive from "../../hooks/useResponsive";
import {bgGradient} from "../../utils/cssStyles";

// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(10, 0),
}));

const StyledBg = styled('div')(({ theme }) => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    borderRadius: Number(theme.shape.borderRadius) * 2,
    position: 'absolute',
    transform: 'scaleX(-1)',
    ...bgGradient({
        color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
        imgUrl: '/assets/background/overlay_2.jpg',
    }),
}));

export default function GeneralAppPage() {
    const {user} = useAuthContext();

    const theme = useTheme();

    const {themeStretch} = useSettingsContext();
    const isDesktop = useResponsive('up', 'sm');
    return (
        <>
            <Head>
                <title> Hệ thống quản lý Học liệu</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <AppWelcome
                            title={`Chào mừng đến với hệ thống quản lý học liệu`}
                            description={`${user.firstName} ${user.lastName}`}
                            img={
                                <SeoIllustration
                                    sx={{
                                        p: 3,
                                        width: 360,
                                        margin: {xs: 'auto', md: 'inherit'},
                                    }}
                                />
                            }
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <AppFeatured list={_appFeatured}/>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledRoot>
                            <Container
                                component={MotionContainer}
                                sx={{
                                    display: { md: 'flex' },
                                    justifyContent: { md: 'space-between' },
                                }}
                            >
                                <Stack sx={{mt:10,mb:5}}>
                                    <m.div variants={varFade().inUp}>
                                        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            Hệ thống quản lí dạy và học tích hợp
                                            <br />với hệ sinh thái học liệu số mang lại tiện ích đầy đủ.

                                        </Typography>
                                    </m.div>
                                </Stack>

                                {isDesktop && (
                                    <m.div variants={varFade().inDown}>
                                        <Image
                                            disabledEffect
                                            alt="hero"
                                            src="/assets/illustrations/characters/character_7.png"
                                            sx={{ maxWidth: 320 }}
                                        />
                                    </m.div>
                                )}
                            </Container>

                            <StyledBg />
                        </StyledRoot>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
