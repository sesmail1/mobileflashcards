import * as asyncStorage from '../../utils/asyncStorageMethods';
/////////////////////////////////////////////////////////////////////
export const PULL_ALL_DECKS = 'PULL_ALL_DECKS';

export const pullAllDecks = () => dispatch => (
    asyncStorage.pullAllDecks()
        .then(decks => dispatch(pulledAllDecks(decks)))
);

export const pulledAllDecks = decks => ({
    type: PULL_ALL_DECKS,
    decks
});
/////////////////////////////////////////////////////////////////////
export const PULL_DECK = 'PULL_DECK';

export const pullDeck = deck => dispatch => (
    asyncStorage.pullDeck(deck)
        .then(data => dispatch(pulledDeck(data)))
);

export const pulledDeck = deck => ({
    type: PULL_DECK,
    deck
});
/////////////////////////////////////////////////////////////////////
export const CREATE_NEW_DECK = 'CREATE_NEW_DECK';

export const createNewDeck = name => dispatch => (
    asyncStorage.createNewDeck(name)
        .then(name => dispatch(createdNewDeck(name)))
);

export const createdNewDeck = name => ({
    type: CREATE_NEW_DECK,
    name
});
/////////////////////////////////////////////////////////////////////
export const ADD_CARD = 'ADD_CARD';

export const addCardToDeck = (deck, card) => dispatch => (
    asyncStorage.addCardToDeck(deck, card)
        .then(() => dispatch(addedCardToDeck({
            deck,
            card
        })))
);

export const addedCardToDeck = (data) => ({
    type: ADD_CARD,
    ...data
});
/////////////////////////////////////////////////////////////////////
export const CLEAR_DECKS = 'CLEAR_DECKS';

export const clearDecks = () => dispatch => (
   asyncStorage.clearDecks()
        .then((data) => dispatch(clearedDecks(data)))
);

export const clearedDecks = data => ({
    type: CLEAR_DECKS,
    data
})