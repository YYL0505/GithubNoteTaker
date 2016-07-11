import React, { View, Text, StyleSheet, Image } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Badge from '../../App/Components/Badge';

describe('badge', () => {
    it('it should render 2 texts component', () => {
        var userInfo = {
          avatar_url: 'https://test.com',
          name: 'user name',
          login: 'USERNAME'
        };
        var wrapper = shallow(<Badge userInfo={userInfo}/>);
      
        expect(wrapper.children()).to.have.length(3);
        expect(wrapper.find(Text)).to.have.length(2);
        expect(wrapper.find(Image)).to.have.length(1);
    });
});