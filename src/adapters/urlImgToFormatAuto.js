export const urlImgToFormatAuto = (urlImg = "") => {
  const urlInit = "https://res.cloudinary.com/dapa84kxy/image/upload"
  if (!urlImg.startsWith(urlInit)) {
    return urlImg
  }

  const urlImgFormatAuto = urlImg.replace(urlInit, urlInit + "/f_auto")
  return urlImgFormatAuto
}