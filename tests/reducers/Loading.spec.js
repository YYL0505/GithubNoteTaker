import React from 'react-native';
import { assert } from 'chai';

import LoadingReducer from '../../App/reducers/loading'

import { createStore } from 'redux';
const store = createStore(LoadingReducer);

describe('loading reducer', () => {
    it('should return true after dispatch the toggle loading on action', () => {
      const action = {
        type: 'TOGGLE_LOADING_ON'
      };
      
      const expected = {
        isLoading: true
      };
      
      store.dispatch(action);
      const actual = store.getState();
      assert(actual, expected);
    });
  
    it('should return false after dispatch the toggle loading off action', () => {
      const action = {
        type: 'TOGGLE_LOADING_OFF'
      };
      
      const expected = {
        isLoading: false
      };
      
      store.dispatch(action);
      const actual = store.getState();
      assert(actual, expected);
    });
});