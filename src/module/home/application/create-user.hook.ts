import { useMutation } from "react-query";

import createUser from "../infastruture/auth-user";

export function createUserHook() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation((input: any) => {
    return createUser(input);
  });
}
