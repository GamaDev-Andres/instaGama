import { customFetch } from './customFetch';

export const toogleFollow = async (uid) => {

  const url = import.meta.env.VITE_URL_SERVER;
  try {
    const urlPath = url + "/api/users/follow/" + uid
    const response = await customFetch(urlPath, "POST")
    if (response?.msg || response?.errors) {
      throw new Error(response?.msg || response?.errors[0]?.msg);
    }
    return response
  } catch (error) {
    console.log(error);
  }

}