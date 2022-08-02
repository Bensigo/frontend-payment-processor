import { useQuery } from "react-query";

import listPaymentLinkApi from "../infastruture/list-payment-link";

function useListPaymentLink(page: number, size: number) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery("payment", () => listPaymentLinkApi(page, size));
}

export default useListPaymentLink;
