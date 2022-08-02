import {
  HttpMethod,
  useApiWrapper,
} from "../../../lib/shared/wrappers/use-query.wrapper";

function listWallet() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApiWrapper("wallet", {}, HttpMethod.GET);
}
export default listWallet;
