const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const getRemoteValue = async () => {
  const ms = Math.trunc(Math.random() * 10)
  await wait(ms)
  return 100
}

export default async (line, bonus = '0') => {
  const remoteValue = await getRemoteValue()
  bonus = parseInt(bonus)
  return line.length + bonus + remoteValue
}
