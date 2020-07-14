import moxios from 'moxios'

import { storeFactory } from '../utils'
import { correctGuess, actionTypes, getSecretWord, resetWord, giveUp } from './index'

describe('correctGuess', () => {
  test('returns an action with type `CORRECT_GUESS', () => {
    const action = correctGuess()
    expect(action).toEqual({type: actionTypes.CORRECT_GUESS})
  })
})

describe('get secret word action creator', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('add respond word to state', () => {
    const secretWord = 'party'
    const store = storeFactory()
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: secretWord
      })
    })
    return store.dispatch(getSecretWord())
    .then(() => {
      const newState = store.getState()
      expect(newState.secretWord).toBe(secretWord)
    })
  })

  test('test error response', () => {
    const store = storeFactory()
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 401,
        response: 'unauthorized'
      })
    })
    return store.dispatch(getSecretWord())
    .then(() => {
      const newState = store.getState()
      expect(newState.secretWord).toBe('error found')
    })
  })
})