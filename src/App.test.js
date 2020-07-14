import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from './utils'
import App, { UnconnectedApp } from './App'

const setup = (state={}) => {
  const store = storeFactory(state)
  return shallow(<App store={store}/>).dive().dive()
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'app-container')
  expect(component.length).toBe(1)
})

describe('redux properties', () => {
  test('has access to success state', () => {
    const success = true
    const wrapper = setup({ success })
    const successProp = wrapper.instance().props.success
    expect(successProp).toBe(success)
  })

  test('has access to secretWord state', () => {
    const secretWord = 'party'
    const wrapper = setup({ secretWord })
    const secretWordProp = wrapper.instance().props.secretWord
    expect(secretWordProp).toBe(secretWord)
  })

  test('has access to guessedWords state', () => {
    const guessedWords = [
      { guessedWord: 'train', letterMatchCount: 3}
    ]
    const wrapper = setup({ guessedWords })
    const guessedWordsProp = wrapper.instance().props.guessedWords
    expect(guessedWordsProp).toBe(guessedWords)
  })

  test('getSecretWord action creator is a function on the props', () => {
    const wrapper = setup()
    const getSecretWordProp = wrapper.instance().props.getSecretWord
    expect(getSecretWordProp).toBeInstanceOf(Function)
  })

  test('getSecretWord run on app mount', () => {
    const getSecretWordMock = jest.fn()
    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: []
    }
    // set up app component with getSecretWordMock as the getSecretWord prop
    const wrapper = shallow(<UnconnectedApp {...props} />)

    // run lifecycle method
    wrapper.instance().componentDidMount()

    // check to see if mock ran
    const getSecretWordCallCount = getSecretWordMock.mock.calls.length
    expect(getSecretWordCallCount).toBe(1)
  })

  test('gueesedWords length show', () => {
    const guessedWords = [
      { guessedWord: 'train', letterMatchCount: 3}
    ]
    const wrapper = setup({ guessedWords })
    const guessLength = findByTestAttr(wrapper, 'app-guess-length')
    expect(guessLength.text()).toContain(guessedWords.length)
  })
})