import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  Button,
  Segment,
  Container,
  ListItem,
  Radio,
  Content
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/actions';


class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
    type: '',

  };

  submitCard() {
    let deckName = this.props.navigation.state.params.deckName;
    let data = {
      question: this.state.question,
      answer: this.state.answer,
      type: this.state.type
    }
    this.props.addCard(deckName, data);
    this.setState({
      type: undefined
    })
    this.props.navigation.goBack();
    alert('Card added')
  }


  qa_view() {
    this.setState({
      type: 'qa',
      answer: ''
    })
  }

  tf_view() {
    this.setState({
      type: 'tf',
      answer: ''
    })
  }

  render() {
    let form = () => {
      if(this.state.type == 'qa')
        return (
          <Container>
            <Text style={{marginLeft:20, marginRight:20, marginTop: 10, color: 'maroon'}}>New Question</Text>
            <TextInput
                multiline={true}
                numberOfLines = {4}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginLeft: 20, marginRight:20 }}
                onChangeText={question => this.setState({ question })}
                value={this.state.question}
            />
            <Text style={{marginLeft:20, marginRight:20, marginTop: 10, color: 'maroon'}}>New Answer</Text>
            <TextInput
                multiline={true}
                numberOfLines = {4}
                style={{ height: 200, borderColor: "gray", borderWidth: 1, marginLeft: 20, marginRight:20 }}
                onChangeText={answer => this.setState({ answer })}
                value={this.state.answer}
            />
            <TouchableOpacity onPress={() => this.submitCard()} style={styles.button}><Text style={styles.buttonLabel}>+ Add Card</Text></TouchableOpacity>
          </Container>
        )
      if(this.state.type == 'tf') {
        return (
          <Container>
            <Text style={{marginLeft:20, marginRight:20, marginTop: 10, color: 'maroon'}}>New Question</Text>
            <TextInput
                multiline={true}
                numberOfLines = {4}
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginLeft: 20, marginRight:20 }}
                onChangeText={question => this.setState({ question })}
                value={this.state.question}
            />
            <Container style={{alignSelf: 'center'}}>
              <Button onPress={() => this.setState({answer: 'true'})} style={{width:100, borderRadius:100, marginTop: 20, backgroundColor: 'green' }}>
                <Text style={{marginLeft: 'auto', marginRight: 'auto', color: 'white'}}>
                  True
                </Text>
              </Button>
              <Button onPress={() => this.setState({answer: 'false'})} style={{width:100, borderRadius:100, marginTop: 20, backgroundColor: 'red' }}>
                <Text style={{marginLeft: 'auto', marginRight: 'auto', color: 'white'}}>
                  False
                </Text>
              </Button> 

              <Text>Answer Selected:</Text>
              <Text style={{color: 'blue'}}>{this.state.answer}</Text>
              <TouchableOpacity onPress={() => this.submitCard()} style={styles.button}><Text style={styles.buttonLabel}>+ Add Card</Text></TouchableOpacity>
            </Container>
          </Container>
        )
      }
    }

    let none = () => {
      if(this.state.type == 'qa' || this.state.type == 'tf')
      return (
        <Text></Text>
      )

      if(this.state.type !== 'qa' || this.state.type !== 'tf')
        return (
          <Container>
            <Text>Please select the type of card you would like to add.</Text>
          </Container>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
          <Segment>
            <Button onPress={() => this.tf_view()} first>
              <Text>T/F</Text>
            </Button>
            <Button onPress={() => this.qa_view()} last>
              <Text>Q/A</Text>
            </Button>
          </Segment>        
          {form()}
          {none()}
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
      
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addCard: actions.addCardToDeck
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddCard);