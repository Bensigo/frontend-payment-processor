import { useMutation } from "react-query";

import updateProfileApi from "../infastruture/update-user-profile";

function useUpdateUsernameHook() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation((input: any) => {
    const { username, description, country, industry } = input;
    return updateProfileApi(username, description, country, industry);
  });
}

export default useUpdateUsernameHook;
