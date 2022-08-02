import { useMutation } from "react-query";

import deleteWallet from "../infastruture/delete-wallet";

function useDeleteAddressHook() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation((input: any) => {
    const { id } = input;
    return deleteWallet(id);
  });
}

export default useDeleteAddressHook;
