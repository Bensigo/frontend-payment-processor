import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import Layout from "../lib/layout";

const Home = dynamic(() => import("module/home/presentation"), {
  ssr: false,
});
export default () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};
