import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from "react-native";
import * as api from '../../../utils/asyncStorageMethods';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions/actions';

class AddCard extends React.Component {
  state = {
    deck: ""
  };
  newDeck() {
    this.props.createNewDeck(this.state.deck);
    let deck = this.state.deck;
    this.setState({
      deck: ''
    });
    setTimeout(() => {
      this.props.navigation.goBack();
      alert('Deck Added: ' + deck);
      this.props.navigation.navigate('DeckView', {
        name: this.props.decks[deck].name,
        QA_data: this.props.decks[deck].QA_data,
      }) 
    }, 200)
  }
  retrieveDecks() {
    api.pullAllDecks()
      .then(data => console.log(data))
  }
  render() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={{marginLeft:20, marginRight:20, marginTop: 10, color: 'maroon'}}>New Deck Name</Text>
            <TextInput
                multiline={false}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginLeft: 20, marginRight:20 }}
                onChangeText={deck => this.setState({ deck })}
                value={this.state.deck}
            />
            <TouchableOpacity onPress={() => this.newDeck()} style={styles.button}><Text style={styles.buttonLabel}>+ Add Deck</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.clearDecks()} style={[styles.button, {backgroundColor: 'black'}]}><Text style={styles.buttonLabel}>Clear ALL Decks</Text></TouchableOpacity>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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


function mapStateToProps(state) {
  return {
    decks: state
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    createNewDeck: actions.createNewDeck,
    clearDecks: actions.clearDecks
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddCard);