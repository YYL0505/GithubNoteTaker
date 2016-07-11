import React, { View, Text, StyleSheet, Image, ListView } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import NoteList from '../../App/Components/NoteList';
const datas = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

describe('note list', () => {
    it('it should render 2 texts component', () => {
        var userInfo = {
          avatar_url: 'https://test.com',
          name: 'user name',
          login: 'USERNAME'
        };
        var notes = [
          {text: 'this is the first note'},
          {text: 'this is the second note'},
          {text: 'this is the third note'}
        ];
        var dataSource = datas.cloneWithRows(notes);
      
        var wrapper = shallow(<NoteList userInfo={userInfo} dataSource={dataSource}/>);
      
        expect(wrapper.find(ListView)).to.have.length(1);
    });
});