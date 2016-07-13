import React, { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AddNote from '../../App/containers/AddNote';

const mockStore = configureMockStore([ thunk ]);
const storeStateMock = {
  default: {
    note: {
      note: ''
    }
  }
};

let store;

describe('add note', () => {
   store = mockStore(storeStateMock)
    it('it should render Text and TouchableHighlight component', () => {
        var wrapper = shallow(<AddNote store={store}/>).shallow();
      
        expect(wrapper.children()).to.have.length(2);
        expect(wrapper.find(TextInput)).to.have.length(1);
        expect(wrapper.find(TouchableHighlight)).to.have.length(1);
    });
  
});