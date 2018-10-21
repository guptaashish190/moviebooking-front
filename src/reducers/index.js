import { combineReducers } from 'redux';
import userLoginReducer from './UserLoginReducer';
import adminLoginReducer from './adminLoginReducer';
import theatresReducer from './theatresReducer';
import generalReducer from './generalReducer';

const CombinedReducers = combineReducers({
  userLoginReducer,
  adminLoginReducer,
  theatresReducer,
  generalReducer,
});

export default CombinedReducers;
