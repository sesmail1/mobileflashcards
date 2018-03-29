# Sameer Mobile Flashcards




# About
Project created for Udacity Online React Nanodegree.

To the best of my knowledge, all criteria set out to be accomplished for this application set in the rubric has been done.

I agree to the Udacity Honor Code, promising this is my own work.

Start with **npm install** or **yarn install** and **yarn start**
Chosen Platform: **iOS**

## Checklist


**Is the application easy to install and start?**

The application requires only  `yarn install`  and  `yarn start`  to install and launch.  `npm`  can be used in place of  `yarn`.

**Does the application include a README with clear installation and launch instructions?**

A README is included with the project. The README includes clear instructions for installing and launching the project.

**Is the initial view a Deck List view?**

The primary view, seen when the app loads, is a list of created decks which includes the name of each deck and the number of cards.

**Does the Deck List view function correctly?**

Pressing on a deck in the list should generate an animation, and the app should route to an individual deck view. The animation is a sliding page animation to the next view.

**Does the Individual Deck view display the correct information?**

**The individual deck view includes (at a minimum):**

-   The deck title 
-   Number of cards in the deck
-   Option to start a quiz for that deck
-   Option to add a new question to the deck

**Does the Individual Deck view function correctly?**

Pressing the 'Start a Quiz' or 'Create New Question' button properly routes to the correct views for those activities.

**Does the New Question view function correctly?**

The New Question view includes a form with fields for a question and answer, and a submit button.

Submitting the form correctly adds the question to the deck.

**Does the Quiz View function correctly?**

-   The Quiz view starts with a question from the selected deck.
-   The question is display, along with a button to show the answer.
-   Pressing the 'Show Answer' button displays the answer.
-   Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect' - this option is alloted to the card users after answering the question.
-   The view displays the number of questions remaining out of the total questions.
-   When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly. I have chosen percentage and the correct/incorrect to be displayed.
-   When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
-   Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.

**Does the New Deck view work correctly?**

The view includes a form for creating a new deck - which should just be an input for the title and a 'Create Deck' button.

Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.

**Does the user receive a notification at a particular time if they haven't studied that day?**

Logic for notification has been implemented. Notifications are generated at a specific time if the user hasn't completed at least one quiz for that day. In the main App.js file, componentDidMount() runs the notification to be first set. In the individual Deck View, hitting 'Start Quiz' will trigger the quiz and the notification for that day to be turned off.

**Does the app function correctly in either Android or iOS?**

The app works correctly iOS. I have specifically tested in iOS 10.

