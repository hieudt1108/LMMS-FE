import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';
// routes

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.documents.root) {
      push(PATH_DASHBOARD.documents.posts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
