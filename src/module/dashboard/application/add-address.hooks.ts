import { useMutation } from "react-query";

import addAddress from "../infastruture/add-address";

function useAddAddressHook() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation((input: any) => {
    const { address, network } = input;
    return addAddress(address, network);
  });
}

export default useAddAddressHook;