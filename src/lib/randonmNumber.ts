// Generate a random number with Math.random()
export const getRandomNumber = (min: number, max: number): number => {
  const start = Math.ceil(min)
  const end = Math.floor(max)

  if (start > end) throw new Error("Invalid range: 'min' should be less than or equal to 'max'.")

  return Math.floor(Math.random() * (end - start + 1)) + start
}

// Generates a secure random number between min and max (inclusive) using the Web Crypto API
// Note: matematically, this method can introduce a slight bias if the range does not evenly divide into 2^32
export const getSecureRandomNumber = (min: number, max: number): number => {
  const range = max - min + 1
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return min + (array[0] % range)
}

// Generates a perfectly uniform secure random number between min and max (inclusive) using the Web Crypto API
// This method avoids modulo bias by rejecting values that fall within the "remainder"
export const getPerfectlySecureRandomNumber = (min: number = 0, max: number): number => {
  const range = max - min + 1
  const limit = Math.floor(4294967296 / range) * range // Higher multiple of 'range' below 2^32
  const array = new Uint32Array(1)

  let randomValue
  do {
    crypto.getRandomValues(array)
    randomValue = array[0]
  } while (randomValue >= limit) // If it falls in the "remainder", repeat the loop

  return min + (randomValue % range)
}
