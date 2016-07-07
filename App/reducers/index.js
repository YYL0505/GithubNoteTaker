import { combineReducers } from 'redux'
import note from './note'
import user from './user'

const reducers = combineReducers({
  note,
  user
});

export default reducers
