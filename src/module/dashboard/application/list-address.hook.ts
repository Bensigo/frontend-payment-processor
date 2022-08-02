import { useQuery } from "react-query";
import listWallet from "../infastruture/list-wallet";

function useListWallet() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery("wallet", listWallet);
}

export default useListWallet;
