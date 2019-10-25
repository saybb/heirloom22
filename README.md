UNIMELB COMP30022 IT Project 2019

# Heirloom22 Project!

Created by Chuanyuan, Lawson, Luoming, and Anqi

This project is developed using [ReactJs](https://reactjs.org/), [Redux](https://redux.js.org/) & [Firebase](https://firebase.google.com). For Design we used [AntDesign](https://ant.design).

## Get started!

Live Website:
https://heirloom22-2b4a8.firebaseapp.com/

Login using
username: teacher@unimelb.com
password: teacher

## Agile Process Documentation

All documentations are stored in `./documentation` folder

[Click here to redirect to the documentation](./documentation/README.md)

## Table of Contents

-  [Updates](#updates)
-  [Available Scripts](#available-scripts)
   -  [yarn start](#yarn-start)
   -  [yarn test](#yarn-test)
   -  [yarn run build](#yarn-run-build)
-  [Folder Structure](#folder-structure)
-  [Application Structure](#Application-structure)
-  [Supported Browsers](#supported-browsers)
-  [Supported Language Features and Polyfills](#supported-language-features-and-polyfills)

## Updates

20/9 Fetching data now has 3 states: 1. Loading state: waiting for data fetching, returns “xxx is loading”, 2. Display state: just display the artefact’s details 3. Empty state: No data is in our database, returns “xxx is not found”.

20/9 **Artefact** and **ArtefactList** fetch data from firestore

16/9 **CreateArtefact** component is implemented, showing the layout and ui for creating an artefact (by Lawson)

16/9 **User Profile** modal is now swithable, it has additional content: [Edit Profile] for user inputs new profile data by Luoming

15/9 Antd is enabled in project now, re-designed **User Profile** into a modal by Luoming

To use Antd component, can **import 'antd'** (see example below):

```javascript
import {Button} from "antd";
```

12/9 Frontend & Backend integration by Luoming

11/9 User profile prototype by Luoming

9/9 User Authentication (login/logout/signin) by Luoming

README last update 16/9 by Luoming

## Available Scripts

In the project directory, you can run:

### `yarn install`

-  Installs all relevant module dependencies.
-  [**YARN**](https://yarnpkg.com/lang/en/) is a dependency manager just like _npm_, if you are interested in **YARN** vs **npm**, [Here](https://www.sitepoint.com/yarn-vs-npm/) provides insight.
-  To install **YARN**, please click [**Here**](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

### `yarn start`

-  Runs the app in the development mode at localhost port 3000.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

-  Launches the test runner in the interactive watch mode.<br>

### `yarn run build`

-  Builds the app for production to the `build` folder.

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer to the [React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## Supported Language Features and Polyfills

This project supports a superset of the latest JavaScript standard.<br>
In addition to [ES6](https://github.com/lukehoban/es6features) syntax features, it also supports:

-  [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016).
-  [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017).
-  [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
-  [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 3 proposal)
-  [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal).
-  [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and [Flow](https://flowtype.org/) syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

While we recommend using experimental proposals with some caution, Facebook heavily uses these features in the product code, so we intend to provide [codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb) if any of these proposals change in the future.
