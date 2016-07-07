import { combineReducers } from 'redux'
import note from './note'
import user from './user'
import loading from './loading'

const reducers = combineReducers({
  note,
  user,
  loading
});

export default reducers
