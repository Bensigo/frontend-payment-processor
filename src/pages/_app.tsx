/* eslint-disable react/jsx-props-no-spreading */
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";

import defaultSEOConfig from "../../next-seo.config";
import { Chakra } from "lib/components/Chakra";
import Layout from "lib/layout";

import "lib/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "../lib/shared/context/auth-provider";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Chakra>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </Chakra>
  );
};

export default MyApp;
