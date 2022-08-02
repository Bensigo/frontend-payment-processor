import { useEffect, useState } from "react";
import Web3 from "web3";

export function useWeb3Provider(dectecedProvider: any) {
  const [provider, setProvider] = useState<Web3>();
  if (dectecedProvider !== window?.ethereum) {
    console.log("Etheruem not dectected in browser");
  }
  useEffect(() => {
    const getProvider = () => {
      return new Web3(dectecedProvider);
    };
    const currentProvider = getProvider();
    setProvider(currentProvider);
  }, []);

  return provider;
}
