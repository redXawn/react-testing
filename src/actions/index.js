import axios from 'axios'

import { getLetterMatchCount } from '../helpers'

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  RESET_WORD: 'RESET_WORD',
  DISPLAY_TRUE: 'DISPLAY_TRUE',
  DISPLAY_FALSE: 'DISPLAY_FALSE'
}

export function correctGuess() {
  return { type: actionTypes.CORRECT_GUESS}
}

export const resetWord = () => {
  return function(dispatch) {
    dispatch({ type: actionTypes.DISPLAY_FALSE })
    dispatch({ type: actionTypes.RESET_WORD })
  }
}

export const giveUp = () => {
  return function(dispatch) {
    dispatch({ type: actionTypes.DISPLAY_TRUE })
  }
}

export const guessWord = (guessedWord) => {
  return function(dispatch, getState) {
    const secretWord = getState().secretWord
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord)
    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount }
    })
    if (guessedWord === secretWord) {
      dispatch({ type: actionTypes.DISPLAY_TRUE })
      dispatch({ type: actionTypes.CORRECT_GUESS })
    }
  }
}

export const getSecretWord = () => {
  return (dispatch) => {
    return axios.get('https://random-word-api.herokuapp.com/word?number=1')
    .then(response => {
      if (response.data === 'party') {
        dispatch({
          type: actionTypes.SET_SECRET_WORD,
          payload: response.data
        })
      } else {
        const word = response.data[0]
        dispatch({
          type: actionTypes.SET_SECRET_WORD,
          payload: word
        })
      }
    })
    .catch(error => {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: 'error found'
      })
    })
  }
}

export const setSecretWord = (secretWord) => {
  return function(dispatch) {
    dispatch({
      type: actionTypes.SET_SECRET_WORD,
      payload: secretWord
    })
  }
}