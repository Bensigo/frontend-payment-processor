import { useMutation } from "react-query";

import createPaymentLinkApi from "../infastruture/create-payment-link";

function useCreatePaymentLinkHook() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation((input: any) => {
    const { description, title, paymentType, amount } = input;
    return createPaymentLinkApi(title, description, paymentType, amount);
  });
}

export default useCreatePaymentLinkHook;
