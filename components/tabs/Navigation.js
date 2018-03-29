import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, StatusBar, SafeAreaView,View } from 'react-native';
import DecksDashboard from './Dashboard/DecksDashboard';
import NewDeckView from './NeckDeckView/NewDeckView';
import { Ionicons } from '@expo/vector-icons';
import DeckView from '../views/DeckView/DeckView';
import AddCard from '../views/AddCard';
import QuizView from '../views/QuizView/QuizView';
import { Constants } from 'expo';

function CardStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight,}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
};

const Navigation = TabNavigator({
  Dashboard: {
    screen: DecksDashboard,
    navigationOptions: {
      tabBarLabel: 'Dashboard',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-home-outline' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: 'white',
    activeBackgroundColor: '#5D0F0D',
  }
});

const MainNavigator = StackNavigator({
  Main: {
    screen: Navigation,
    navigationOptions: {
      title: 'Dashboard',
      
    }
  },
  DeckView: {
    screen: DeckView,
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: 'Quiz'
    }
  }
})

export default class AppNavigation extends React.Component {
  render() {
    return (
        <View style={{flex: 1}}>
          <CardStatusBar backgroundColor='maroon' barStyle='light-content' />
          <MainNavigator style={style.main}/>
        </View>
    );
  }
}

const style = StyleSheet.create({
  main: {
    paddingTop: 0
  },
  
})
