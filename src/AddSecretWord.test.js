import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from './utils'
import AddSecretWordComponent, { AddSecretWord } from './AddSecretWord'
import { setSecretWord } from './actions'
import store from './store'

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  const wrapper = shallow(<AddSecretWordComponent store={store}/>).dive().dive()
  return wrapper
}

describe('test add secret word component', () => {
  test('render button', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'toggle-button')
    expect(component.length).toBe(1)
  })

  describe('test when toggle button already click', () => {
    let setSecretWordMock
    let wrapper
    beforeEach(() => {
      setSecretWordMock = jest.fn()
      const props = {
        setSecretWord: setSecretWordMock,
        guessedWords: []
      }
      // set up app component with setSecretWordMock as the setSecretWord prop
      wrapper = shallow(<AddSecretWord {...props} />)
      const button = findByTestAttr(wrapper, 'toggle-button')
      button.simulate('click')
    })
    test('render input', () => {
      const component = findByTestAttr(wrapper, 'input-secret')
      expect(component.length).toBe(1)
    })

    describe('submit new secret word', () => {
      let secretWord
      beforeEach(() => {
        secretWord = 'tes'
        wrapper.setState({ word: secretWord })
        const submit = findByTestAttr(wrapper, 'submit-button')
        submit.simulate('click')
        store.dispatch(setSecretWord(secretWord))
      })
      test('check state toggle', () => {
        expect(wrapper.state('toggleButton')).toBe(false)
      })

      test('check function setSecretWord call', () => {
        const setSecretWordCallCount = setSecretWordMock.mock.calls.length
        expect(setSecretWordCallCount).toBe(1)
      })

      test('check new secret word', () => {
        const word = setSecretWordMock.mock.calls[0][0]
        expect(word).toBe(secretWord)
      })
    })
  })
})