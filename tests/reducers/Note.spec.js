import React from 'react-native';
import {ListView} from 'react-native';
import { assert } from 'chai';

import note from '../../App/reducers/note'

import { createStore } from 'redux';
const store = createStore(note);

describe('note reducer', () => {
    it('should set note correctly and clear note when the note is empty', () => {
      const noteText = 'this is my first note.';
      var action = {
        type: 'SET_NOTE',
        note: noteText
      };    
      store.dispatch(action);
      const actual = store.getState();
      assert.propertyVal(actual, 'note', noteText);
      
      const emptyText = '';
      action = {
        type: 'SET_NOTE',
        note: emptyText
      };
      store.dispatch(action);
      const emptyActual = store.getState();
      
      assert.propertyVal(emptyActual, 'note', emptyText);
    });
  
  it('should fetch notes', () => {
    var notes = [
      {text: 'this is first note.'},
      {text: 'this is second note.'},
      {text: 'this is third note.'}
    ];
    var userInfo = {
      avatar_url: 'https://test.com',
      name: 'user name',
      login: 'uaername'
    };
    var action = {
        type: 'FETCH_NOTES',
        notes: notes,
        userInfo: userInfo
    }
    
    store.dispatch(action);
    var actual = store.getState();
    
    assert.propertyVal(actual.userInfo, 'name', 'user name');
    assert.lengthOf(actual.notes, 3);
    assert.propertyVal(actual, 'notes', notes);
  });
});