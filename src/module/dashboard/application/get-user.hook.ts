import { useQuery } from "react-query";

import getUser from "../infastruture/get-user";

function getUserHook() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery("user", getUser);
}

export default getUserHook;