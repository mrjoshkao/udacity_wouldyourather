# Would You Rather Project

This application is written according to this [rubric](https://review.udacity.com/#!/rubrics/1567/view). Some notes:

* The `_DATA.js` file represents a fake database and methods that let you access the data. The ` _DATA.js` file has been edited to fix an error in the initial data (for the question "be a superhero" or "be a supervillain" there were inconsistencies in the data between the `questions` object and the `users` object) as well as point `avatarURL` to images contained in `/workspace/src/images`
* The menubar behaves wonky when the view window is too narrow. It's a result of absolute positioning of flexboxes that I don't have enough knowledge (yet) to fix. One possibility is to redo the interface using a grid or using [react-native](https://reactnavigation.org/)
* The ordering for the dashboard is the leftmost question is the most recent and the rightmost the oldest instead of top to bottom as specified in the rubric. I used this design decision because it works really well with the large avatars, which communicate the keen interest of the user who is asking the question
* The app is based on [reactnd-chirper-app](https://github.com/udacity/reactnd-chirper-app/tree/512ddca69dd99d67acf4b9795b1000c2e728e899) with one key difference in the store: whereas reactnd-chirper-app does not make use of the `tweets` property array in the [`users`](https://github.com/udacity/reactnd-chirper-app/blob/512ddca69dd99d67acf4b9795b1000c2e728e899/src/utils/_DATA.js) store and in fact the [reducers](https://github.com/udacity/reactnd-chirper-app/blob/512ddca69dd99d67acf4b9795b1000c2e728e899/src/reducers/users.js) for the `users` store doesn't even implement updating `tweets`, for udacity_wouldyourather, the `questions` and `answers` properties in the [`users`](https://github.com/mrjoshkao/udacity_wouldyourather/blob/main/src/utils/_DATA.js) store does need to be updated using the reducers **along** with updating the `questions` store itself
* Additionally, the app makes use of functional components and [React Hooks](https://reactjs.org/docs/hooks-intro.html) and in fact starting in React-Router v6, there is no way to make use of `props.match.params` as used in [reactnd-chirper-app](https://github.com/udacity/reactnd-chirper-app/blob/512ddca69dd99d67acf4b9795b1000c2e728e899/src/components/TweetPage.js)
* The app makes use of three third-party components: [react-minimal-pie-chart](https://www.npmjs.com/package/react-minimal-pie-chart), [react-tooltip](https://www.npmjs.com/package/react-tooltip) and [react-checkmark](https://www.npmjs.com/package/react-checkmark) for visuals
* There's an error using webpack where it tries to do the hot reloading but it's blocked when serving the app from the Udacity workspace. I don't know how to work around this

The app was created using [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## TL;DR

* install all project dependencies with `npm install`
* start the development server with `npm start`
* if runnig on a local machine, navigate to localhost:3000 to view the result

## What You're Getting
```bash
├── README.md - This file.
├── _DATA.js # This is the provided `_DATA.js` for reference
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── actions
    │   ├── authedUser.js
    │   ├── questions.js
    │   ├── shared.js
    │   └── users.js
    ├── components
    │   ├── AnswerSelector.js
    │   ├── App.css # Styles for your app. Feel free to customize this as you desire.
    │   ├── App.js # This is the root of your app. Contains static HTML right now.
    │   ├── Dashboard.js
    │   ├── LoginPage.js
    │   ├── MenuBar.js
    │   ├── NewQuestion.js
    │   ├── QuestionBlurbs.js
    │   ├── QuestionPage.js
    │   ├── ResultGraph.js
    │   ├── ScoreBoard.js
    │   ├── Tab.js # This component was adapted from [do-community](https://github.com/do-community/building-a-tabs-component-react)
    │   └── Tabs.js # likewise adapted from do-community
    ├── images
    │   ├── leaf.jpg
    │   ├── snow.jpg
    │   └── wyr.png
    ├── middleware # These files were adpated from reactnd-chirper-app
    │   ├── index.js 
    │   └── logger.js
    ├── reducers
    │   ├── authedUser.js
    │   ├── index.js
    │   ├── questions.js
    │   └── users.js
    ├── utils
    │   ├── _DATA.js # This is the modified, production version of the given `_DATA.js`
    │   ├── api.js # Much of the code here was adapted from reactnd-chirper-app
    │   └── helpers.js # Helpers for capitalizing the first letter of answer choices and for caching avatar images
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── logo.svg # logo provided by `create-react-app`
    ├── reportWebVitals.js # provided by `create-react-app`
    └── setupTests # provided by `create-react-app`
```

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|