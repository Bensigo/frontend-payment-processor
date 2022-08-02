import {
  HttpMethod,
  useApiWrapper,
} from "../../../lib/shared/wrappers/use-query.wrapper";

async function updateProfileApi(
  username: string,
  description: string,
  country: string,
  industry: string
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApiWrapper(
    "user",
    { username, description, country, industry },
    HttpMethod.PATCH
  );
}

export default updateProfileApi;
