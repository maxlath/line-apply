module.exports = {
  uppercase: line => line.toUpperCase(),
  lowercaseAsync: async line => line.toLowerCase(),
  bonus: (line, bonus = '1') => {
    bonus = parseInt(bonus)
    return line.length + bonus
  }
}
