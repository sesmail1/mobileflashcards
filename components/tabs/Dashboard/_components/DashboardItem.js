import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export default class DashboardItem extends Component {
  render() {
    return (
        <TouchableOpacity style={styles.card} onPress={this.props.deckTapped}>
            <Text style={styles.title}>
                {this.props.deckName}
                {'\n'}
                <Text style={styles.cardsNumber}>{this.props.numOfCards}</Text>
            </Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        height:200,
        borderWidth: 1,
        borderColor: 'maroon',
        backgroundColor: 'maroon',
    },
    title: {
        color: 'white',
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 25,
    },
    cardsNumber: {
        fontSize: 15,
        color: 'pink'
    },
    trash: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        width:30,
        borderRadius: 50,
        margin: 10
    }
});