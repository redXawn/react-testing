import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from './utils'
import ResetButton, { UnconnectedResetButton } from './NewWordButton'

const setup = (state={}) => {
  const store = storeFactory(state)
  return shallow(<ResetButton store={store}/>).dive().dive()
}

describe('redux properties', () => {
  test('return button when success is true', () => {
    const wrapper = setup({display: true})
    const button = findByTestAttr(wrapper, 'reset-button')
    expect(button.length).toBe(1)
  })

  test('reset all state after button click', () => {
    const getSecretWordMock = jest.fn()
    const resetMock = jest.fn()
    const props = {
      getSecretWord: getSecretWordMock,
      resetWord: resetMock,
      display: true,
    }
    const wrapper = shallow(<UnconnectedResetButton {...props} />)
    const button = findByTestAttr(wrapper, 'reset-button')
    button.simulate('click')
    const resetMockCallCount = resetMock.mock.calls.length
    expect(resetMockCallCount).toBe(1)
  })
})