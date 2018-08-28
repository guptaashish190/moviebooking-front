import { combineReducers } from 'redux';
import userLoginReducer from './UserLoginReducer';

const CombinedReducers = combineReducers({
  userLoginReducer,
});

export default CombinedReducers;
