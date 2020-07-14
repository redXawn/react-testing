import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { middlewares } from './store'

export const storeFactory =(initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  return createStoreWithMiddleware(rootReducer, initialState)
}

export const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`)
}