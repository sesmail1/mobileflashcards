import React from "react";
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions/actions';
import { clearLocalNotification, setLocalNotification } from '../../../utils/asyncStorageMethods';

class DeckView extends React.Component {
  addCard() {
    this.props.navigation.navigate('AddCard', {
      deckName: this.props.navigation.state.params.name
    })
    // console.log(this.props.navigation.state.params)
  }
  quiz() {
    clearLocalNotification().then(setLocalNotification);
    this.props.navigation.navigate('QuizView', {
      deckName: this.props.navigation.state.params.name
    })
  }
    render() {
        return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.title}>{this.props.navigation.state.params.name}</Text>
            <Text style={styles.cardsNumber}>{this.props.deck[this.props.navigation.state.params.name].QA_data.length}</Text>
            <TouchableOpacity onPress={()=> this.addCard()} style={styles.button}><Text style={styles.buttonLabel}>+ Add Card</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=> this.quiz()} style={[styles.button, {backgroundColor:'white'}]}><Text style={[styles.buttonLabel, {color: 'maroon'}]}>Start Quiz</Text></TouchableOpacity>
            </SafeAreaView>
        );
  }
}

function mapStateToProps(state) {
  return {
      deck: state
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
      getAllDecks: actions.pullAllDecks
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DeckView);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 100,
    fontSize: 27
  },
  cardsNumber: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    margin: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    width: 200,
    height: 100,
    backgroundColor: 'maroon'
  },
  buttonLabel: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});
