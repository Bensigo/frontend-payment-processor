import {
  HttpMethod,
  useApiWrapper,
} from "../../../lib/shared/wrappers/use-query.wrapper";

function deleteWallet(id: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApiWrapper(`wallet/${id}`, {}, HttpMethod.DELETE);
}
export default deleteWallet;
