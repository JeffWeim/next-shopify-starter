import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

const initialState = {
  persistLoaded: false,
}

// REDUCERS
// eslint-disable-next-line
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }
    case 'SET_CHECKOUT_ID':
      return { ...state, checkoutId: action.id }
    case 'SET_CUSTOMER_ACCESS_TOKEN':
      return { ...state, customerAccessToken: action.token }
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        openDrawer: action.key === state.openDrawer ? null : action.key,
      }
    case 'persist/REHYDRATE':
      return { ...state, persistLoaded: true }
    default:
      return state
  }
}

// ACTIONS
export const setCheckoutId = id => dispatch =>
  dispatch({ type: 'SET_CHECKOUT_ID', id })

export const setCustomerAccessToken = token => dispatch =>
  dispatch({ type: 'SET_CUSTOMER_ACCESS_TOKEN', token })

export const toggleDrawer = key => dispatch =>
  // MENU = mobile menu
  // CART = mini cart
  dispatch({ type: 'TOGGLE_DRAWER', key })

// STORE
export const makeStore = context => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    return createStore(
      reducer,
      composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)),
    )
  }

  const persistConfig = {
    key: 'nextjs',
    whitelist: ['checkoutId', 'customerAccessToken'], // only these keys will be persisted
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, reducer)

  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)),
  )

  store.__persistor = persistStore(store)

  return store
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true })
