# Heirloom22 Project!
this project is developed using [ReactJs](https://reactjs.org/), [Redux](https://redux.js.org/) & [Firebase](https://firebase.google.com).
Below you will find some information on how to perform common tasks.

## Table of Contents
- [Updates](#updates)
- [Available Scripts](#available-scripts)
    - [yarn start](#yarn-start)
    - [yarn test] (#yarn-test)
    - [yarn run build](#yarn-run-build)
- [Folder Structure](#folder-structure)
- [Supported Browsers](#supported-browsers)

## Updates
12/9 Frontend & Backend integration by Luoming
11/9 User profile prototype by Luoming
9/9  User Authentication (login/logout/signin) by Luoming

README last update 12/9 by Luoming

## Available Scripts

In the project directory, you can run:

### `yarn install`

- Installs all relevant module dependencies.
- [**YARN**](https://yarnpkg.com/lang/en/) is a dependency manager just like _npm_
- To install **YARN**, please click [**Here**](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

### `yarn start`

- Runs the app in the development mode at localhost port 3000.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

- Launches the test runner in the interactive watch mode.<br>

### `yarn run build`

- Builds the app for production to the `build` folder.

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  yarn.lock
  firebase.json
  public/
    index.html
    favicon.ico
    logo192.png
    logo512.png
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
    component/
        artefacts/
            Artefact.js
            Artefact.css (unused)
            ArtefactList.js
            ArtefactList.css (unused)
            ArtefactListElement
        auth/
            SignIn.js
            SignUp.js
        layout/
            nav.html (unused)
            Navigation.js
            SignedIn.js (unused)
            SignedOut.js (unused)
        profile/
            userProfile.js
        firebase/
            config.js
        store/
            Actions/
                userActions.js
            Reducer/
                rootReducer.js
                userReducer.js

```

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.