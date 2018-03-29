
import React, { Component } from 'react';
import { Button, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Right, Body, Icon } from 'native-base';
import { TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions/actions';


class QuizView extends Component {

  state = {
    answer: '',
    totalCards: this.props.cards[this.props.navigation.state.params.deckName].QA_data.length,
    correctList: [],
    incorrectList: [],
    localInstance: this.props.cards[this.props.navigation.state.params.deckName].QA_data
  }

  submitAnswer(question) {
    if(question.answer.toUpperCase() == this.state.answer.toUpperCase()) { 
      this.setState({
        correctList: this.state.correctList.concat(question),
      }, () => Alert.alert(
          'You answered correctly!',
          'Question: ' + question.question +
          '\n Answer Given: ' + this.state.answer +
          '\n Correct Answer: ' + question.answer,
          [
            {text: 'Continue', onPress: () => this.setState({ 
              answer: '', 
              localInstance: this.state.localInstance.filter(answered => answered !== question),
            })},
            {text: 'Make Incorrect', onPress: () => {
              this.setState({
                correct: this.state.correct - 1,
                incorrectList: this.state.incorrectList.concat(question),
                correctList: this.state.correctList.filter(instance => instance !== question),
                localInstance: this.state.localInstance.filter(answered => answered !== question),
              })
            }}
          ]
        )
      )
    }

    if(question.answer.toUpperCase() !== this.state.answer.toUpperCase()) { 
      this.setState({
        incorrectList: this.state.correctList.concat(question),
      }, () => Alert.alert(
          'You answered wrong!',
          'Question: ' + question.question +
          '\n Answer Given: ' + this.state.answer+
          '\n Correct Answer: ' + question.answer,
          [
            {text: 'Continue', onPress: () => this.setState({ 
              answer: '', 
              localInstance: this.state.localInstance.filter(answered => answered !== question),
            })},
            {text: 'Make Correct', onPress: () => {
              this.setState({
                correctList: this.state.correctList.concat(question),
                incorrectList: this.state.incorrectList.filter(instance => instance !== question),
                localInstance: this.state.localInstance.filter(answered => answered !== question),
              })
            }}
          ]
        )
      )
    }
  }

  restart() {
    alert('Restarting Quiz');
    this.setState({
      answer: '',
      totalCards: this.props.cards[this.props.navigation.state.params.deckName].QA_data.length,
      correctList: [],
      incorrectList: [],
      localInstance: this.props.cards[this.props.navigation.state.params.deckName].QA_data
    });
  }

  toDeck() {
    this.props.navigation.goBack();
  }

  
  render() {
    if(this.state.localInstance.length == 0 && this.state.totalCards !== 0) {
      return (
        <View style={{margin: 10}}>
          <Card>
            <CardItem>
              <Text style={{color: 'maroon', fontSize: 24, marginRight: 'auto', marginLeft: 'auto'}}>Quiz Results</Text>
            </CardItem>
            <CardItem>
              <Text>Correct: {this.state.correctList.length}</Text>
            </CardItem>  
            <CardItem>
              <Text>Incorrect: {this.state.incorrectList.length}</Text>
            </CardItem>
            <CardItem>
              <Text style={{color: 'maroon', fontSize: 20}}>Grade: {(this.state.correctList.length / this.props.cards[this.props.navigation.state.params.deckName].QA_data.length) * 100}%</Text>
            </CardItem>
            <CardItem>
              <Button onPress={() => this.restart()} style={{backgroundColor: 'black'}}>
                <Text>Restart Quiz</Text>  
              </Button>
            </CardItem>
            <CardItem>
              <Button onPress={() => this.toDeck()} style={{backgroundColor: 'grey'}}>
                <Text>Go Back to Deck View</Text>
              </Button>
            </CardItem>
          </Card>
        </View>
      )
    }

    if(this.state.totalCards == 0) {
      return (
        <Text> You have not created any cards yet!</Text>
      )
    }

    return (

        <View style={{margin: 10}}>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={this.state.localInstance}
            renderItem={item =>  
              <Card style={{ elevation: 6}}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text style={{color: 'maroon'}}>Question</Text>
                      <Text note>Your Flashcard Quiz Swipe-able deck</Text>
                      <Text style={{color: 'grey'}}>{this.props.cards[this.props.navigation.state.params.deckName].QA_data.indexOf(item) + 1} / {this.props.cards[this.props.navigation.state.params.deckName].QA_data.length} cards</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                </CardItem>
                <CardItem>
                  <Text style={{fontSize: 25}}>
                    {item.question}
                  </Text>
                </CardItem>
                <CardItem>
                    <TextInput
                    multiline={true}
                    numberOfLines = {4}
                    style={{ height: 100, width:300, borderColor: "gray", borderWidth: 1, marginLeft: 10, marginRight:10 }}
                    onChangeText={answer => this.setState({ answer })}
                    value={this.state.answer}
                    />
                </CardItem>
                <CardItem>
                  <Left>
                    <TouchableOpacity onPress={()=> alert('The answer is: ' + item.answer)} style={styles.idk}>
                      <Text style={styles.buttonLabel}>Show Answer</Text>
                    </TouchableOpacity>
                  </Left>
                  <Right>
                    <TouchableOpacity onPress={() => this.submitAnswer(item)} style={styles.submitAnswer}>
                      <Text style={styles.buttonLabel}>Submit</Text>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
                <CardItem>
                  <Text style={{fontSize: 14, color: 'grey'}}>
                    * Swipe to explore all cards
                  </Text>
                </CardItem>
              </Card>
            }
          />
        </View>

    );
  }
}

const styles = StyleSheet.create({
  idk: {
    margin: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    width: 100,
    height: 50,
    backgroundColor: 'maroon'
  },
  submitAnswer: {
    margin: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'lightgreen',
    width: 100,
    height: 50,
    backgroundColor: 'green'
  },
  buttonLabel: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

function mapStateToProps(state) {
  return {
      cards: state
  };
}

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators({
    
//   }, dispatch);
// }

export default connect(mapStateToProps, null)(QuizView);