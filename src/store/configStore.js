import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import AsyncStorage from '@react-native-community/async-storage'



// const seachParamTransform = createTransform(
//     // transform state on its way to being serialized and persisted.

//     (inboundState, key) => {
//         if (key != 'order') return inboundState
//         const {  ...restOrder } = inboundState
//         return restOrder
//     },
//     // transform state being rehydrated
//     (outboundState, key) => {
//         return outboundState
//     },
// )

// const migrations = {
//     0: (state) => {
//         // migration clear out device state
//         console.log('clear out device state', state)
//         return {
//             ...state,
//             setting: undefined
//         }
//     },
// }
// migrate: createMigrate(migrations, { debug: true })

const persistConfig = {
    key: 'root',
    version: 4,
    storage: AsyncStorage,
    // blacklist: ['info'],
    // transforms: [seachParamTransform],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()
let middleware = [sagaMiddleware];
if (__DEV__) {
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}



const store = createStore(
    persistedReducer,
    {},
    applyMiddleware(...middleware)
)
sagaMiddleware.run(rootSaga)
const persistor = persistStore(store)
export { store, persistor }