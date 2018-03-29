import React from "react";
import { StyleSheet, Text, SafeAreaView, StatusBar, ScrollView , View} from "react-native";
import DashboardItem from "./_components/DashboardItem";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions/actions';


class DecksDashboard extends React.Component {
    componentDidMount() {
        this.props.getAllDecks();
        console.log(this.props.navigation)
    }
    goToDeck(data) {
        this.props.navigation.navigate('DeckView', {
            name: data.name,
            QA_data: data.QA_data,
        })
    }
    isEmpty() {
        if(this.props.decks)
            return Object.keys(this.props.decks).length === 0;
        if(this.props.decks == null)
            return true
    }
    render() {
            let test = this.isEmpty();
            if(test) {
                return (
                    <Text>You do not currently have any decks.</Text>
                )
            } else 
            return (
            <View style={styles.safeArea}>
                <ScrollView>
                    {Object.keys(this.props.decks).map((key, index) => {
                        if(this.props.decks[key].QA_data)
                            return (
                                <DashboardItem key={index + key} cards={this.props.decks[key]} numOfCards={this.props.decks[key].QA_data.length} deckName={this.props.decks[key].name} deckTapped={() => this.goToDeck(this.props.decks[key])} />
                            )
                        return 
                    })}
                </ScrollView>
            </View>
            );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

function mapStateToProps(state) {
    return {
        decks: state
    };
  }
  
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllDecks: actions.pullAllDecks
    }, dispatch);
}
  
export default connect(mapStateToProps, matchDispatchToProps)(DecksDashboard);