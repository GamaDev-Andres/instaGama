export const customFetch = async (url, method, body, withToken = true) => {

  try {
    const token = localStorage.getItem("token")
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    if (withToken) {
      headers.append("x-token", token)
    }
    if (!token && withToken) {
      throw new Error("no hay token en localStorage")
    }
    const optionsFetch = {
      method: method || "GET",
      body: JSON.stringify(body),
      headers
    }
    if (method === "GET") {
      delete optionsFetch.body
    }

    const response = await fetch(url, optionsFetch)
    const data = await response.json()
    return data


  } catch (error) {
    console.log("Error en peticion");
    console.error(error);
  }
}