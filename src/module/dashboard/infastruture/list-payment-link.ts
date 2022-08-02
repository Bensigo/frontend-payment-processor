import {
  HttpMethod,
  useApiWrapper,
} from "../../../lib/shared/wrappers/use-query.wrapper";

function listPaymentLinkApi(page: number, size: number) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApiWrapper("payment", {}, HttpMethod.GET, {
    page,
    size,
    isActive: true,
  });
}
export default listPaymentLinkApi;
