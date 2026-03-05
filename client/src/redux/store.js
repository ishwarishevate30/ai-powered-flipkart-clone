import { createStore , combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { getProductsReducer } from './reducers/productReducer';
import { getProductDetailsReducer } from './reducers/productReducer';
import {cartReducer} from './reducers/cartReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
    // Updated key to match expected state structure
    products: getProductsReducer,
    getProductDetails: getProductDetailsReducer, 
    cart : cartReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'], // Only persist the cart state
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore
 (persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));

export const persistor = persistStore(store);

export default store;
