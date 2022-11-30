import {useState} from 'react';
// next
import {useRouter} from 'next/router';
// @mui
import {Box, Container, Divider, Pagination, Stack, Typography} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../../routes/paths';
// utils
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Markdown from '../../../../components/markdown';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import {useSettingsContext} from '../../../../components/settings';
import {SkeletonPostDetails} from '../../../../components/skeleton';
// sections
import {
    BlogPostCard,
    BlogPostCommentForm,
    BlogPostCommentList,
    BlogPostHero,
    BlogPostTags,
} from '../../../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

LevelLayout.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LevelLayout() {
    const { themeStretch } = useSettingsContext();

    const {
        query: { title },
    } = useRouter();

    const [recentPosts, setRecentPosts] = useState([]);

    const [post, setPost] = useState(null);

    const [loadingPost, setLoadingPost] = useState(true);

    const [error, setError] = useState(null);

    return (
        <>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Post Details"
                    links={[
                        {
                            name: 'Trang chủ',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Danh sách tài liệu',
                            href: PATH_DASHBOARD.blog.root,
                        },
                        {
                            name: post?.title,
                        },
                    ]}
                />
                <div>hihi</div>

            </Container>
        </>
    );
}
