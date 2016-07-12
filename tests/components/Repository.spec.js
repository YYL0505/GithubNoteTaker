import React, { View, Text, StyleSheet, Image, } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Repository from '../../App/Components/Repository';

describe('repository', () => {
    it('it should render use info and repos ', () => {
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
      
      var repos = [
        {
          description: 'description',
          html_url: 'https://test.com',
          name: 'repo name',
          stargazers_count: 2
        }
      ];
        var wrapper = shallow(<Repository userInfo={userInfo} repos={repos}/>);
      
        expect(wrapper.children()).to.have.length(2);
        expect(wrapper.childAt(0).name()).to.equal('Badge');
    });
});