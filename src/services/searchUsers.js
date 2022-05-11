import { customFetch } from './customFetch';

export const searchUsers = async (q) => {

  const url = import.meta.env.VITE_URL_SERVER;
  try {
    const urlPath = url + "/api/users?q=" + q
    const response = await customFetch(urlPath, "GET")
    if (response?.msg || response?.errors) {
      throw new Error(response?.msg || response?.errors[0]?.msg);
    }
    return response.usuarios
  } catch (error) {
    console.log(error);
  }

}