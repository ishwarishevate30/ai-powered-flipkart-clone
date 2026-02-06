import { createStore , combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { getProductsReducer } from './reducers/productReducer';
import { getProductDetailsReducer } from './reducers/productReducer';

const reducer = combineReducers({
    // Updated key to match expected state structure
    products: getProductsReducer,
    getProductDetails: getProductDetailsReducer
});

const middleware = [thunk];

const store = createStore
 (reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
