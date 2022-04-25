import { customFetch } from './customFetch';

export const getOnePost = async (idPost) => {
  const url = import.meta.env.VITE_URL_SERVER;

  try {
    const urlPeticion = `${url}/api/post/${idPost}`
    const response = await customFetch(urlPeticion, "GET")
    if (response?.msg || response?.errors) {
      throw new Error(response?.msg || response?.errors[0]?.msg);
    }
    return response
  } catch (error) {
    console.log(error);
  }
}