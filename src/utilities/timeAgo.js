const unidades = {
  week: 86400 * 7,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}
export const timeAgo = (timeInms, idiom) => {
  const rtf = new Intl.RelativeTimeFormat(idiom)

  const secondsElapsed = secondsDiff(timeInms)
  const { value, unit } = getUnitAndValueDate(secondsElapsed)
  return rtf.format(value, unit)
}

const secondsDiff = (timeInms) => {
  return (Date.now() - timeInms) / 1000
}
const getUnitAndValueDate = (seconds) => {
  for (const [unit, secondsInUnit] of Object.entries(unidades)) {

    const match = seconds >= secondsInUnit || unit === "second"
    if (match) {
      const value = Math.floor(seconds / unidades[unit]) * -1
      return { value, unit }
    }

  }
}