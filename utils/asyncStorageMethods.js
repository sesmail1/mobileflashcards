import { AsyncStorage } from 'react-native';
const AsyncStorage_Decks = 'esmail_flashcards_udacity';
import {
    Notifications,
    Permissions
} from 'expo';


/////////////////////////////////////////////////////////////////////////
/*Notifications */
////////////////////////////////////////////////////////////////////////
const NOTIF_KEY = "SameerCards:notifs";

export const clearLocalNotification = () => {
    console.log('setting local notification');
    return AsyncStorage.removeItem(NOTIF_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
      );
};

export const createNotification = () => {
    return {
        title: "Remember to Quiz yourself!",
        body: "It's always a good day for quizzing, buddy-yo!!!",
        ios: {
          sound: true
        }
      };
};

export const setLocalNotification = () => {
    console.log('setting local notification');
    AsyncStorage.getItem(NOTIF_KEY)
      .then(JSON.parse)
      .then(data => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS).then(status => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();
  
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(8);
              tomorrow.setMinutes(0);
  
              Notifications.scheduleLocalNotificationAsync(createNotification(), {
                time: tomorrow,
                repeat: "day"
              });
  
              AsyncStorage.setItem(NOTIF_KEY, JSON.stringify(true));
            }
          });
        }
      });
};
/////////////////////////////////////////////////////////////////////////
/*Deck Methods */
////////////////////////////////////////////////////////////////////////
export const pullAllDecks = () => {
    return AsyncStorage.getItem(AsyncStorage_Decks)
        .then(data => JSON.parse(data))
        .catch(err => {})
};

export const pullDeck = deck => {
    return pullAllDecks()
        .then(allDecks => allDecks[deck])
        .catch(err => console.log(err))
};

export const createNewDeck = name => {
    let newDeckData = JSON.stringify({
        [name]: {
            name,
            QA_data: [] 
        }
    });
    AsyncStorage.mergeItem(AsyncStorage_Decks, newDeckData);
    return pullDeck(name).then(data => data.name);
};

export const addCardToDeck = (deckName, QA) => {
    return pullAllDecks()
        .then(allDecks => {
            allDecks[deckName].QA_data.push(QA)
            AsyncStorage.setItem(AsyncStorage_Decks, JSON.stringify(allDecks))
            .then(() => {
                deckName,
                QA
            })
        })
        .catch(err => console.log(err))
};

export const clearDecks = () => {
    AsyncStorage.clear();
    return pullAllDecks()
        .then(() => null)
}