import * as Sentry from '@sentry/react';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppRoutes from './AppRoutes';


if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
  });
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});

function App() {

  return (
    <React.Suspense fallback={null}>
      <Sentry.ErrorBoundary>
        <QueryClientProvider client={queryClient}>
                  <AppRoutes />
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </React.Suspense>
  );
}

export default App;
