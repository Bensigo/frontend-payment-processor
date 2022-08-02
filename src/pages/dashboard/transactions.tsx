import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuth } from "../../lib/shared/context/auth-provider";

const Transactions = dynamic(
  () => import("module/dashboard/presentation/transactions"),
  {
    ssr: false,
  }
);

export default () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, []);
  return (
    <Box>
      <Transactions />
    </Box>
  );
};
