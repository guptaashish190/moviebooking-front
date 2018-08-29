import { combineReducers } from 'redux';
import userLoginReducer from './UserLoginReducer';
import adminLoginReducer from './adminLoginReducer';

const CombinedReducers = combineReducers({
  userLoginReducer,
  adminLoginReducer,
});

export default CombinedReducers;
