import React from 'react-native';
import {ListView} from 'react-native';
import { assert } from 'chai';

import user from '../../App/reducers/user'

import { createStore } from 'redux';
const store = createStore(user);

describe('user reducer', () => {
    it('should set username correctly and clear username when the username is empty', () => {
      var username = 'user name';
      var action = {
        type: 'UPDATE_USERNAME',
        username: username
      };    
      store.dispatch(action);
      var actual = store.getState();
      assert.propertyVal(actual, 'username', username);
      
      var emptyUsername = '';
      action = {
        type: 'UPDATE_USERNAME',
        username: emptyUsername
      };
      store.dispatch(action);
      var emptyActual = store.getState();
      
      assert.propertyVal(emptyActual, 'username', emptyUsername);
    });
  
  it('should fetch user and clear username', () => {
    var userInfo = {
      avatar_url: 'https://test.com',
      name: 'user name',
      login: 'uaername'
    };
    var action = {
        type: 'FETCH_USER',
        userInfo: userInfo
    }
    
    store.dispatch(action);
    var actual = store.getState();
    
    assert.propertyVal(actual, 'username', '');
    assert.isNotOk(actual.error);
    assert.propertyVal(actual, 'userInfo', userInfo);
  });
});