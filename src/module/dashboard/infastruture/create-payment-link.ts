import {
  HttpMethod,
  useApiWrapper,
} from "../../../lib/shared/wrappers/use-query.wrapper";
import type { PaymentType } from "../presentation/components/create-payment-link";

async function createPaymentLinkApi(
  title: string,
  description: string,
  paymentType: PaymentType,
  amount?: number
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApiWrapper(
    "payment",
    { title, description, paymentType, amount },
    HttpMethod.POST
  );
}

export default createPaymentLinkApi;
