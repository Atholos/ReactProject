import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Main from '../views/Main';
import Test from '../views/Test';
import User from '../views/User';
import Article from '../views/Article';
import Creator from '../views/Creator';
import Auth from '../views/Auth';
import Login from '../views/Login';
import MyArticles from '../views/MyArticles';
import { Icon } from 'native-base';

//NAVIGAATIO TOIMII HAH

const GuestTabNavigator = createBottomTabNavigator(
  {
    Main,
    Login,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Main') {
          iconName = 'home';
        } else if (routeName === 'Login') {
          iconName = 'person';
        // You can return any component that you like here!
        return <Icon name={iconName} size={25} />;
      }
    })
  }
);
const LoggedTabNavigator = createBottomTabNavigator(
  {
    Main,
    Creator,
    User
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Main') {
          iconName = 'home';
        } else if (routeName === 'User') {
          iconName = 'person';
        } else if (routeName === 'Creator') {
          iconName = 'md-cloud-upload';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} />;
      }
    })
  }
);

const LoggedStackNavigator = createStackNavigator({
  Main: {
    screen: LoggedTabNavigator,
    navigationOptions: {
      header: null // this will hide the header
    }
  },
  Article: {
    screen: Article
  },
  Logout: {
    screen: Login
  },
  MyArticles: {
    screen: MyArticles
  }
});

const GuestStackNavigator = createStackNavigator({
  Main: {
    screen: GuestTabNavigator,
    navigationOptions: {
      header: null // this will hide the header
    }
  },
  Article: {
    screen: Article
  },
});

const Navigator = createSwitchNavigator(
  {
    Auth: Auth,
    User: LoggedStackNavigator,
    Guest: GuestStackNavigator,
  },
  {
    initialRouteName: 'Auth'
  }
);

export default createAppContainer(Navigator);
