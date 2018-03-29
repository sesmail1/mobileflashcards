import {
    PULL_ALL_DECKS,
    PULL_DECK,
    CREATE_NEW_DECK,
    ADD_CARD,
    CLEAR_DECKS
} from '../actions/actions'

export function deck_reducer(state = {}, action) {
    switch(action.type) {
        case PULL_ALL_DECKS:
            return action.decks;
        case PULL_DECK:
            return action.name;
        case CREATE_NEW_DECK:
            return {
                ...state,
                [action.name]: {
                    name: action.name,
                    QA_data: []
                }
            };
        case ADD_CARD:
            let updateQA = state[action.deck].QA_data;
            let updated = updateQA.concat(action.card);
            return {
                ...state,
                [action.deck]: {
                    name: action.deck,
                    QA_data: updated
                }
            };
        case CLEAR_DECKS:
            return null
        default:
            return state;
    }
};