export function getLetterMatchCount(word, secretWord) {
  const secretLetterSet = new Set(secretWord.split(''))
  const guessedLetterSet = new Set(word.split(''))

  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter)).length
}