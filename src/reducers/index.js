import { combineReducers } from 'redux';
import userLoginReducer from './UserLoginReducer';
import adminLoginReducer from './adminLoginReducer';
import theatresReducer from './theatresReducer';

const CombinedReducers = combineReducers({
  userLoginReducer,
  adminLoginReducer,
  theatresReducer,
});

export default CombinedReducers;
