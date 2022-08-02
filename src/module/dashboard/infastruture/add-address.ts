import {
  HttpMethod,
  useApiWrapper,
} from "../../../lib/shared/wrappers/use-query.wrapper";

async function addAddress(address: string, network: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApiWrapper("wallet", { address, network }, HttpMethod.POST);
}
export default addAddress;
