import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from './utils'
import Input, { UnconnectInput } from './input'

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  const wrapper = shallow(<Input store={store}/>).dive().dive()
  return wrapper
}

setup()

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper

    beforeEach(() => {
      const initialState = { success: false, display: false, guessedWords: [] }
      wrapper = setup(initialState)
    })

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1)
    })

    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.length).toBe(1)
    })

    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.length).toBe(1)
    })

    test('renders give up button', () => {
      const giveupButton = findByTestAttr(wrapper, 'giveup-button')
      expect(giveupButton.length).toBe(0)
    })
  })
  describe('word has been guessed', () => {
    let wrapper

    beforeEach(() => {
      const initialState = { 
        success: true ,
        guessedWords: [
          { guessedWord: 'train', letterMatchCount: 3}
        ]
      }
      wrapper = setup(initialState)
    })
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1)
    })

    test('does not renders input box', () => {
      const component = findByTestAttr(wrapper, 'input-box')
      expect(component.length).toBe(0)
    })

    test('does not renders submit button', () => {
      const component = findByTestAttr(wrapper, 'submit-button')
      expect(component.length).toBe(0)
    })
  })

  describe('given up', () => {
    test('render give up button', () => {
      const initialState = {
        success: false,
        display: false,
        guessedWords: [
          { guessedWord: 'train', letterMatchCount: 3}
        ]
      }
      const wrapper = setup(initialState)
      const component = findByTestAttr(wrapper, 'giveup-button')
      expect(component.length).toBe(1)
    })

    test('secret word expose when give up', () => {
      const initialState = { display: true }
      const wrapper = setup(initialState)
      const component = findByTestAttr(wrapper, 'giveup-text')
      expect(component.length).toBe(1)
    })

    test('click button give up', () => {
      const giveUpMock = jest.fn()
      const props = {
        giveUp: giveUpMock,
        success: false,
        display: false,
        guessedWords: [
          { guessedWord: 'train', letterMatchCount: 3}
        ]
      }
      const wrapper = shallow(<UnconnectInput {...props} />)
      const button = findByTestAttr(wrapper, 'giveup-button')
      button.simulate('click', { preventDefault() {} })
      const giveupCallCount = giveUpMock.mock.calls.length
      expect(giveupCallCount).toBe(1)
    })
  })
})

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true
    const wrapper = setup({success})
    const successProp = wrapper.instance().props.success
    expect(successProp).toBe(success)
  })
  test('guessWord action creator is a function prop', () => {
    const wrapper = setup()
    const guessWordProp = wrapper.instance().props.guessWord
    expect(guessWordProp).toBeInstanceOf(Function)
  })
})

describe('guessword action call', () => {
  let guessWordMock
  let wrapper
  const guessedWord = 'train'
  beforeEach(() => {
    guessWordMock = jest.fn()
    const props = {
      guessWord: guessWordMock,
      guessedWords: []
    }
    // set up app component with guessWordMock as the guessWord prop
    wrapper = shallow(<UnconnectInput {...props} />)

    // add value to input box
    wrapper.setState({ currentGuess: guessedWord })
    // simulate click
    const button = findByTestAttr(wrapper, 'submit-button')
    button.simulate('click', { preventDefault() {} })
  })
  
  test('guessWord action called when click button', () => {
    // check to see if mock ran
    const guessWordCallCount = guessWordMock.mock.calls.length
    expect(guessWordCallCount).toBe(1)
  })

  test('calls gueesWord with input value as argument', () => {
    const word = guessWordMock.mock.calls[0][0]
    expect(word).toBe(guessedWord)
  })

  test('input box clears on submit', () => {
    expect(wrapper.state('currentGuess')).toBe('')
  })
})