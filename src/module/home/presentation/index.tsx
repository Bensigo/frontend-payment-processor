import { Box, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuth } from "../../../lib/shared/context/auth-provider";
import { createUserHook } from "../application/create-user.hook";
import { useWeb3Provider } from "../application/web3.hook";
import getProvider from "../domian/web3-provider";

import Hero from "./hero";

const Home = () => {
  const provider = getProvider();
  const mutation = createUserHook();
  const router = useRouter();
  const { setToken } = useAuth();
  const web3 = useWeb3Provider(provider);
  const onConnect = async () => {
    if (!web3) {
      return;
    }
    await provider.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    // // call api to find or create user
    console.log({ account });
    mutation.mutate(account);
    if (mutation.error) {
      console.log({ error: mutation.error });
    }
    if (mutation.isSuccess) {
      setToken(mutation.data.token);
      await router.push("dashboard");
    }
  };
  useEffect(() => {}, []);
  return (
    <Box>
      <Hero onConnect={onConnect} isLoading={mutation.isLoading} />
    </Box>
  );
};

export default Home;
