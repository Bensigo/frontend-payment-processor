import {HttpMethod, useApiWrapper} from "../../../lib/shared/wrappers/use-query.wrapper";

async function createUser(address: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApiWrapper("user", { address }, HttpMethod.POST);
}
export default createUser;
