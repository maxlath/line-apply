export default function (line, bonus = '1') {
  bonus = parseInt(bonus)
  return line.length + bonus
}

export function bonus (line, bonus = '1') {
  bonus = parseInt(bonus)
  return line.length + bonus
}

export async function bonusAsync (line, bonus = '1') {
  bonus = parseInt(bonus)
  return line.length + bonus
}
