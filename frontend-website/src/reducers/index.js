import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import loggedInUser from './loggedInUserReducer';
import {routerReducer} from 'react-router-redux';

//The combineReducers helper function 
//turns an object whose values are different reducing functions into
// a single reducing function you can pass to createStore

//The resulting reducer calls every child reducer, and gathers their results into a single state object. 
//!!!Important!!!
//The shape of the state object matches the keys of the passed reducers.
const rootReducer = combineReducers({
  fuelSavings,
  loggedInUser,
  routing: routerReducer
});

export default rootReducer;
