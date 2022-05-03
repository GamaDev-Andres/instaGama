import { customFetch } from './customFetch';

export const confirmPassword = async (password) => {
  const url = import.meta.env.VITE_URL_SERVER;
  try {
    const urlPeticion = url + "/api/users/confirmPassword"
    const res = await customFetch(urlPeticion, "POST", { password })
    if (res.ok) {
      return true
    }
    return false
  } catch (error) {
    console.log(error);
  }
}