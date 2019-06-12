import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const devTools =   window.__REDUX_DEVTOOLS_EXTENSION__ && 
window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
  devTools
);

export default store;