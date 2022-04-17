export const isEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return regexEmail.test(email)

}
export const isValidPassword = (password) => {
  return password.length >= 6
}