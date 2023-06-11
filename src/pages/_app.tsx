import { type AppType, type AppProps } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

import { trpc } from '~/utils/trpc';

import { Transition } from '~/components/layouts/transition';

import '~/styles/globals.css';
import 'react-awesome-slider/dist/styles.css';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    session: Session | null;
  };
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <>
        <Transition />
        {page}
      </>
    ));
  const layout = getLayout(<Component {...pageProps} />) as JSX.Element;

  return (
    <SessionProvider session={session}>
      <ReactQueryDevtools />
      {layout}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
