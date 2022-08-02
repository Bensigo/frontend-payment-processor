import {
  HttpMethod,
  useApiWrapper,
} from "../../../lib/shared/wrappers/use-query.wrapper";

function getUser() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApiWrapper("user", {}, HttpMethod.GET);
}
export default getUser;
