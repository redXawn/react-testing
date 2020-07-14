import {storeFactory} from './utils'
import { guessWord } from './actions'

describe('guessWord action dispatcher', () => {
  const secretWord = 'party'
  const wrongWord = 'train'
  describe('no guess words', () => {
    let store
    // pass reducer => make sure the name is same with the index reducer export
    const initialState = { secretWord }
    beforeEach(() => {
      store = storeFactory(initialState)
    })
    test('update state correctly for wrong guess', () => {
      store.dispatch(guessWord(wrongWord))
      const newState = store.getState()
      const expectedState = {
        ...initialState,
        display: false,
        success: false,
        guessedWords: [{
          guessedWord: wrongWord,
          letterMatchCount: 3
        }]
      }
      expect(newState).toEqual(expectedState)
    })
    test('update state correctly for correct guess', () => {
      store.dispatch(guessWord(secretWord))
      const newState = store.getState()
      const expectedState = {
        secretWord,
        display: true,
        success: true,
        guessedWords: [{
          guessedWord: secretWord,
          letterMatchCount: 5
        }]
      }
      expect(newState).toEqual(expectedState)
    })
  })

  describe('some guessed words', () => {
    const guessedWords = [{ guessedWord: 'agile', letterMatchCount: 1}]
    const initialState = { guessedWords, secretWord }
    let store
    beforeEach(() => {
      store = storeFactory(initialState)
    })
    test('update state correctly for wrong guess', () => {
      store.dispatch(guessWord(wrongWord))
      const newState = store.getState()
      const expectedState = {
        secretWord,
        display: false,
        success: false,
        guessedWords: [
          ...guessedWords,
          {
          guessedWord: wrongWord,
          letterMatchCount: 3
        }]
      }
      expect(newState).toEqual(expectedState)
    })
    test('update state correctly for correct guess', () => {
      store.dispatch(guessWord(secretWord))
      const newState = store.getState()
      const expectedState = {
        secretWord,
        display: true,
        success: true,
        guessedWords: [
          ...guessedWords,
          {
          guessedWord: secretWord,
          letterMatchCount: 5
        }]
      }
      expect(newState).toEqual(expectedState)
    })
  })
})