import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './combineReducers';

const persistConfig = {
    key: 'reducer',
    storage: storage,
    whiteList: ['category', 'basketed', 'like']
};

const persistReducerMain = persistReducer(persistConfig, rootReducer);
const store = createStore(persistReducerMain);
const persistor = persistStore(store)

export { store, persistor };