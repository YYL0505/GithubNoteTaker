import React, { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Profile from '../../App/Components/Profile';
import Badge from '../../App/Components/Badge';

describe('profile', () => {
    it('it should render use info', () => {
        var userInfo = {
          avatar_url: 'https://test.com',
          name: 'user name',
          login: 'USERNAME',
          company: 'company test',
          location: 'location test', 
          follower: 12, 
          following: 8, 
          email: 'email@test.com', 
          bio: 'bio test', 
          public_repos: 20
        };
        var wrapper = shallow(<Profile userInfo={userInfo}/>);
      
        expect(wrapper.children()).to.have.length(8);
        expect(wrapper.childAt(0).name()).to.equal('Badge');
    });
});