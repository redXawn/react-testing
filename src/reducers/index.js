import { combineReducers } from 'redux'
import success from './successReducer'
import guessedWords from './guessedWordsReducer'
import secretWord from './secretWordReducer'
import display from './displayReducer'

export default combineReducers({
  success,
  guessedWords,
  secretWord,
  display
})